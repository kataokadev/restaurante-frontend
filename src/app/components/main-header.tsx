"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Header() {
  const { totalItens } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      {/* Header fixo */}
      <div className="flex w-full fixed top-0 justify-between border-b-2 border-solid border-orange-500 px-10 items-center bg-gray-950 h-20 z-50">
        <Image
          className="hidden xl:block"
          src="/images/logo2.png"
          width={100}
          height={90}
          alt="Logo"
        />
        <h1 className=" text-4xl xl:absolute xl:left-1/2 xl:-translate-x-1/2 lg:text-7xl">
          Prime Grill
        </h1>
        <nav className="hidden lg:flex font-bold gap-5">
          <Link className="relative group" href="/">
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-amber-300 group-hover:w-full transition-all duration-300 ease-in-out" />
            Home
          </Link>
          <Link className="relative group" href="/cardapio">
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-amber-300 group-hover:w-full transition-all duration-300 ease-in-out" />
            Cardápio
          </Link>
          <Link className="relative group" href="/carrinho">
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-amber-300 group-hover:w-full transition-all duration-300 ease-in-out" />
            Carrinho
            {totalItens > 0 && (
              <span className="ml-1 bg-orange-500 text-black text-xs font-bold rounded-full px-1.5 py-0.5">
                {totalItens}
              </span>
            )}
          </Link>
          <Link className="relative group" href="/pedidos">
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-amber-300 group-hover:w-full transition-all duration-300 ease-in-out" />
            Meus Pedidos
          </Link>
        </nav>

        <button
          className="block lg:hidden cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Abrir menu"
        >
          {menuOpen ? (
            <X size={32} color="white" />
          ) : (
            <Menu size={32} color="white" />
          )}
        </button>
      </div>

      <div
        className={`
          lg:hidden fixed top-20 left-0 w-full bg-gray-950 border-b-2 border-orange-500
          z-40 transition-all duration-600 ease-in-out overflow-hidden
          ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav className="flex flex-col gap-4 px-6 py-4 font-bold text-white">
          <Link
            className="relative group w-fit"
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-amber-300 group-hover:w-full transition-all duration-300 ease-in-out" />
            Home
          </Link>
          <Link
            className="relative group w-fit"
            href="/cardapio"
            onClick={() => setMenuOpen(false)}
          >
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-amber-300 group-hover:w-full transition-all duration-300 ease-in-out" />
            Cardápio
          </Link>
          <Link
            className="relative group w-fit"
            href="/carrinho"
            onClick={() => setMenuOpen(false)}
          >
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-amber-300 group-hover:w-full transition-all duration-300 ease-in-out" />
            Carrinho
            {totalItens > 0 && (
              <span className="ml-1 bg-orange-500 text-black text-xs font-bold rounded-full px-1.5 py-0.5">
                {totalItens}
              </span>
            )}
          </Link>
          <Link
            className="relative group w-fit"
            href="/pedidos"
            onClick={() => setMenuOpen(false)}
          >
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-amber-300 group-hover:w-full transition-all duration-300 ease-in-out" />
            Meus Pedidos
          </Link>
        </nav>
      </div>
    </main>
  );
}