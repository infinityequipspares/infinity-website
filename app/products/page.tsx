"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import products from "@/data/products.json";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";

function ProductsContent() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    type: "",
  });

  const keyword = (searchParams.get("search") || "").toLowerCase();

  const brands = useMemo(
    () => [...new Set(products.map((p: any) => String(p.brand || "")))],
    []
  );

  const categories = useMemo(
    () => [...new Set(products.map((p: any) => String(p.category || "")))],
    []
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product: any) => {
      const matchBrand = filters.brand
        ? product.brand === filters.brand
        : true;

      const matchCategory = filters.category
        ? product.category === filters.category
        : true;

      const matchType = filters.type
        ? product.type === filters.type
        : true;

      const matchSearch =
        keyword === "" ||
        String(product.partNumber || "").toLowerCase().includes(keyword) ||
        String(product.alternatePartNumbers || "")
          .toLowerCase()
          .includes(keyword) ||
        String(product.name || "").toLowerCase().includes(keyword) ||
        String(product.brand || "").toLowerCase().includes(keyword) ||
        String(product.category || "").toLowerCase().includes(keyword) ||
        String(product.machines || "").toLowerCase().includes(keyword);

      return (
        matchBrand &&
        matchCategory &&
        matchType &&
        matchSearch
      );
    });
  }, [filters, keyword]);

  return (
    <section className="mx-auto max-w-[1360px] px-4 py-5 lg:px-6">

      <div className="mb-6 rounded-xl border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        
        <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between lg:px-8 lg:py-5">
          
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-[32px]">
              Spare Parts Catalogue
            </h1>
            <p className="mt-1.5 text-[15px] leading-relaxed text-gray-500">
              OEM & Aftermarket Spare Parts for Boom Lifts, Scissor Lifts and Aerial Work Platforms.
            </p>
          </div>

          <div className="flex shrink-0 flex-col justify-center border-t border-gray-100 pt-3 md:border-t-0 md:border-l md:border-gray-200 md:pl-6 md:pt-0 md:text-right">
            <span className="text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl">
              {filteredProducts.length}
            </span>
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
              {filteredProducts.length === 1 ? "Product Available" : "Products Available"}
            </span>
          </div>
          
        </div>

        <div className="border-t border-gray-100 px-5 py-3 lg:px-8 lg:py-4">
          <ProductFilters
            brands={brands}
            categories={categories}
            onFilter={setFilters}
          />
        </div>
        
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {filteredProducts.map((product: any, index: number) => (
          <ProductCard
            key={`${product.partNumber || index}`}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
