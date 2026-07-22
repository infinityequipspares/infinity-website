import products from "@/data/products.json";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 10);

  return (
    <section className="max-w-[1350px] mx-auto px-4 py-10">

      <div className="flex items-center justify-between mb-6">

        <div>

          <p className="text-red-600 font-semibold uppercase tracking-[3px]">
            Featured Products
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Popular Spare Parts
          </h2>

        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

        {featuredProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>
  );
}