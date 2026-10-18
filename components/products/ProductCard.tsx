import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  if (!product) return null;

  // YOUR ORIGINAL IMAGE LOGIC (No assumptions made)
  const imagePath =
    product.image && product.image !== ""
      ? product.image.startsWith("/")
        ? product.image
        : `/images/products/${product.image}`
      : "/images/products/no-image.jpg";

  // YOUR ORIGINAL PART NUMBER LOGIC
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
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-2.5 sm:p-3 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_8px_30px_rgb(220,38,38,0.12)]"
    >
      {/* 1. Perfect Square Image Container (Replaced h-[160px] with aspect-square) */}
      <div className="relative mb-3 flex w-full aspect-square shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
        <Image
          src={imagePath}
          alt={product.name || ""}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105 p-1"
        />
        {/* Subtle overlay effect on hover */}
        <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors duration-300"></div>
      </div>

      <div className="flex flex-1 flex-col px-1">
        {/* Category */}
        <div className="mb-2">
          <span className="inline-flex rounded-md bg-red-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-red-600 transition-colors group-hover:bg-red-100">
            {product.category || "-"}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="mb-3 line-clamp-2 break-words text-[13px] sm:text-[14px] font-extrabold leading-snug text-gray-900 transition-colors">
          {product.name}
        </h3>

        {/* Part Number */}
        <div className="mb-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
            Part Number
          </p>
          <p className="break-words text-[13px] sm:text-[14px] font-black leading-tight text-gray-900 group-hover:text-red-600 transition-colors">
            {displayPartNumbers}
          </p>
        </div>

        {/* Brand */}
        <div className="mt-auto border-t border-gray-50 pt-2.5">
          <span className="text-[10px] font-medium text-gray-500 line-clamp-1">
            Compatible with <span className="font-bold text-gray-800">{product.brand || "-"}</span>
          </span>
        </div>
      </div>

      {/* Button - Upgraded to Premium Look */}
      <button className="mt-3.5 flex h-9 w-full shrink-0 items-center justify-center rounded-xl bg-red-600 text-[11px] uppercase tracking-widest font-bold text-white transition-all duration-300 group-hover:bg-red-700 shadow-sm group-hover:shadow-md">
        View Details
        <ArrowRight size={13} className="ml-1.5 transition-transform group-hover:translate-x-1" />
      </button>
    </Link>
  );
}
