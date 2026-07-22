export default function WhyChooseUs() {
  const features = [
    {
      title: "5000+ Spare Parts",
      desc: "Large inventory of OEM & aftermarket parts.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ),
    },
    {
      title: "PAN India Supply",
      desc: "Fast dispatch across India.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V12m0 0h4.5m-4.5 0H9" />
        </svg>
      ),
    },
    {
      title: "Technical Support",
      desc: "Expert assistance for part identification.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.439-4.139-7.035-7.036l1.292-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      title: "Quality Assured",
      desc: "Reliable genuine & aftermarket products.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-slate-50 z-0 overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100/50 via-slate-50/10 to-transparent -z-10 pointer-events-none rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-md border border-red-200/60 bg-red-50/80 backdrop-blur-sm shadow-sm">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-red-700">
              Why Choose Us
            </span>
          </div>

          <h2 className="mt-5 text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold text-slate-900 leading-[1.25] tracking-tight">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              Infinity Equipments And Spares?
            </span>
          </h2>

          {/* Updated Punchy Copywriting Here */}
          <p className="mt-5 text-lg md:text-xl font-medium text-slate-700 max-w-3xl mx-auto">
            Empowering your fleet operations with reliable OEM parts, expert technical guidance, and seamless PAN India delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-7 md:p-8 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-1.5 w-full bg-slate-200 transition-colors duration-300 group-hover:bg-red-600"></div>

              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 transition-transform duration-500 ease-out group-hover:scale-110">
                {item.icon}
              </div>

              <h3 className="font-extrabold text-lg md:text-xl text-slate-900 mb-2.5">
                {item.title}
              </h3>

              <p className="text-base leading-relaxed text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
