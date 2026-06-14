import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dev's Restaurant - Pedidos",
  description: "Sistema de Pedidos Restaurante",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <main className="flex-1 pt-16 border-bs-gray-900">
          {children}
        </main>
  );
}