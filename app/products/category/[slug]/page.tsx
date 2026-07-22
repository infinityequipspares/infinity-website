import categories from "@/data/categories.json";
import products from "@/data/products.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = categories.find(
    (item: any) => item["Category Slug"] === slug
  );

  if (!category) {
    notFound();
  }

  const filteredProducts = products.filter(
    (item: any) =>
      String(item.category || "").toLowerCase() ===
      String(category["Category Name"]).toLowerCase()
  );

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 md:py-10">

      {/* Breadcrumb (FIX: Reduced bottom margin for mobile) */}
      <div className="mb-4 text-[12px] md:text-sm text-gray-500 md:mb-8">
        Home / Products /{" "}
        <span className="font-semibold text-red-600">
          {category["Category Name"]}
        </span>
      </div>

      {/* Heading (FIX: Reduced bottom margin for mobile) */}
      <div className="mb-8 text-center md:mb-14">

        <p className="text-[12px] md:text-base font-semibold uppercase tracking-[4px] text-red-600">
          Category
        </p>

        {/* Title (FIX: Adjusted font size and top margin for mobile) */}
        <h1 className="mt-2 text-3xl font-bold md:mt-3 md:text-5xl">
          {category["Category Name"]}
        </h1>

        {/* Description (FIX: Reduced top margin and text size for mobile) */}
        <p className="mx-auto mt-2 max-w-2xl text-[13px] text-gray-500 md:mt-4 md:text-base">
          Browse all available {category["Category Name"]} from OEM and
          aftermarket manufacturers.
        </p>

        {/* Pill (FIX: Reduced top margin) */}
        <div className="mt-3 md:mt-5 inline-flex rounded-full bg-red-50 px-5 py-2 text-[12px] md:text-sm font-semibold text-red-700">
          {filteredProducts.length} Products Found
        </div>

      </div>

      {filteredProducts.length === 0 ? (

        <div className="py-16 text-center md:py-24">
          <h2 className="text-2xl md:text-3xl font-bold">
            Products Coming Soon
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-500">
            We are updating this category.
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

          {filteredProducts.map((product: any) => (

            // YAHAN SE NAYA CARD DESIGN START HOTA HAI (Same as Main Products Page)
            <Link
              key={product.id || product.partNumber}
              href={`/products/${product.partNumber}`}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-[#fbfbfb] p-3 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:p-4"
            >

              {/* 1. Image Container (Grey background) */}
              <div className="relative mb-4 flex h-32 w-full items-center justify-center overflow-hidden rounded-lg bg-slate-100 sm:h-40 md:h-48">
                <Image
                  src={
                    product.image
                      ? `/images/products/${product.image}`
                      : "/images/products/no-image.jpg"
                  }
                  alt={product.name || "Product"}
                  width={250}
                  height={250}
                  className="h-full w-full mix-blend-multiply object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* 2. Category Pill */}
              <div className="mb-2 flex">
                <span className="inline-flex items-center rounded-full border border-red-100/50 bg-red-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-red-600">
                  {category["Category Name"]}
                </span>
              </div>

              {/* 3. Product Title */}
              <h3 className="mb-3 min-h-[36px] text-[12px] font-extrabold leading-tight tracking-tight text-slate-800 line-clamp-2 sm:text-[13px] md:text-sm md:tracking-normal">
                {product.name}
              </h3>

              {/* 4. Part Number Section */}
              <div className="mb-2 flex flex-col">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 sm:text-[10px]">
                  Part Number
                </span>
                <span className="text-[12px] font-bold text-slate-800 sm:text-[13px] md:text-sm">
                  {product.partNumber}
                </span>
              </div>

              {/* Spacer - Button ko hamesha bottom par align karne ke liye */}
              <div className="flex-grow"></div>

              {/* 5. Compatibility Info */}
              <div className="mb-3 mt-3 sm:mt-4">
                <p className="text-[10px] text-slate-500 sm:text-[11px] md:text-xs">
                  Compatible with <span className="font-bold text-slate-700">{product.brand}</span>
                </p>
              </div>

              {/* 6. View Details Button (Solid Red) */}
              <div className="flex w-full items-center justify-center rounded-md bg-[#c00000] py-2 text-[11px] font-bold text-white transition-colors duration-300 group-hover:bg-[#a00000] sm:text-[12px] md:text-[13px]">
                View Details &rarr;
              </div>

            </Link>

          ))}

        </div>

      )}

    </section>
  );
}
