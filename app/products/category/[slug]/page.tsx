import { Suspense } from "react";
import categories from "@/data/categories.json";
import products from "@/data/products.json";
import { notFound } from "next/navigation";
import CategoryClientWrapper from "./category-client";

// Skeleton Loading
function CategorySkeletonFallback() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 md:py-10 animate-pulse">
      <div className="mb-4 h-4 w-48 rounded bg-slate-200 md:mb-8"></div>
      <div className="mb-8 flex flex-col items-center text-center md:mb-14">
        <div className="mb-2 h-4 w-24 rounded bg-slate-200"></div>
        <div className="mb-2 h-10 w-64 rounded bg-slate-200 md:mb-4 md:h-14 md:w-96"></div>
        <div className="mb-4 h-4 w-3/4 max-w-2xl rounded bg-slate-200"></div>
        <div className="mt-3 flex w-full max-w-2xl flex-col items-center justify-center gap-3 md:mt-5 md:flex-row">
          <div className="h-10 w-32 rounded-lg bg-slate-200"></div>
          <div className="h-10 w-full rounded-lg bg-slate-200 md:w-64"></div>
        </div>
      </div>
      {/* YAHAN BHI xl:grid-cols-6 KIYA HAI */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="flex h-[320px] w-full flex-col justify-between rounded-xl border border-slate-200 bg-[#fbfbfb] p-3 shadow-sm sm:h-[360px] sm:p-4"
          >
            <div className="mb-4 h-32 w-full rounded-lg bg-slate-200 sm:h-40 md:h-48"></div>
            <div className="mb-2 h-4 w-3/4 rounded bg-slate-200"></div>
            <div className="mb-4 h-3 w-1/2 rounded bg-slate-200"></div>
            <div className="mt-auto h-8 w-full rounded-md bg-slate-200"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Main Page (Server Component)
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = categories.find(
    (item: any) => item["Category Slug"] === slug
  );

  if (!category) {
    notFound();
  }

  const initialFilteredProducts = products.filter(
    (item: any) =>
      String(item.category || "").toLowerCase() ===
      String(category["Category Name"]).toLowerCase()
  );

  return (
    <Suspense fallback={<CategorySkeletonFallback />}>
      <CategoryClientWrapper
        category={category}
        initialProducts={initialFilteredProducts}
      />
    </Suspense>
  );
}
