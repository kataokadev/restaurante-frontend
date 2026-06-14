"use client";

import { useEffect, useState } from "react";
import { getPedidos, atualizarStatusPedido, deletarPedido } from "@/lib/api";
import { Pedido, PedidoStatus } from "@/app/types/pedido";

const statusLabel: Record<PedidoStatus, string> = {
  REGISTRADO: "Registrado",
  PREPARANDO: "Preparando",
  FINALIZADO: "Finalizado",
};

const statusColor: Record<PedidoStatus, string> = {
  REGISTRADO: "text-yellow-400 border-yellow-400",
  PREPARANDO: "text-orange-400 border-orange-400",
  FINALIZADO: "text-green-400 border-green-400",
};

const proximoStatus: Record<PedidoStatus, PedidoStatus | null> = {
  REGISTRADO: "PREPARANDO",
  PREPARANDO: "FINALIZADO",
  FINALIZADO: null,
};

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  async function carregar() {
    setLoading(true);
    try {
      setPedidos(await getPedidos());
    } catch {
      setErro("Erro ao carregar pedidos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  async function avancarStatus(pedido: Pedido) {
    const next = proximoStatus[pedido.status];
    if (!next) return;
    try {
      await atualizarStatusPedido(pedido.id, next);
      carregar();
    } catch {
      setErro("Erro ao atualizar status.");
    }
  }

  async function excluir(id: number) {
    if (!confirm("Deseja excluir este pedido?")) return;
    try {
      await deletarPedido(id);
      carregar();
    } catch {
      setErro("Erro ao excluir pedido.");
    }
  }

  return (
    <div className="px-10 py-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Admin — Pedidos
        </h1>
        <button
          onClick={carregar}
          className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-black transition font-bold cursor-pointer"
        >
          Atualizar
        </button>
      </div>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}

      {loading ? (
        <p className="text-gray-400">Carregando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p className="text-gray-400">Nenhum pedido encontrado.</p>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="border border-gray-700 rounded-xl p-5 hover:border-orange-500 transition"
            >
              <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                <div>
                  <p className="font-bold text-lg">Pedido #{pedido.id}</p>
                  <p className="text-gray-400 text-sm">
                    Cliente: <span className="text-white">{pedido.cliente.nome}</span>
                    {" · "}
                    {pedido.cliente.telefone}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(pedido.dataPedido).toLocaleString("pt-BR")}
                  </p>
                </div>

                <span className={`border rounded-full px-4 py-1 text-sm font-bold ${statusColor[pedido.status]}`}>
                  {statusLabel[pedido.status]}
                </span>
              </div>

              <div className="space-y-1 mb-3">
                {pedido.itens.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantidade}x {item.produto.nome}</span>
                    <span className="text-gray-400">
                      R$ {(item.precoUnitario * item.quantidade).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center border-t border-gray-800 pt-3">
                <span className="font-bold text-green-400">
                  Total: R$ {pedido.valorTotal.toFixed(2)}
                </span>

                <div className="flex gap-3">
                  {proximoStatus[pedido.status] && (
                    <button
                      onClick={() => avancarStatus(pedido)}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold px-4 py-1.5 rounded-lg hover:opacity-90 transition cursor-pointer text-sm"
                    >
                      → {statusLabel[proximoStatus[pedido.status]!]}
                    </button>
                  )}
                  <button
                    onClick={() => excluir(pedido.id)}
                    className="text-red-500 hover:text-red-300 font-bold cursor-pointer text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
