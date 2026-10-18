import Link from "next/link";

export default function NotFound() {
  return (
    <section className="antialiased bg-white min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center">
        
        {/* Red Badge */}
        <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.25em] text-red-700 ring-1 ring-inset ring-red-600/20 mb-6">
          Error 404 - Not Found
        </span>

        {/* Big Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Oops! Page <span className="text-red-600">Not Found</span>
        </h1>

        {/* Description */}
        <p className="text-[15px] text-gray-600 leading-relaxed max-w-md mx-auto mb-8 font-medium">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold text-[14px] hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-600/25 transition-all duration-300"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-900 px-8 py-3.5 rounded-xl font-bold text-[14px] hover:bg-gray-100 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            Browse Products
          </Link>
        </div>

      </div>
    </section>
  );
}
