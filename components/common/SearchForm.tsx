"use client";

import {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import products from "@/data/products.json";

interface Product {
  partNumber?: string;
  alternatePartNumbers?: string;
  alternatePartNumbers1?: string;
  alternatePartNumbers2?: string;
  alternatePartNumbers3?: string;
  name?: string;
  brand?: string;
  category?: string;
  machines?: string;
  seoKeywords?: string;
  image?: string;
  slug?: string;
  id?: string | number;
}

const escapeRegExp = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalize = (str: string) =>
  String(str || "").toLowerCase().replace(/[^a-z0-9]/g, "");

export default function SearchForm({ onComplete }: { onComplete?: () => void }) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  // 🌟 NEW: Recent Searches State
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // 🌟 NEW: Load recent searches from memory on load
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

  // 🌟 NEW: Save search to memory
  const saveSearchToMemory = (keyword: string) => {
    const kwd = keyword.trim();
    if (!kwd) return;
    let updatedSearches = [kwd, ...recentSearches.filter((item) => item !== kwd)];
    updatedSearches = updatedSearches.slice(0, 5); // Keep only last 5
    setRecentSearches(updatedSearches);
    localStorage.setItem("infinityRecentSearches", JSON.stringify(updatedSearches));
  };

  const clearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem("infinityRecentSearches");
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const suggestions = useMemo(() => {
    const keyword = debouncedSearch.trim();
    if (!keyword) return [];
    const normKwd = normalize(keyword);

    return [...(products as Product[])]
      .filter((item) => {
        const searchable = normalize(`
          ${item.partNumber || ""}
          ${item.alternatePartNumbers || ""}
          ${item.alternatePartNumbers1 || ""}
          ${item.alternatePartNumbers2 || ""}
          ${item.alternatePartNumbers3 || ""}
          ${item.name || ""}
          ${item.brand || ""}
          ${item.category || ""}
          ${item.machines || ""}
          ${item.seoKeywords || ""}
        `);
        return searchable.includes(normKwd);
      })
      .sort((a, b) => {
        const pnA = normalize(a.partNumber || "");
        const pnB = normalize(b.partNumber || "");
        const getPriority = (pn: string, item: Product) => {
          if (pn === normKwd) return 1;
          if (pn.startsWith(normKwd)) return 2;
          if (pn.includes(normKwd)) return 3;
          if (
            normalize(item.alternatePartNumbers || "").includes(normKwd) ||
            normalize(item.alternatePartNumbers1 || "").includes(normKwd) ||
            normalize(item.alternatePartNumbers2 || "").includes(normKwd) ||
            normalize(item.alternatePartNumbers3 || "").includes(normKwd)
          ) return 4;
          if (normalize(item.name || "").includes(normKwd)) return 5;
          if (normalize(item.brand || "").includes(normKwd)) return 6;
          if (normalize(item.category || "").includes(normKwd)) return 7;
          if (normalize(item.machines || "").includes(normKwd)) return 8;
          if (normalize(item.seoKeywords || "").includes(normKwd)) return 9;
          return 10;
        };
        const pA = getPriority(pnA, a);
        const pB = getPriority(pnB, b);
        if (pA !== pB) return pA - pB;
        return String(a.partNumber).localeCompare(String(b.partNumber));
      })
      .slice(0, 8);
  }, [debouncedSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeIndex >= 0 && resultsRef.current[activeIndex]) {
      resultsRef.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  const openProduct = useCallback(
    (product: Product) => {
      router.push(`/products/${product.slug || product.partNumber}`);
      setSearch("");
      setIsOpen(false);
      setActiveIndex(-1);
      setImageErrors({});
      if (onComplete) onComplete();
    },
    [router, onComplete]
  );

  const handleSearch = () => {
    if (!search.trim()) return;
    
    saveSearchToMemory(search); // 🌟 NEW: Save on search

    if (activeIndex >= 0 && activeIndex < suggestions.length) {
      openProduct(suggestions[activeIndex]);
    } else if (suggestions.length > 0) {
      openProduct(suggestions[0]);
    } else {
      router.push(`/products?search=${encodeURIComponent(search)}`);
      setIsOpen(false);
      if (onComplete) onComplete();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen || (suggestions.length === 0 && !search.trim())) {
      if (e.key === "Enter") handleSearch();
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        handleSearch();
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  const getImageUrl = (product: Product) => {
    const img = product.image;
    const key = `${product.partNumber}-${img}`;
    if (imageErrors[key] || !img) return "/images/products/no-image.jpg";
    if (img.startsWith("/") || img.startsWith("http")) return img;
    return `/images/products/${img}`;
  };

  const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
    if (!highlight.trim()) return <>{text}</>;
    const escaped = escapeRegExp(highlight);
    const parts = text.split(new RegExp(`(${escaped})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={`hl-${i}`} className="bg-red-50 font-bold text-red-600">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const showDropdown = isOpen && (search.trim() || recentSearches.length > 0);

  return (
    <div className="relative z-50 w-full" ref={wrapperRef}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by part number, part name or machine model..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button
          onClick={handleSearch}
          className="h-11 rounded-lg bg-red-600 px-5 font-semibold text-white hover:bg-red-700"
        >
          Search
        </button>
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
          
          {search.trim() ? (
            /* ================= LIVE SUGGESTIONS ================= */
            suggestions.length > 0 ? (
              <>
                {suggestions.map((product, index) => {
                  const allParts = [
                    product.partNumber,
                    product.alternatePartNumbers,
                    product.alternatePartNumbers1,
                    product.alternatePartNumbers2,
                    product.alternatePartNumbers3,
                  ].filter(Boolean);
                  const splitParts = allParts.flatMap((p) =>
                    String(p).split(/[;,|/]/).map((s) => s.trim()).filter(Boolean)
                  );
                  const displayPartNumbers = [...new Set(splitParts)].join(" / ");

                  return (
                    <button
                      key={`search-${product.id || product.partNumber || index}`}
                      ref={(el) => { resultsRef.current[index] = el; }}
                      onClick={() => {
                        saveSearchToMemory(search); // 🌟 Save on click
                        openProduct(product);
                      }}
                      className={`flex w-full items-center gap-4 border-b border-gray-100 p-3 text-left ${
                        index === activeIndex ? "bg-red-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <Image
                        src={getImageUrl(product)}
                        alt={product.name || ""}
                        width={60}
                        height={60}
                        className="h-14 w-14 rounded border bg-white object-contain"
                        unoptimized
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">
                          <HighlightedText text={product.name || ""} highlight={debouncedSearch} />
                        </p>
                        <p className="text-xs font-semibold text-red-600">
                          <HighlightedText text={displayPartNumbers} highlight={debouncedSearch} />
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.brand} • {product.category}
                        </p>
                      </div>
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    saveSearchToMemory(search); // 🌟 Save on click
                    router.push(`/products?search=${encodeURIComponent(search)}`);
                    setIsOpen(false);
                    if (onComplete) onComplete();
                  }}
                  className="w-full bg-gray-50 py-3 text-sm font-semibold text-red-600 hover:bg-gray-100"
                >
                  View all results for "{search}"
                </button>
              </>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                No products found
              </div>
            )
          ) : (
            /* ================= RECENT SEARCHES ================= */
            recentSearches.length > 0 && (
              <div>
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
                        onClick={() => {
                          setSearch(item);
                          saveSearchToMemory(item);
                          router.push(`/products?search=${encodeURIComponent(item)}`);
                          setIsOpen(false);
                          if (onComplete) onComplete();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-[14px] text-gray-700 font-medium border-b border-gray-50 last:border-0"
                      >
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="truncate">{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
