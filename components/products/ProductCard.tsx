import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  if (!product) return null;

  const imagePath =
    product.image && product.image !== ""
      ? product.image.startsWith("/")
        ? product.image
        : `/images/products/${product.image}`
      : "/images/products/no-image.jpg";

  const partNumbers = [
    product.partNumber,
    product.alternatePartNumbers,
    product.alternatePartNumbers1,
    product.alternatePartNumbers2,
    product.alternatePartNumbers3,
  ]
    .filter(Boolean)
    .flatMap((part) =>
      String(part)
        .split(/[;,|/]/)
        .map((p) => p.trim())
        .filter(Boolean)
    );

  const displayPartNumbers = [...new Set(partNumbers)].join(" / ") || "N/A";

  return (
    <Link
      href={`/products/${product.slug || product.partNumber}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="relative mb-2 flex h-[160px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={imagePath}
          alt={product.name || ""}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col px-0.5">
        {/* Category: Capitalize format */}
        <div className="mb-1">
          <span className="inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600 capitalize">
            {product.category?.toLowerCase() || "-"}
          </span>
        </div>

        {/* Product Name: Static (No Hover Red) */}
        <h3 className="mb-1 line-clamp-2 break-words text-[13px] font-bold leading-tight text-gray-900 transition-colors">
          {product.name}
        </h3>

        {/* Part Number: Hover Red */}
        <div className="mb-2">
          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
            Part Number
          </p>
          <p className="break-words text-[13px] font-extrabold leading-tight text-gray-800 group-hover:text-red-600 transition-colors">
            {displayPartNumbers}
          </p>
        </div>

        {/* Brand */}
        <div className="mt-auto">
          <span className="text-[10px] text-gray-500">
            Compatible with <span className="font-semibold text-gray-700">{product.brand || "-"}</span>
          </span>
        </div>
      </div>

      {/* Button */}
      <button className="mt-3 flex h-8 w-full shrink-0 items-center justify-center rounded-lg bg-red-600 text-[12px] font-bold text-white transition-all duration-300 hover:bg-red-700">
        View Details
        <ArrowRight size={13} className="ml-1.5" />
      </button>
    </Link>
  );
}
