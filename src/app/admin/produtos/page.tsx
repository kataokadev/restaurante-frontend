"use client";

import { useEffect, useState } from "react";
import { getProdutos, criarProduto, atualizarProduto, deletarProduto } from "@/lib/api";
import { Produto } from "@/app/types/produto";

export default function AdminProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Produto | null>(null);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function carregar() {
    setLoading(true);
    try {
      setProdutos(await getProdutos());
    } catch {
      setErro("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  function iniciarEdicao(p: Produto) {
    setEditando(p);
    setNome(p.nome);
    setPreco(String(p.preco));
    setErro("");
    setSucesso("");
  }

  function cancelar() {
    setEditando(null);
    setNome("");
    setPreco("");
    setErro("");
    setSucesso("");
  }

  async function salvar() {
    if (!nome.trim() || !preco.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }
    const precoNum = parseFloat(preco.replace(",", "."));
    if (isNaN(precoNum) || precoNum <= 0) {
      setErro("Preço inválido.");
      return;
    }
    setErro("");
    try {
      if (editando) {
        await atualizarProduto(editando.id, { nome, preco: precoNum });
        setSucesso("Produto atualizado com sucesso!");
      } else {
        await criarProduto({ nome, preco: precoNum });
        setSucesso("Produto criado com sucesso!");
      }
      cancelar();
      carregar();
    } catch {
      setErro("Erro ao salvar produto.");
    }
  }

  async function excluir(id: number) {
    if (!confirm("Deseja excluir este produto?")) return;
    try {
      await deletarProduto(id);
      carregar();
    } catch {
      setErro("Erro ao excluir produto.");
    }
  }

  return (
    <div className="px-10 py-10 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
        Admin — Produtos
      </h1>

      {/* Formulário */}
      <div className="border border-orange-500 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{editando ? "Editar Produto" : "Novo Produto"}</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do produto"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Preço (R$)</label>
            <input
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="0.00"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 focus:border-orange-500 outline-none"
            />
          </div>
        </div>

        {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}
        {sucesso && <p className="text-green-400 text-sm mb-2">{sucesso}</p>}

        <div className="flex gap-3">
          <button
            onClick={salvar}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold px-6 py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
          >
            {editando ? "Atualizar" : "Criar"}
          </button>
          {editando && (
            <button
              onClick={cancelar}
              className="border border-gray-600 px-6 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer font-bold"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Tabela */}
      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 pr-4 text-gray-400">#</th>
              <th className="py-3 pr-4 text-gray-400">Nome</th>
              <th className="py-3 pr-4 text-gray-400">Preço</th>
              <th className="py-3 text-gray-400">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id} className="border-b border-gray-800 hover:bg-gray-900 transition">
                <td className="py-3 pr-4 text-gray-500">{p.id}</td>
                <td className="py-3 pr-4 font-semibold">{p.nome}</td>
                <td className="py-3 pr-4 text-green-400">R$ {p.preco.toFixed(2)}</td>
                <td className="py-3 flex gap-3">
                  <button
                    onClick={() => iniciarEdicao(p)}
                    className="text-orange-400 hover:text-orange-300 font-bold cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluir(p.id)}
                    className="text-red-500 hover:text-red-300 font-bold cursor-pointer"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
