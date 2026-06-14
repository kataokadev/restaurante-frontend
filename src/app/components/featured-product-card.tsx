"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Produto } from "@/app/types/produto";

interface Props {
  produto: Produto;
  imagem?: string;
}

export default function MenuProductCard({ produto, imagem }: Props) {
  const { addItem } = useCart();

  return (
    <div className="border rounded-xl shadow-lg p-4 flex flex-col hover:shadow-2xl hover:bg-mist-900 hover:-translate-y-2 items-center transition duration-300 ease-in-out">
      <Image
        src={imagem || "/images/prato2.jpg"}
        alt={produto.nome}
        width={250}
        height={250}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h2 className="text-xl font-bold mt-3">{produto.nome}</h2>

      <p className="bg-gradient-to-r to-green-700 from-green-500 bg-clip-text text-transparent font-bold">
        R$ {produto.preco.toFixed(2)}
      </p>

      <button
        onClick={() => addItem(produto)}
        className="relative group mt-4 border-2 border-solid border-white text-white px-6 py-2 rounded-lg cursor-pointer hover:text-black transition duration-300 ease-in-out"
      >
        <span className="absolute inset-0 rounded-b-md w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full z-0"></span>
        <span className="relative z-10 font-bold group-hover:text-black">
          Comprar
        </span>
      </button>
    </div>
  );
}
