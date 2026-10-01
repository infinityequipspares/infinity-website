"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  function saveSearch(keyword: string) {
    const updatedSearches = [keyword, ...recentSearches.filter((item) => item !== keyword)].slice(0, 6);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  }

  function handleSearch(overrideKeyword?: string) {
    const keyword = typeof overrideKeyword === "string" ? overrideKeyword.trim() : search.trim();

    if (!keyword) return;

    saveSearch(keyword);
    setShowDropdown(false);
    router.push(`/products?search=${encodeURIComponent(keyword)}`);
  }

  function clearHistory() {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-4 relative z-50">
      <h2 className="text-2xl font-bold text-center mb-5">
        Search Spare Parts
      </h2>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            placeholder="Search by Part Number, Part Name, or Machine Model..."
            className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          {showDropdown && recentSearches.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-xl rounded-xl mt-2 overflow-hidden z-50">
              <div className="px-5 py-3 text-xs font-bold text-gray-500 bg-gray-50 tracking-wider">
                RECENT SEARCH
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {recentSearches.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSearch(item);
                      handleSearch(item);
                    }}
                    className="px-5 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm font-medium transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="px-5 py-3 border-t border-gray-200 text-right bg-gray-50">
                <button
                  onClick={clearHistory}
                  className="text-sm text-red-600 hover:text-red-800 font-semibold transition-colors"
                >
                  Clear Search History
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => handleSearch()}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
