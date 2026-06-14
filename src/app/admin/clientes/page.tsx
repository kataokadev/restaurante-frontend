"use client";

import { useEffect, useState } from "react";
import { getClientes, criarCliente, atualizarCliente } from "@/lib/api";
import { Cliente } from "@/app/types/cliente";

export default function AdminClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Cliente | null>(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function carregar() {
    setLoading(true);
    try {
      const data = await getClientes();
      setClientes(data);
    } catch {
      setErro("Erro ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  function iniciarEdicao(c: Cliente) {
    setEditando(c);
    setNome(c.nome);
    setTelefone(c.telefone);
    setErro("");
    setSucesso("");
  }

  function cancelar() {
    setEditando(null);
    setNome("");
    setTelefone("");
    setErro("");
    setSucesso("");
  }

  async function salvar() {
    if (!nome.trim() || !telefone.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }
    setErro("");
    try {
      if (editando) {
        await atualizarCliente(editando.id, { nome, telefone });
        setSucesso("Cliente atualizado com sucesso!");
      } else {
        await criarCliente({ nome, telefone });
        setSucesso("Cliente criado com sucesso!");
      }
      cancelar();
      carregar();
    } catch {
      setErro("Erro ao salvar cliente.");
    }
  }

  return (
    <div className="px-10 py-10 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
        Admin — Clientes
      </h1>

      {/* Formulário */}
      <div className="border border-orange-500 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{editando ? "Editar Cliente" : "Novo Cliente"}</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do cliente"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Telefone</label>
            <input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(99) 99999-9999"
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
              <th className="py-3 pr-4 text-gray-400">Telefone</th>
              <th className="py-3 text-gray-400">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} className="border-b border-gray-800 hover:bg-gray-900 transition">
                <td className="py-3 pr-4 text-gray-500">{c.id}</td>
                <td className="py-3 pr-4 font-semibold">{c.nome}</td>
                <td className="py-3 pr-4 text-gray-400">{c.telefone}</td>
                <td className="py-3">
                  <button
                    onClick={() => iniciarEdicao(c)}
                    className="text-orange-400 hover:text-orange-300 font-bold cursor-pointer"
                  >
                    Editar
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
