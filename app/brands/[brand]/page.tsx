import productsData from "@/json/products.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const products = Array.isArray(productsData)
  ? productsData
  : (productsData as any).products || [];

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;

  const brandProducts = products.filter(
    (product: any) =>
      product.brand?.toLowerCase() === brand.toLowerCase()
  );

  if (brandProducts.length === 0) {
    notFound();
  }

  const displayBrand = brandProducts[0].brand;

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-10">

      <div className="mb-10">
        <p className="text-red-600 uppercase tracking-[4px] font-semibold">
          Brand
        </p>

        <h1 className="text-5xl font-bold mt-3">
          {displayBrand} Spare Parts
        </h1>

        <p className="text-gray-600 mt-5 max-w-3xl leading-8">
          Browse genuine and premium aftermarket spare parts compatible with{" "}
          {displayBrand} aerial work platforms, boom lifts, scissor lifts,
          telehandlers and material handling equipment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {brandProducts.map((product: any) => (

          <Link
            key={product.id}
            href={`/products/${product.partNumber}`}
            className="bg-white border rounded-2xl overflow-hidden hover:border-red-600 hover:shadow-xl transition"
          >

            <div className="h-64 flex items-center justify-center bg-white p-6">

              <Image
                src={product.image}
                alt={product.name}
                width={250}
                height={250}
                className="object-contain max-h-52"
              />

            </div>

            <div className="p-6">

              <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                {product.type}
              </span>

              <h2 className="text-xl font-bold mt-4">
                {product.name}
              </h2>

              <p className="text-gray-500 mt-2">
                Part Number
              </p>

              <p className="font-semibold">
                {product.partNumber}
              </p>

              <p className="text-gray-500 mt-4 text-sm">
                {product.category}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}