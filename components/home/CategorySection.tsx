import Link from "next/link";
import Image from "next/image";
import categories from "@/data/categories.json";

export default function CategorySection() {
  return (
    <section id="categories" className="relative bg-slate-50 pb-10 pt-4 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Premium Header with reduced spacing */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center justify-center text-center md:mb-12">
          <div className="inline-flex items-center rounded-md border border-red-200/60 bg-red-50/80 px-3 py-1 shadow-sm backdrop-blur-sm md:px-4 md:py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-700 md:text-xs">
              Categories
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-4xl md:mt-5 md:text-[2.5rem]">
            Browse By Category
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-slate-600 md:text-lg">
            Navigate our comprehensive catalog of high-performance parts engineered for maximum equipment uptime.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-5 xl:grid-cols-6">
          {categories
            .sort(
              (a: any, b: any) =>
                Number(a["Display Order"]) - Number(b["Display Order"])
            )
            .map((category: any, index: number) => (
              <Link
                key={`${category["Category Slug"]}-${index}`}
                href={`/products/category/${category["Category Slug"]}`}
                className="group flex w-full cursor-pointer flex-col items-center justify-start"
              >
                
                {/* 1. Square Image Box */}
                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:border-red-500 group-hover:shadow-md sm:p-4">
                  
                  {/* Subtle Top Accent Line on Hover */}
                  <div className="absolute left-0 top-0 z-10 h-1 w-full bg-slate-100 transition-colors duration-300 group-hover:bg-red-600"></div>

                  {/* Image Container */}
                  <div className="relative flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
                    <Image
                      src={`/images/categories/${category["Category Image"]}`}
                      alt={category["Category Name"]}
                      width={200}
                      height={200}
                      className="h-full w-full object-contain"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* 2. PREMIUM TEXT DESIGN */}
                <div className="mt-2 flex w-full items-center justify-center px-1">
                  <div className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3.5 py-1.5 shadow-sm transition-all duration-300 ease-in-out group-hover:border-red-600 group-hover:bg-red-600 group-hover:shadow-md">
                    <h3 className="whitespace-nowrap text-center text-[12px] font-bold text-slate-700 transition-colors duration-300 group-hover:text-white sm:text-[13px]">
                      {category["Category Name"]}
                    </h3>
                  </div>
                </div>

              </Link>
            ))}
        </div>

      </div>
    </section>
  );
}
