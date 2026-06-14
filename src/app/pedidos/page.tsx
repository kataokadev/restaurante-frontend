"use client";

import { useEffect, useState } from "react";
import { getPedidos } from "@/lib/api";
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

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    getPedidos()
      .then(setPedidos)
      .catch(() => setErro("Erro ao carregar pedidos."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-10 py-10 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
        Pedidos
      </h1>

      {loading && <p className="text-gray-400">Carregando pedidos...</p>}
      {erro && <p className="text-red-500">{erro}</p>}

      {!loading && pedidos.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl mb-4">Nenhum pedido encontrado.</p>
          <a href="/cardapio" className="text-orange-500 underline font-bold">
            Ver Cardápio
          </a>
        </div>
      )}

      <div className="space-y-6">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="border border-gray-700 rounded-xl p-6 hover:border-orange-500 transition"
          >
            <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
              <div>
                <p className="font-bold text-lg">Pedido #{pedido.id}</p>
                <p className="text-gray-400 text-sm">
                  Cliente: <span className="text-white">{pedido.cliente.nome}</span>
                </p>
                <p className="text-gray-400 text-sm">
                  Data: {new Date(pedido.dataPedido).toLocaleString("pt-BR")}
                </p>
              </div>
              <span
                className={`border rounded-full px-4 py-1 text-sm font-bold ${statusColor[pedido.status]}`}
              >
                {statusLabel[pedido.status]}
              </span>
            </div>

            <div className="space-y-1">
              {pedido.itens.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.quantidade}x {item.produto.nome}
                  </span>
                  <span className="text-gray-400">
                    R$ {(item.precoUnitario * item.quantidade).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 mt-4 pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-green-400">R$ {pedido.valorTotal.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
