"use client";

import { Dispatch, SetStateAction } from "react";

type FilterState = {
  brand: string;
  category: string;
  type: string;
};

type Props = {
  brands: string[];
  categories: string[];
  onFilter: Dispatch<SetStateAction<FilterState>>;
};

export default function ProductFilters({
  brands,
  categories,
  onFilter,
}: Props) {
  
  // Sleek inline select styling (No labels needed)
  const selectClass =
    "h-10 md:h-12 w-full rounded-lg border border-gray-200 bg-gray-50/50 px-2 md:px-3 text-[11px] md:text-[13px] font-bold text-gray-700 shadow-sm outline-none appearance-none transition-all duration-300 hover:border-red-300 hover:bg-white focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100 text-center md:text-left truncate cursor-pointer";

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">

      {/* Brand */}
      <select
        onChange={(e) => onFilter((prev) => ({ ...prev, brand: e.target.value }))}
        className={selectClass}
      >
        <option value="">All Brands</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>

      {/* Category */}
      <select
        onChange={(e) => onFilter((prev) => ({ ...prev, category: e.target.value }))}
        className={selectClass}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      {/* Product Type */}
      <select
        onChange={(e) => onFilter((prev) => ({ ...prev, type: e.target.value }))}
        className={selectClass}
      >
        <option value="">All Types</option>
        <option value="Genuine">Genuine</option>
        <option value="OEM">OEM</option>
        <option value="Aftermarket">Aftermarket</option>
      </select>

    </div>
  );
}
