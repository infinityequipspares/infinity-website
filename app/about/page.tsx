import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { value: "15+", label: "Years of Experience" },
    { value: "1,000+", label: "Spare Parts Inventory" },
    { value: "20+", label: "Global Brands Covered" },
    { value: "100%", label: "Pan-India Delivery" }
  ];

  const values = [
    {
      icon: (
        <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      ),
      title: "Uncompromising Quality",
      desc: "We supply only verified Genuine, OEM, and premium aftermarket parts that meet strict international safety standards."
    },
    {
      icon: (
        <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      ),
      title: "Fast & Reliable Sourcing",
      desc: "Our robust supply chain and extensive inventory ensure quick dispatch to minimize your machine's downtime."
    },
    {
      icon: (
        <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
      ),
      title: "Expert Technical Support",
      desc: "Our dedicated technical team assists you in identifying the exact part numbers and ensuring perfect compatibility."
    }
  ];

  return (
    <section className="antialiased bg-white overflow-hidden min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="mx-auto max-w-[1360px] px-4 pt-12 pb-8 lg:px-6 text-center">
        <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.25em] text-red-700 ring-1 ring-inset ring-red-600/20 mb-5 transition-all hover:bg-red-100 cursor-default">
          About Infinity Equipments And Spares
        </span>
        
        <h1 className="text-[28px] sm:text-4xl lg:text-[54px] xl:text-[60px] font-extrabold text-gray-900 tracking-tight leading-tight lg:whitespace-nowrap mx-auto w-full">
          India’s Trusted Supplier of <span className="text-red-600">Premium Spare Parts</span>
        </h1>
        
        <p className="mt-5 text-[15px] md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed opacity-90">
          Specializing in Genuine, OEM, and Aftermarket components for Aerial Work Platforms, Boom Lifts, Scissor Lifts, and Cranes.
        </p>
      </div>

      {/* 2. Company Stats Banner */}
      <div className="border-y border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-[1360px] px-4 py-6 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-gray-200/60">
            {stats.map((stat, idx) => (
              <div key={idx} className="px-4 transition-transform duration-300 hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-red-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1360px] px-4 py-10 lg:px-6">
        
        {/* 3. Who We Are & Why Choose Us */}
        <div className="grid lg:grid-cols-12 gap-10 items-start mb-14">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Who We Are</h2>
            </div>
            <p className="text-[15px] leading-relaxed text-gray-600">
              Infinity Equipments And Spares is one of India’s most reliable suppliers of OEM and high-quality aftermarket spare parts for heavy machinery, including AWPs, Telehandlers, and Cranes.
            </p>
            <p className="text-[15px] leading-relaxed text-gray-600">
              With deep industry expertise, we understand the financial impact of equipment downtime. Our primary mission is to provide the exact right spare parts with fast sourcing, competitive corporate pricing, and reliable nationwide delivery, helping contractors and fleet owners keep their operations running smoothly.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white p-7 rounded-2xl border-t-4 border-t-red-600 border border-gray-100 shadow-sm h-full transition-shadow duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Why Partner With Us?</h2>
            <ul className="space-y-4">
              <li className="flex gap-3 text-[14px] text-gray-600 leading-relaxed">
                <span className="text-red-600 shrink-0 mt-0.5">✔</span>
                <span>Wide inventory covering international brands like JLG, Genie, Dingli, JCB, SANY, and more.</span>
              </li>
              <li className="flex gap-3 text-[14px] text-gray-600 leading-relaxed">
                <span className="text-red-600 shrink-0 mt-0.5">✔</span>
                <span>Comprehensive range including Joysticks, Controllers, Hydraulic Pumps, Filters, and Sensors.</span>
              </li>
              <li className="flex gap-3 text-[14px] text-gray-600 leading-relaxed">
                <span className="text-red-600 shrink-0 mt-0.5">✔</span>
                <span>Customer-first approach with dedicated after-sales assistance across India.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. Core Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="bg-gray-50/80 p-7 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-[0_8px_30px_rgb(220,38,38,0.12)] hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 group-hover:border-red-200">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Meet Our Leadership */}
        <div className="mb-16 relative">
          <div className="text-center mb-10 relative z-10">
            <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full mb-3 ring-1 ring-red-100">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Meet Our Founders</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
            
            {/* Ishaq Ahemad Khan - Founder Card */}
            <div className="group relative bg-white rounded-3xl p-1 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(220,38,38,0.12)]">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-3xl opacity-100 group-hover:from-red-200 group-hover:via-red-100 group-hover:to-red-200 transition-colors duration-500"></div>
              
              <div className="relative h-full bg-white rounded-[22px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* 🌟 Rounded Square (Square with rounded corners) Shape 🌟 */}
                <div className="w-28 h-28 sm:w-32 sm:h-36 shrink-0 rounded-2xl overflow-hidden bg-gray-50 border-[2px] border-gray-100 shadow-md flex items-center justify-center relative z-10 transform group-hover:scale-105 transition-all duration-500 ring-1 ring-gray-200">
                  <img 
                    src="/images/founders/ishaq.jpg" 
                    alt="Ishaq Ahemad Khan" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="text-center sm:text-left relative z-10 flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-black text-gray-900 mb-1 tracking-tight">Ishaq Ahemad Khan</h3>
                  <div className="inline-block border-b-2 border-red-600 pb-1 mb-3 self-center sm:self-start">
                    <p className="text-red-600 font-bold text-[12px] tracking-[0.2em] uppercase">Founder</p>
                  </div>
                  <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                    With a deep understanding of the heavy machinery sector, Ishaq Ahemad drives the strategic vision of the company. His strict commitment to part quality, brand trust, and unbiased B2B solutions forms the core foundation of Infinity Equipments And Spares.
                  </p>
                </div>
              </div>
            </div>

            {/* Ankit Raj - Co-Founder Card */}
            <div className="group relative bg-white rounded-3xl p-1 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(220,38,38,0.12)]">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-3xl opacity-100 group-hover:from-red-200 group-hover:via-red-100 group-hover:to-red-200 transition-colors duration-500"></div>
              
              <div className="relative h-full bg-white rounded-[22px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* 🌟 Rounded Square (Square with rounded corners) Shape 🌟 */}
                <div className="w-28 h-28 sm:w-32 sm:h-36 shrink-0 rounded-2xl overflow-hidden bg-gray-50 border-[2px] border-gray-100 shadow-md flex items-center justify-center relative z-10 transform group-hover:scale-105 transition-all duration-500 ring-1 ring-gray-200">
                  <img 
                    src="/images/founders/ankit.jpg" 
                    alt="Ankit Raj" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="text-center sm:text-left relative z-10 flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-black text-gray-900 mb-1 tracking-tight">Ankit Raj</h3>
                  <div className="inline-block border-b-2 border-red-600 pb-1 mb-3 self-center sm:self-start">
                     <p className="text-red-600 font-bold text-[12px] tracking-[0.2em] uppercase">Co-Founder</p>
                  </div>
                  <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
                    Ankit Raj spearheads nationwide operations and client relations, ensuring that every contractor and equipment owner receives the exact part on time. His expertise in supply chain and fast sourcing keeps client machinery running seamlessly.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* 6. Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(220,38,38,0.12)] transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-200 group-hover:bg-red-600 transition-colors duration-300"></div>
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-700 mb-5 group-hover:text-red-600 transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-[14px] text-gray-600 leading-relaxed">To become India’s most trusted and preferred supplier of heavy equipment spare parts by delivering uncompromised quality products, technical expertise, and exceptional corporate customer service.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(220,38,38,0.12)] transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-200 group-hover:bg-red-600 transition-colors duration-300"></div>
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-700 mb-5 group-hover:text-red-600 transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-[14px] text-gray-600 leading-relaxed">To strictly minimize machine downtime by providing genuine, OEM, and premium aftermarket spare parts with fast sourcing, reliable delivery networks, and long-term technical support across India.</p>
          </div>
        </div>

        {/* 7. Final CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-sm transition-shadow duration-500 hover:shadow-[0_8px_30px_rgb(220,38,38,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-white opacity-80"></div>
          <div className="relative px-8 py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Ready to keep your machines running?</h2>
              <p className="text-gray-600 text-[15px] max-w-xl">Get expert technical support, correct part identification, and fast delivery on all your spare parts requirements today.</p>
            </div>
            <div className="shrink-0">
              <Link 
                href="https://wa.me/919167867476" 
                className="inline-flex items-center justify-center bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold text-[14.5px] hover:bg-red-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-600/30 transition-all duration-300 group"
              >
                Contact Sales Team
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
