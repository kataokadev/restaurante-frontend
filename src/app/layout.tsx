import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/main-footer";
import Header from "./components/main-header";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Dev's Restaurant",
  description: "Sistema de Restaurante",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1 pt-16 border-bs-gray-900">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
