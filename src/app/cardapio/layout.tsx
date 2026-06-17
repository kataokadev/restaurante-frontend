import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prime Grill - Cardápio",
  description: "Cardápio da empresa",
};

export default function CardapioLayout({
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