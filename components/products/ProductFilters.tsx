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
  const selectClass =
    "h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-[15px] font-medium text-gray-800 shadow-sm outline-none appearance-none transition-all duration-300 hover:border-red-300 hover:shadow-md focus:border-red-600 focus:ring-4 focus:ring-red-100 cursor-pointer";

  const labelClass =
    "mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500";

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

      {/* Brand */}
      <div>
        <label className={labelClass}>
          Brand
        </label>

        <select
          onChange={(e) =>
            onFilter((prev) => ({
              ...prev,
              brand: e.target.value,
            }))
          }
          className={selectClass}
        >
          <option value="">All Brands</option>

          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className={labelClass}>
          Category
        </label>

        <select
          onChange={(e) =>
            onFilter((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
          className={selectClass}
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Type */}
      <div>
        <label className={labelClass}>
          Product Type
        </label>

        <select
          onChange={(e) =>
            onFilter((prev) => ({
              ...prev,
              type: e.target.value,
            }))
          }
          className={selectClass}
        >
          <option value="">OEM / Aftermarket</option>
          <option value="OEM">OEM</option>
          <option value="Aftermarket">Aftermarket</option>
        </select>
      </div>

    </div>
  );
}