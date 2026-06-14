"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItens } = useCart();

  return (
    <main>
      <div className="flex w-full fixed justify-between border-b-2 border-solid border-orange-500 px-10 items-center bg-gray-950 h-20 z-50">
        <Image
          src="/images/logo.png"
          width={50}
          height={50}
          alt="Logo"
        />
        <h1 className="absolute left-1/2 -translate-x-1/2 text-7xl">Dev&apos;s Restaurant</h1>
        <nav className="flex font-bold gap-5">
          <Link className="relative group" href="/">
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-amber-300 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            Home
          </Link>
          <Link className="relative group" href="/cardapio">
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-amber-300 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            Cardápio
          </Link>
          <Link className="relative group" href="/carrinho">
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-amber-300 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            Carrinho
            {totalItens > 0 && (
              <span className="ml-1 bg-orange-500 text-black text-xs font-bold rounded-full px-1.5 py-0.5">
                {totalItens}
              </span>
            )}
          </Link>
          <Link className="relative group" href="/pedidos">
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-amber-300 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            Meus Pedidos
          </Link>
        </nav>
      </div>
    </main>
  );
}
