import { Cliente } from "@/app/types/cliente";
import { Produto } from "@/app/types/produto";
import { CriarPedidoDTO, Pedido, PedidoStatus } from "@/app/types/pedido";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://restaurante-backend-production-51a8.up.railway.app";

// ─── Clientes ─────────────────────────────────────────────────────────────────

export async function getClientes(): Promise<Cliente[]> {
  const res = await fetch(`${BASE_URL}/clientes/listar`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar clientes");
  return res.json();
}

export async function getClienteById(id: number): Promise<Cliente> {
  const res = await fetch(`${BASE_URL}/clientes/listar/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar cliente");
  return res.json();
}

export async function criarCliente(data: Omit<Cliente, "id">): Promise<Cliente> {
  const res = await fetch(`${BASE_URL}/clientes/criar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar cliente");
  return res.json();
}

export async function atualizarCliente(id: number, data: Partial<Omit<Cliente, "id">>): Promise<Cliente> {
  const res = await fetch(`${BASE_URL}/clientes/atualizar/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar cliente");
  return res.json();
}

// ─── Produtos ─────────────────────────────────────────────────────────────────

export async function getProdutos(): Promise<Produto[]> {
  const res = await fetch(`${BASE_URL}/produtos/listar`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

export async function getProdutoById(id: number): Promise<Produto> {
  const res = await fetch(`${BASE_URL}/produtos/listar/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar produto");
  return res.json();
}

export async function criarProduto(data: Omit<Produto, "id">): Promise<Produto> {
  const res = await fetch(`${BASE_URL}/produtos/criar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar produto");
  return res.json();
}

export async function atualizarProduto(id: number, data: Partial<Omit<Produto, "id">>): Promise<Produto> {
  const res = await fetch(`${BASE_URL}/produtos/atualizar/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar produto");
  return res.json();
}

export async function deletarProduto(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/produtos/deletar/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar produto");
}

// ─── Pedidos ──────────────────────────────────────────────────────────────────

export async function getPedidos(): Promise<Pedido[]> {
  const res = await fetch(`${BASE_URL}/pedidos/listar`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar pedidos");
  return res.json();
}

export async function getPedidoById(id: number): Promise<Pedido> {
  const res = await fetch(`${BASE_URL}/pedidos/listar/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar pedido");
  return res.json();
}

export async function criarPedido(data: CriarPedidoDTO): Promise<Pedido> {
  const res = await fetch(`${BASE_URL}/pedidos/criar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar pedido");
  return res.json();
}

export async function atualizarStatusPedido(id: number, status: PedidoStatus): Promise<Pedido> {
  const res = await fetch(`${BASE_URL}/pedidos/${id}/status?status=${status}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Erro ao atualizar status");
  return res.json();
}

export async function deletarPedido(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/pedidos/deletar/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar pedido");
}
