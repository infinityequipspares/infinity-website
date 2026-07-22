"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSearch() {
    const keyword = search.trim();

    if (!keyword) return;

    router.push(`/products?search=${encodeURIComponent(keyword)}`);
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-4">
      <h2 className="text-2xl font-bold text-center mb-5">
        Search Spare Parts
      </h2>

      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Search by Part Number, Part Name, or Machine Model..."
          className="flex-1 border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          onClick={handleSearch}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
