"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import products from "@/data/products.json";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";

// 🌟 NAYA SKELETON LOADING COMPONENT 🌟
function ProductsSkeletonFallback() {
  return (
    <section className="antialiased bg-gray-50/30 overflow-hidden min-h-screen">
      <div>
        {/* Skeleton Hero Section */}
        <div className="mx-auto max-w-[1440px] px-4 pt-8 pb-4 lg:px-6 text-center flex flex-col items-center">
            <div className="h-5 w-36 bg-gray-200 rounded-full mb-4 animate-pulse"></div>
            <div className="h-10 w-3/4 max-w-2xl bg-gray-200 rounded-lg animate-pulse mb-2"></div>
        </div>

        <div className="mx-auto max-w-[1440px] px-2 md:px-4 lg:px-6">
          {/* Skeleton Filter Bar */}
          <div className="mb-6 mx-auto max-w-5xl bg-white rounded-xl border border-gray-200 shadow-sm p-2 flex flex-col md:flex-row items-center gap-2 md:gap-3">
            <div className="w-full md:w-32 h-10 md:h-12 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="flex-1 w-full h-10 md:h-12 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>

          {/* Skeleton Grid (12 Dummy Cards jo chamkenge) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mb-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm p-3 animate-pulse flex flex-col h-full">
                <div className="w-full h-32 sm:h-40 bg-gray-100 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-5"></div>
                <div className="mt-auto h-9 bg-gray-100 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// MAIN PRODUCTS COMPONENT
function ProductsContent() {
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "";
  const initialBrand = searchParams.get("brand") || "";

  const [filters, setFilters] = useState({
    brand: initialBrand,
    category: initialCategory,
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
      const matchBrand = filters.brand ? product.brand === filters.brand : true;
      const matchCategory = filters.category ? product.category === filters.category : true;
      const matchType = filters.type ? product.type === filters.type : true;

      const matchSearch =
        keyword === "" ||
        String(product.partNumber || "").toLowerCase().includes(keyword) ||
        String(product.alternatePartNumbers || "").toLowerCase().includes(keyword) ||
        String(product.name || "").toLowerCase().includes(keyword) ||
        String(product.brand || "").toLowerCase().includes(keyword) ||
        String(product.category || "").toLowerCase().includes(keyword) ||
        String(product.machines || "").toLowerCase().includes(keyword);

      return matchBrand && matchCategory && matchType && matchSearch;
    });
  }, [filters, keyword]);

  return (
    <section className="antialiased bg-gray-50/30 overflow-hidden min-h-screen">
      <div>
        {/* 1. Ultra Compact Hero Section */}
        <div className="mx-auto max-w-[1440px] px-4 pt-8 pb-4 lg:px-6 text-center flex flex-col items-center">
            <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-red-700 ring-1 ring-inset ring-red-600/20 mb-3 cursor-default">
              SPARE PARTS CATALOGUE
            </span>
            
            <h1 className="text-[26px] sm:text-3xl lg:text-[42px] xl:text-[46px] font-extrabold text-gray-900 tracking-tight leading-tight lg:whitespace-nowrap mx-auto w-full">
              Genuine, OEM & Aftermarket <span className="text-red-600">Spare Parts</span>
            </h1>
        </div>

        <div className="mx-auto max-w-[1440px] px-2 md:px-4 lg:px-6">
          
          {/* 2. Single Line Filter Bar */}
          <div className="mb-6 mx-auto max-w-5xl bg-white rounded-xl border border-gray-200 shadow-sm p-2 flex flex-col md:flex-row items-center gap-2 md:gap-3">
            
            {/* Inline Badge */}
            <div className="flex shrink-0 items-center justify-center rounded-lg bg-red-50 px-4 py-2 border border-red-100 w-full md:w-auto h-10 md:h-12">
              <span className="text-lg md:text-xl font-black text-red-600 mr-2">{filteredProducts.length}</span>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-red-500/80 mt-0.5">Products</span>
            </div>
            
            {/* Filters */}
            <div className="flex-1 w-full">
              <ProductFilters
                brands={brands}
                categories={categories}
                onFilter={setFilters}
              />
            </div>
          </div>

          {/* 3. Products Grid (6 columns on extra large screens) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mb-12">
            {filteredProducts.map((product: any, index: number) => (
              <ProductCard
                key={`${product.partNumber || index}`}
                product={product}
              />
            ))}
          </div>

          {/* No Products Found State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 mt-8 mx-auto max-w-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500 text-[14px]">Try adjusting your filters or search keywords.</p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

// 🌟 PAGE EXPORT WITH SUSPENSE AND SKELETON 🌟
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsSkeletonFallback />}>
      <ProductsContent />
    </Suspense>
  );
}
