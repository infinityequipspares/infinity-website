"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Component load hone par purani history nikalna
  useEffect(() => {
    const saved = localStorage.getItem("infinityRecentSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load recent searches", e);
      }
    }

    // Agar bahar click kiya toh dropdown band kar do
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Nayi search ko save karna (Deduplicate karke, max 5)
  const saveSearchToMemory = (keyword: string) => {
    let updatedSearches = [keyword, ...recentSearches.filter(item => item !== keyword)];
    updatedSearches = updatedSearches.slice(0, 5); // Sirf last 5 searches dikhayenge
    setRecentSearches(updatedSearches);
    localStorage.setItem("infinityRecentSearches", JSON.stringify(updatedSearches));
  };

  function handleSearch(term?: string) {
    const keyword = (term || search).trim();
    if (!keyword) return;

    saveSearchToMemory(keyword);
    setIsDropdownOpen(false); // Dropdown band kar do
    
    // Yahan search page par bhej rahe hain
    router.push(`/products?search=${encodeURIComponent(keyword)}`);
  }

  function clearHistory() {
    setRecentSearches([]);
    localStorage.removeItem("infinityRecentSearches");
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-4">
      <h2 className="text-2xl font-bold text-center mb-5">
        Search Spare Parts
      </h2>

      <div className="flex flex-col md:flex-row gap-3 relative" ref={containerRef}>
        
        {/* Input & Dropdown Container */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search by Part Number, Part Name, or Machine Model..."
            className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          {/* Recent Searches Dropdown */}
          {isDropdownOpen && recentSearches.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  Recent Searches
                </span>
                <button 
                  onClick={clearHistory} 
                  className="text-[11px] font-bold text-red-500 hover:text-red-700 uppercase tracking-widest transition-colors"
                >
                  Clear All
                </button>
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {recentSearches.map((item, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      // onMouseDown use kiya taaki input ka focus hatne se pehle click register ho jaye
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSearch(item);
                        handleSearch(item);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-[14px] text-gray-700 font-medium border-b border-gray-50 last:border-0"
                    >
                      {/* Clock Icon */}
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

        <button
          onClick={() => handleSearch()}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition shrink-0"
        >
          Search
        </button>
      </div>
    </div>
  );
}
