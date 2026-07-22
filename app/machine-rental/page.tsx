"use client";

import Link from "next/link";

export default function MachineRentalPage() {
  return (
    <section className="mx-auto max-w-[1360px] px-4 py-6 md:py-8 lg:px-6">
      
      {/* Label & Header */}
      <div className="text-center mb-6 md:mb-8">
        <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-red-700 ring-1 ring-inset ring-red-600/20 mb-3">
          MACHINE RENTAL SERVICES
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Aerial Work Platform <span className="text-red-600">Rental</span>
        </h1>
        <p className="mt-3 text-[14px] text-gray-600 max-w-2xl mx-auto">
          We provide Boom Lift, Scissor Lift, Spider Lift and other Aerial Work Platform rental solutions across India for industrial, construction and maintenance projects.
        </p>
      </div>

      {/* Coming Soon Section */}
      <div className="mx-auto max-w-4xl bg-white border border-gray-100 rounded-2xl p-6 md:p-10 text-center shadow-sm mb-6 md:mb-8">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Machine Rental Services Coming Soon
        </h2>
        <p className="text-[15px] text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Infinity Equipments And Spares will soon provide Boom Lift, Scissor Lift, Spider Lift and other Aerial Work Platform rental services across India. Our rental fleet is currently under preparation. Contact us if you have any upcoming rental requirements.
        </p>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 rounded-2xl p-6 md:p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Ready to Rent a Machine?</h2>
        <p className="text-red-100 text-[14px] mb-5 max-w-lg mx-auto">
          Connect with our rental experts on WhatsApp to check machine availability, technical specifications, and rental pricing across India.
        </p>
        <Link href="https://wa.me/919167867476" className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold text-[13px] hover:bg-gray-100 transition inline-block">
          Enquire on WhatsApp
        </Link>
      </div>
    </section>
  );
}
