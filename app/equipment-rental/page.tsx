import { Metadata } from "next";
import Link from "next/link";

// Yeh raha SEO Canonical Tag jo Google ka confusion door karega
export const metadata: Metadata = {
  title: "Machine Rental Services | Infinity Equipments And Spares",
  description: "Aerial Work Platform rental solutions across India. Boom Lift, Scissor Lift, and Spider Lift rentals.",
  alternates: {
    canonical: "https://www.infinityequipspares.com/equipment-rental",
  },
};

export default function MachineRentalPage() {
  return (
    <section className="antialiased bg-white overflow-hidden min-h-screen">
      
      {/* 1. Consistent Hero Section */}
      <div className="mx-auto max-w-[1360px] px-4 pt-12 pb-10 lg:px-6 text-center">
        <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.25em] text-red-700 ring-1 ring-inset ring-red-600/20 mb-5 transition-all hover:bg-red-100 cursor-default">
          MACHINE RENTAL SERVICES
        </span>
        
        <h1 className="text-[28px] sm:text-4xl lg:text-[54px] xl:text-[60px] font-extrabold text-gray-900 tracking-tight leading-tight lg:whitespace-nowrap mx-auto w-full">
          Aerial Work Platform <span className="text-red-600">Rental</span>
        </h1>
        
        <p className="mt-5 text-[15px] md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed opacity-90">
          We provide Boom Lift, Scissor Lift, Spider Lift and other Aerial Work Platform rental solutions across India for industrial, construction and maintenance projects.
        </p>
      </div>

      <div className="mx-auto max-w-[1360px] px-4 pb-16 lg:px-6">
        
        {/* 2. Coming Soon Section (Premium Upgrade) */}
        <div className="mx-auto max-w-4xl bg-white border border-gray-100 rounded-3xl p-10 md:p-14 text-center shadow-sm mb-12 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(220,38,38,0.12)] hover:-translate-y-1 relative overflow-hidden group">
          {/* Subtle Top Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-200 group-hover:bg-red-600 transition-colors duration-300"></div>
          
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-600 group-hover:scale-110 transition-transform duration-500 border border-red-100">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Machine Rental Services Coming Soon
          </h2>
          
          <p className="text-[15px] md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Infinity Equipments And Spares will soon provide Boom Lift, Scissor Lift, Spider Lift and other Aerial Work Platform rental services across India. Our rental fleet is currently under preparation. Contact us if you have any upcoming rental requirements.
          </p>
        </div>

        {/* 3. Premium Red Gradient CTA Banner (Synced with other pages) */}
        <div className="mx-auto max-w-4xl relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-sm transition-shadow duration-500 hover:shadow-[0_8px_30px_rgb(220,38,38,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-white opacity-80"></div>
          <div className="relative px-8 py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Ready to Rent a Machine?</h2>
              <p className="text-gray-600 text-[15px] max-w-md leading-relaxed">
                Connect with our rental experts on WhatsApp to check machine availability, technical specifications, and rental pricing across India.
              </p>
            </div>
            <div className="shrink-0 mt-2 md:mt-0">
              <Link 
                href="https://wa.me/919167867476" 
                className="inline-flex items-center justify-center bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold text-[14.5px] hover:bg-red-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-600/30 transition-all duration-300 group"
              >
                Enquire on WhatsApp
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
