"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Produto } from "@/app/types/produto";

interface Props {
  produto: Produto;
}

export default function ProductCard({ produto }: Props) {
  const { addItem } = useCart();

  return (
    <div className="border-2 border-solid border-orange-500 rounded-lg p-4 shadow hover:-translate-y-1 hover:shadow-2xs hover:bg-mist-900 transition duration-300 ease-in-out">
      <Image
        src="/images/prato2.jpg"
        alt={produto.nome}
        width={250}
        height={150}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h3 className="font-bold text-xl mt-3">{produto.nome}</h3>

      <p className="text-lg font-bold text-yellow-500">
        R$ {produto.preco.toFixed(2)}
      </p>

      <button
        onClick={() => addItem(produto)}
        className="mt-4 font-bold w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black py-2 rounded cursor-pointer hover:-translate-y-0.5 hover:bg-amber-300 transition duration-300 ease-in-out"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
