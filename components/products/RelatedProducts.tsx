import Link from "next/link";

import Image from "next/image";

import products from "@/data/products.json";

interface RelatedProductsProps {

  currentPartNumber: string;

  category: string;

}

export default function RelatedProducts({

  currentPartNumber,

  category,

}: RelatedProductsProps) {

  const relatedProducts = products

    .filter((item: any) => {

      return (

        String(item.category).toLowerCase() ===

          String(category).toLowerCase() &&

        String(item.partNumber || "") !== String(currentPartNumber)

      );

    })

    .slice(0, 6);

  if (relatedProducts.length === 0) {

    return null;

  }

  return (

    <section className="mt-10 border-t border-gray-200 pt-8">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-gray-900">

          Related Products

        </h2>

        <span className="text-sm font-medium text-gray-500">

          {relatedProducts.length} Products

        </span>

      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">

        {relatedProducts.map((product: any, index: number) => (

          <Link

            key={`${product.partNumber}-${index}`}

            href={`/products/${product.slug || product.partNumber}`}

            className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:shadow-lg"

          >

            {/* Image */}

            <div className="flex h-36 items-center justify-center border-b border-gray-100 bg-white p-3">

              <Image

                src={

                  product.image

                    ? product.image.startsWith("/")

                      ? product.image

                      : `/images/products/${product.image}`

                    : "/images/products/no-image.jpg"

                }

                alt={product.name || "Product"}

                width={150}

                height={150}

                className="max-h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"

              />

            </div>

            {/* Content */}

            <div className="space-y-2 p-3">

              <p className="text-[10px] font-bold uppercase tracking-wide text-red-600">

                {product.brand || "-"}

              </p>

              <h3 className="line-clamp-2 min-h-[34px] text-[13px] font-semibold leading-4 text-gray-900">

                {product.name}

              </h3>

              <div>

                <p className="text-[10px] uppercase tracking-wider text-gray-500">

                  Part Number

                </p>

                <p className="mt-0.5 break-all text-[13px] font-bold text-red-600">

                  {product.partNumber}

                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>

  );

}