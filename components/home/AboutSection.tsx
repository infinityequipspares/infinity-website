import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-6 lg:py-12 bg-gradient-to-b from-white via-slate-50/80 to-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Centered Header Section */}
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto mb-5 lg:mb-8">
          <div className="inline-flex items-center px-2.5 py-1 md:px-4 md:py-1 rounded-md border border-red-200/60 bg-red-50/80 backdrop-blur-sm">
            <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] text-red-700">
              ABOUT INFINITY
            </span>
          </div>

          <h2
            id="about-heading"
            className="mt-3 md:mt-4 text-[1.35rem] sm:text-3xl md:text-4xl lg:text-[2.25rem] xl:text-[2.5rem] font-extrabold text-slate-900 leading-[1.15] md:leading-[1.1] tracking-tight w-full"
          >
            India's Trusted Supplier of OEM & Aftermarket
            <span className="block mt-1 md:mt-2 text-red-600">
              Aerial Work Platforms And Crane Parts
            </span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-5 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="flex flex-col">
            <div className="space-y-2 md:space-y-3 text-xs sm:text-sm lg:text-base leading-snug text-slate-600 max-w-2xl">
              <p>
                Infinity Equipments And Spares supplies Genuine OEM and Premium
                Aftermarket spare parts for Boom Lifts, Scissor Lifts,
                Telehandlers, Vertical Lifts, Spider Lifts, Cranes, and Material
                Handling Equipment across India. Our reliable solutions help
                maximize equipment uptime and keep your machines operating at
                peak performance.
              </p>
              <p>
                We proudly serve rental companies, fleet owners, maintenance
                contractors, and industrial customers with reliable sourcing,
                fast nationwide delivery, and expert technical support for every
                spare parts requirement.
              </p>
            </div>

            {/* Features List */}
            <ul
              role="list"
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-x-4 md:gap-y-3"
            >
              {[
                "15+ Years Industry Experience",
                "Genuine OEM & Premium Aftermarket",
                "Nationwide PAN India Supply",
                "Expert Technical Support",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-1.5 md:gap-2">
                  <svg
                    className="h-3.5 w-3.5 md:h-5 md:w-5 shrink-0 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-800 leading-tight pt-0.5">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Stats Grid - Compacted for Mobile */}
            <dl className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {[
                { value: "15+", label: "Years Experience" },
                { value: "5000+", label: "Spare Parts" },
                { value: "PAN", label: "India Supply" },
                { value: "24/7", label: "Technical Support" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center justify-center rounded-lg md:rounded-xl border border-slate-200 bg-white py-2 px-1 md:py-3 md:px-2 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
                >
                  <dt className="order-2 mt-0.5 md:mt-1 text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-slate-500 text-center leading-tight">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-red-600">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Actions - Side-by-side on Mobile */}
            <div className="mt-5 grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3">
              <Link
                href="/about"
                className="flex items-center justify-center rounded-lg md:rounded-xl bg-gradient-to-b from-red-600 to-red-700 px-2 py-2.5 sm:px-5 sm:py-2.5 text-[11px] sm:text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 active:scale-[0.98] text-center"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center rounded-lg md:rounded-xl border-2 border-slate-200 bg-transparent px-2 py-2.5 sm:px-5 sm:py-2.5 text-[11px] sm:text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 active:scale-[0.98] text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="group relative w-full h-[220px] sm:h-[350px] lg:h-[400px] xl:h-[440px] mt-6 lg:mt-0">
            <div className="relative h-full w-full overflow-hidden rounded-xl md:rounded-3xl border border-slate-200 bg-slate-100 shadow-xl transition-all duration-700 group-hover:shadow-red-900/10">
              <Image
                src="/images/about/warehouse.png"
                alt="Infinity Equipments And Spares modern warehouse facility demonstrating extensive inventory of industrial aerial equipment parts"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              
              {/* Overlay Gradient for depth */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/5 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Trust Badge */}
              <div className="absolute bottom-2 left-2 right-2 sm:right-auto sm:bottom-4 sm:left-4 z-10 flex items-center gap-2 md:gap-3 rounded-lg md:rounded-xl border border-white/40 bg-white/95 p-2 sm:p-3 shadow-xl backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex h-6 w-6 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 border border-red-100">
                  <svg
                    className="h-3 w-3 md:h-5 md:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[7px] md:text-[9px] font-bold uppercase tracking-[0.15em] text-red-600">
                    Trusted Across India
                  </p>
                  <p className="mt-0.5 text-[9px] md:text-xs font-bold text-slate-900 leading-tight">
                    Genuine OEM & Premium <br className="hidden sm:block" />
                    Aftermarket Parts
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
