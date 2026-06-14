"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { getClientes, criarPedido } from "@/lib/api";
import { Cliente } from "@/app/types/cliente";
import { useRouter } from "next/navigation";

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantidade, clearCart, total } = useCart();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const router = useRouter();

  useEffect(() => {
    getClientes().then(setClientes).catch(() => setClientes([]));
  }, []);

  async function finalizarPedido() {
    if (!clienteSelecionado) {
      setErro("Selecione um cliente para finalizar o pedido.");
      return;
    }
    if (items.length === 0) {
      setErro("Seu carrinho está vazio.");
      return;
    }

    setLoading(true);
    setErro("");
    try {
      await criarPedido({
        clienteId: Number(clienteSelecionado),
        itens: items.map((i) => ({
          produtoId: i.produto.id,
          quantidade: i.quantidade,
        })),
      });
      clearCart();
      router.push("/pedidos");
    } catch {
      setErro("Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-10 py-10 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
        Carrinho
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl mb-4">Seu carrinho está vazio.</p>
          <a href="/cardapio" className="text-orange-500 underline font-bold">
            Ver Cardápio
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.produto.id}
              className="flex items-center justify-between border border-orange-500 rounded-lg p-4"
            >
              <div className="flex-1">
                <p className="font-bold text-lg">{item.produto.nome}</p>
                <p className="text-yellow-400">
                  R$ {item.produto.preco.toFixed(2)} / un.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantidade(item.produto.id, item.quantidade - 1)}
                  className="w-8 h-8 rounded bg-gray-700 hover:bg-gray-600 font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold">{item.quantidade}</span>
                <button
                  onClick={() => updateQuantidade(item.produto.id, item.quantidade + 1)}
                  className="w-8 h-8 rounded bg-gray-700 hover:bg-gray-600 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <p className="w-28 text-right font-bold text-green-400">
                R$ {(item.produto.preco * item.quantidade).toFixed(2)}
              </p>

              <button
                onClick={() => removeItem(item.produto.id)}
                className="ml-4 text-red-500 hover:text-red-300 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between items-center border-t border-gray-600 pt-4 text-xl font-bold">
            <span>Total</span>
            <span className="text-green-400">R$ {total.toFixed(2)}</span>
          </div>

          {/* Seleção de cliente */}
          <div className="mt-6">
            <label className="block font-bold mb-2">Selecionar Cliente</label>
            <select
              value={clienteSelecionado}
              onChange={(e) => setClienteSelecionado(Number(e.target.value))}
              className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white focus:border-orange-500 outline-none"
            >
              <option value="">-- Selecione um cliente --</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome} — {c.telefone}
                </option>
              ))}
            </select>
          </div>

          {erro && <p className="text-red-500 font-semibold">{erro}</p>}

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => clearCart()}
              className="flex-1 border border-gray-600 py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer font-bold"
            >
              Limpar Carrinho
            </button>
            <button
              onClick={finalizarPedido}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-3 rounded-lg hover:opacity-90 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Finalizar Pedido"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
