import MenuProductCard from "../components/featured-product-card";
import { getProdutos } from "@/lib/api";

export default async function CardapioPage() {
  let produtos = [];
  try {
    produtos = await getProdutos();
  } catch {
    produtos = [];
  }

  return (
    <div className="px-10 py-10">
      <h1 className="text-6xl font-bold mb-10 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
        Cardápio
      </h1>

      {produtos.length === 0 ? (
        <p className="text-gray-400 text-lg">Nenhum produto disponível no momento.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <MenuProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}
