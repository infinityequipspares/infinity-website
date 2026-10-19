"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CategoryClientWrapper({ 
  category, 
  initialProducts 
}: { 
  category: any; 
  initialProducts: any[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const uniqueBrands = useMemo(() => {
    const brands = initialProducts.map(p => p.brand).filter(Boolean);
    return [...new Set(brands)] as string[];
  }, [initialProducts]);

  const uniqueTypes = useMemo(() => {
    const types = initialProducts.map(p => p.type).filter(Boolean);
    return [...new Set(types)] as string[];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery.trim() || (
        String(product.partNumber || "").toLowerCase().includes(lowerQuery) ||
        String(product.alternatePartNumbers1 || "").toLowerCase().includes(lowerQuery) ||
        String(product.alternatePartNumbers2 || "").toLowerCase().includes(lowerQuery) ||
        String(product.alternatePartNumbers3 || "").toLowerCase().includes(lowerQuery) ||
        String(product.name || "").toLowerCase().includes(lowerQuery) ||
        String(product.brand || "").toLowerCase().includes(lowerQuery)
      );

      const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
      const matchesType = selectedType ? product.type === selectedType : true;

      return matchesSearch && matchesBrand && matchesType;
    });
  }, [searchQuery, selectedBrand, selectedType, initialProducts]);

  if (!category) return null;

  return (
    <section className="antialiased bg-gray-50/30 overflow-hidden min-h-screen">
      <div>
        {/* 1. Compact Hero Section */}
        <div className="mx-auto max-w-[1440px] px-4 pt-6 pb-2 lg:px-6 flex flex-col items-start">
            
            {/* Top Path - Only Back to Categories */}
            <div className="w-full mb-4 md:mb-6">
                <Link 
                  href="/#categories" 
                  className="inline-flex items-center text-[13px] md:text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Categories
                </Link>
            </div>
            
            {/* Header Text */}
            <div className="w-full text-center mb-6">
               <h1 className="text-[26px] sm:text-3xl lg:text-[42px] xl:text-[46px] font-extrabold text-gray-900 tracking-tight leading-tight lg:whitespace-nowrap mx-auto w-full">
                  <span className="text-red-600">Infinity</span> <span className="capitalize">{category["Category Name"]}</span>
               </h1>
               <p className="mt-2 text-xs md:text-base text-gray-500 max-w-2xl mx-auto">
                 Browse all available {category["Category Name"]} from OEM and aftermarket manufacturers.
               </p>
            </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-2 md:px-4 lg:px-6">
          
          {/* 2. Filter & Search Bar Row: Mobile pe stack hoga ya perfectly fit hoga, Desktop pe max-w-5xl rahega */}
          <div className="mb-6 mx-auto w-full max-w-5xl bg-white rounded-xl border border-gray-200 shadow-sm p-2 flex flex-col md:flex-row items-center gap-2 md:gap-3">
            
            {/* Badge & Search wrapper for mobile flex */}
            <div className="flex w-full md:w-auto items-center gap-2">
              {/* Badge */}
              <div className="flex shrink-0 items-center justify-center rounded-lg bg-red-50 px-3 md:px-4 py-2 border border-red-100 h-10 md:h-12 min-w-[90px] md:min-w-[110px]">
                <span className="text-base md:text-xl font-black text-red-600 mr-1.5 md:mr-2">{filteredProducts.length}</span>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-red-500/80 mt-0.5">Products</span>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 md:w-64 h-10 md:h-12">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full h-full pl-9 pr-3 text-[13px] md:text-[14px] text-gray-900 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder-gray-400 outline-none"
                  placeholder={`Search in ${category["Category Name"]}...`}
                />
              </div>
            </div>
            
            {/* Dropdown Filters Container */}
            <div className="flex w-full md:flex-1 gap-2">
                {/* Brand Filter */}
                <div className="relative flex-1">
                    <select 
                       value={selectedBrand} 
                       onChange={(e) => setSelectedBrand(e.target.value)}
                       className="appearance-none w-full h-10 md:h-12 px-3 text-[12px] md:text-[14px] text-gray-700 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all cursor-pointer"
                    >
                       <option value="">All Brands</option>
                       {uniqueBrands.map(brand => (
                         <option key={brand} value={brand}>{brand}</option>
                       ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>

                {/* Type Filter */}
                <div className="relative flex-1">
                    <select 
                       value={selectedType} 
                       onChange={(e) => setSelectedType(e.target.value)}
                       className="appearance-none w-full h-10 md:h-12 px-3 text-[12px] md:text-[14px] text-gray-700 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 outline-none transition-all cursor-pointer"
                    >
                       <option value="">All Types</option>
                       {uniqueTypes.map(type => (
                         <option key={type} value={type}>{type}</option>
                       ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

          </div>

          {/* 3. Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 mt-8 mx-auto max-w-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500 text-[14px]">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mb-12">
              {filteredProducts.map((product: any) => {
                const allPartNumbers = [
                  product.partNumber,
                  product.alternatePartNumbers1,
                  product.alternatePartNumbers2,
                  product.alternatePartNumbers3
                ].filter(Boolean).join(" / ");

                return (
                  <Link
                    key={product.id || product.partNumber}
                    href={`/products/${product.partNumber}`}
                    className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-[#fbfbfb] p-3 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:p-4"
                  >
                    <div className="relative mb-4 flex h-32 w-full items-center justify-center overflow-hidden rounded-lg bg-slate-100 sm:h-40 md:h-48">
                      <Image
                        src={product.image ? `/images/products/${product.image}` : "/images/products/no-image.jpg"}
                        alt={product.name || "Product"}
                        width={250}
                        height={250}
                        className="h-full w-full mix-blend-multiply object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mb-2 flex">
                      <span className="inline-flex items-center rounded-full border border-red-100/50 bg-red-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-red-600">
                        {category["Category Name"]}
                      </span>
                    </div>
                    <h3 className="mb-3 min-h-[36px] text-[12px] font-extrabold leading-tight tracking-tight text-slate-800 line-clamp-2 sm:text-[13px] md:text-sm md:tracking-normal">
                      {product.name}
                    </h3>
                    <div className="mb-2 flex flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 sm:text-[10px]">Part Number</span>
                      <span className="text-[12px] font-bold text-slate-800 sm:text-[13px] md:text-sm">{allPartNumbers}</span>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="mb-3 mt-3 sm:mt-4">
                      <p className="text-[10px] text-slate-500 sm:text-[11px] md:text-xs">
                        Compatible with <span className="font-bold text-slate-700">{product.brand}</span>
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-center rounded-md bg-[#c00000] py-2 text-[11px] font-bold text-white transition-colors duration-300 group-hover:bg-[#a00000] sm:text-[12px] md:text-[13px]">
                      View Details &rarr;
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
