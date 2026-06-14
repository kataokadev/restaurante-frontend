import HeroCarousel from "./components/hero-carousel";
import ProductCard from "./components/product-card";
import { Produto } from "@/app/types/produto"
import { getProdutos } from "@/lib/api";

export default async function Home() {
  let produtos: Produto[] = [];
  try {
    produtos = await getProdutos();
  } catch {
    produtos = [];
  }

  const destaques = produtos.slice(0, 8);
  const sobremesas = produtos.slice(8, 11);

  return (
    <div className="space-y-20">
      {/* Banner Principal */}
      <HeroCarousel />

      {/* Destaques */}
      <section className="px-10">
        <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Pratos em Destaque
        </h2>

        {destaques.length > 0 ? (
          <div className="grid grid-cols-4 gap-6">
            {destaques.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Nenhum produto disponível no momento.</p>
        )}
      </section>

      {/* Sobremesas */}
      {sobremesas.length > 0 && (
        <section className="px-10 mb-10">
          <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Sobremesas
          </h2>

          <div className="grid grid-cols-3 gap-6">
            {sobremesas.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
