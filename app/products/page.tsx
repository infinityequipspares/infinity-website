"use client";

import { Suspense, useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import products from "@/data/products.json";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";

// 🌟 UPDATED SKELETON LOADING COMPONENT 🌟
function ProductsSkeletonFallback() {
  return (
    <section className="antialiased bg-gray-50/30 overflow-hidden min-h-screen">
      <div>
        <div className="mx-auto max-w-[1440px] px-4 pt-8 pb-4 lg:px-6 text-center flex flex-col items-center">
            <div className="h-5 w-36 bg-gray-200 rounded-full mb-4 animate-pulse"></div>
            <div className="h-10 w-3/4 max-w-2xl bg-gray-200 rounded-lg animate-pulse mb-2"></div>
        </div>

        <div className="mx-auto max-w-[1440px] px-2 md:px-4 lg:px-6">
          <div className="mb-6 mx-auto max-w-5xl bg-white rounded-xl border border-gray-200 shadow-sm p-2 flex flex-col md:flex-row items-center gap-2 md:gap-3">
            <div className="flex w-full md:w-auto items-center gap-2">
              <div className="w-24 md:w-32 h-10 md:h-12 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="flex-1 md:w-56 lg:w-64 h-10 md:h-12 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
            <div className="flex-1 w-full h-10 md:h-12 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>

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
  const router = useRouter();
  const pathname = usePathname();

  const initialCategory = searchParams.get("category") || "";
  const initialBrand = searchParams.get("brand") || "";

  const [filters, setFilters] = useState({
    brand: initialBrand,
    category: initialCategory,
    type: "",
  });

  const keyword = (searchParams.get("search") || "").toLowerCase();
  
  // 🌟 NEW STATES FOR SEARCH HISTORY 🌟
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load history from memory
  useEffect(() => {
    const saved = localStorage.getItem("infinityRecentSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load recent searches", e);
      }
    }
  }, []);

  // Save history to memory
  const saveSearchToMemory = (newKeyword: string) => {
    const kwd = newKeyword.trim();
    if (!kwd) return;
    let updatedSearches = [kwd, ...recentSearches.filter((item) => item !== kwd)];
    updatedSearches = updatedSearches.slice(0, 5); // Keep last 5
    setRecentSearches(updatedSearches);
    localStorage.setItem("infinityRecentSearches", JSON.stringify(updatedSearches));
  };

  const clearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem("infinityRecentSearches");
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search Update Function
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set("search", val);
      // Automatically close history if user starts typing a lot
      if (val.length > 0) setIsSearchOpen(false);
    } else {
      params.delete("search");
      // Open history if input becomes empty
      setIsSearchOpen(true); 
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Handle Enter Key to Save Search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyword.trim()) {
      saveSearchToMemory(keyword);
      setIsSearchOpen(false);
    }
  };

  // Handle clicking a recent search item
  const applyRecentSearch = (item: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", item);
    saveSearchToMemory(item);
    setIsSearchOpen(false);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

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

      const searchableText = `
        ${product.partNumber || ""}
        ${product.alternatePartNumbers || ""}
        ${product.alternatePartNumbers1 || ""}
        ${product.alternatePartNumbers2 || ""}
        ${product.alternatePartNumbers3 || ""}
        ${product.name || ""}
        ${product.brand || ""}
        ${product.category || ""}
        ${product.machines || ""}
        ${product.seoKeywords || ""}
      `.toLowerCase().replace(/[^a-z0-9]/g, "");

      const normalizedKeyword = keyword.toLowerCase().replace(/[^a-z0-9]/g, "");

      const matchSearch =
        normalizedKeyword === "" || searchableText.includes(normalizedKeyword);

      return matchBrand && matchCategory && matchType && matchSearch;
    });
  }, [filters, keyword]);

  return (
    <section className="antialiased bg-gray-50/30 overflow-visible min-h-screen">
      <div>
        <div className="mx-auto max-w-[1440px] px-4 pt-8 pb-4 lg:px-6 text-center flex flex-col items-center">
            <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-red-700 ring-1 ring-inset ring-red-600/20 mb-3 cursor-default">
              SPARE PARTS CATALOGUE
            </span>
            
            <h1 className="text-[26px] sm:text-3xl lg:text-[42px] xl:text-[46px] font-extrabold text-gray-900 tracking-tight leading-tight lg:whitespace-nowrap mx-auto w-full">
              Genuine, OEM & Aftermarket <span className="text-red-600">Spare Parts</span>
            </h1>
        </div>

        <div className="mx-auto max-w-[1440px] px-2 md:px-4 lg:px-6 relative z-50">
          
          <div className="mb-6 mx-auto max-w-5xl bg-white rounded-xl border border-gray-200 shadow-sm p-2 flex flex-col md:flex-row items-center gap-2 md:gap-3">
            
            <div className="flex w-full md:w-auto items-center gap-2">
              
              <div className="flex shrink-0 items-center justify-center rounded-lg bg-red-50 px-3 md:px-4 py-2 border border-red-100 w-auto h-10 md:h-12 min-w-[90px]">
                <span className="text-base md:text-xl font-black text-red-600 mr-1 md:mr-2">{filteredProducts.length}</span>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-red-500/80 mt-0.5">Products</span>
              </div>

              {/* 🌟 SEARCH BAR WITH HISTORY DROPDOWN 🌟 */}
              <div className="relative flex-1 md:w-56 lg:w-72 h-10 md:h-12" ref={searchRef}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="search"
                  value={searchParams.get("search") || ""}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchOpen(true)}
                  onKeyDown={handleKeyDown}
                  className="block w-full h-full pl-9 pr-3 text-[13px] md:text-[14px] text-gray-900 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#e60000] focus:border-[#e60000] transition-all placeholder-gray-400 outline-none"
                  placeholder="Search by part number, name..."
                />

                {/* Dropdown for Recent Searches */}
                {isSearchOpen && recentSearches.length > 0 && !keyword && (
                  <div className="absolute left-0 right-0 top-[105%] z-[99999] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Recent Searches
                      </span>
                      <button 
                        onClick={clearHistory} 
                        className="text-[10px] font-bold text-[#e60000] hover:text-[#cc0000] uppercase tracking-widest transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                    <ul className="max-h-[250px] overflow-y-auto custom-scroll">
                      {recentSearches.map((item, index) => (
                        <li key={index}>
                          <button
                            type="button"
                            onClick={() => applyRecentSearch(item)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-[13px] text-gray-700 font-medium border-b border-gray-50 last:border-0"
                          >
                            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="truncate">{item}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mb-12">
            {filteredProducts.map((product: any, index: number) => (
              <ProductCard
                key={`${product.partNumber || index}`}
                product={product}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 mt-8 mx-auto max-w-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500 text-[14px]">Try adjusting your filters or search keywords.</p>
            </div>
          )}

        </div>
      </div>
      
      {/* Scrollbar CSS */}
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #cdcdcd;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsSkeletonFallback />}>
      <ProductsContent />
    </Suspense>
  );
}
