import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prime Grill - Carrinho",
  description: "Carrinho da empresa",
};

export default function CarrinhoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1">
      {children}
    </main>
  );
}