import { Cliente } from "./cliente";
import { Produto } from "./produto";

export type PedidoStatus = "REGISTRADO" | "PREPARANDO" | "FINALIZADO";

export interface ItemPedido {
  id: number;
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
}

export interface Pedido {
  id: number;
  cliente: Cliente;
  status: PedidoStatus;
  dataPedido: string;
  valorTotal: number;
  itens: ItemPedido[];
}

export interface CriarPedidoDTO {
  clienteId: number;
  itens: { produtoId: number; quantidade: number }[];
}
