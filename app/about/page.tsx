import Link from "next/link";

export default function AboutPage() {
  const highlights = [
    "15+ Years of Industry Experience",
    "5,000+ Spare Parts Available",
    "OEM & Premium Aftermarket Parts",
    "PAN India Delivery",
    "Fast Sourcing & Quick Dispatch",
    "Expert Technical Support",
    "Trusted by Equipment Owners",
    "Reliable Quality at Competitive Prices"
  ];

  return (
    <section className="mx-auto max-w-[1360px] px-4 py-12 lg:px-6 antialiased">
      
      {/* 1. Consistent Header Label */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-red-700 ring-1 ring-inset ring-red-600/20 mb-4">
          ABOUT INFINITY EQUIPMENTS AND SPARES
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          India’s Trusted Supplier of <span className="text-red-600">Premium Spare Parts</span>
        </h1>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Who We Are</h2>
          <p className="text-[14px] leading-relaxed text-gray-600">
            Infinity Equipments And Spares is one of India’s trusted suppliers of OEM and high-quality aftermarket spare parts for Aerial Work Platforms (AWP), Boom Lifts, Scissor Lifts, Cranes, Telehandlers, and other heavy equipment.
          </p>
          <p className="text-[14px] leading-relaxed text-gray-600">
            With 15+ years of industry experience, we understand the challenges of equipment maintenance and downtime. Our mission is to provide the right spare parts with fast sourcing, competitive pricing, and reliable nationwide delivery, helping our customers keep their machines running efficiently.
          </p>
          
          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px] font-bold text-gray-800">
                <span className="text-red-600">✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Block */}
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 h-full">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
          <ul className="space-y-4 text-[13px] text-gray-600">
            <li>• Wide inventory covering major international brands like JLG, Genie, Haulotte, JCB, Zoomlion, SANY, and more.</li>
            <li>• Comprehensive range: Electrical, hydraulic, engine components, sensors, filters, joysticks, and assemblies.</li>
            <li>• Dedicated support for identifying correct part numbers, minimizing your machine downtime.</li>
            <li>• Customer-first approach with reliable after-sales assistance across India.</li>
          </ul>
        </div>
      </div>

      {/* 3. Mission & Vision Row */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-red-600 mb-2">Our Vision</h3>
          <p className="text-[13px] text-gray-600 leading-relaxed">To become India’s most trusted and preferred supplier of heavy equipment spare parts by delivering quality products, technical expertise, and exceptional customer service.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-red-600 mb-2">Our Mission</h3>
          <p className="text-[13px] text-gray-600 leading-relaxed">To minimize machine downtime by providing genuine and premium aftermarket spare parts with fast sourcing, reliable delivery, and long-term customer support across India.</p>
        </div>
      </div>

      {/* 4. Final CTA */}
      <div className="bg-red-600 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to keep your machines running?</h2>
        <p className="text-red-100 text-[14px] mb-6 max-w-lg mx-auto">Get expert technical support and fast delivery on genuine spare parts today.</p>
        <Link href="https://wa.me/919167867476" className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold text-[13px] hover:bg-gray-100 transition inline-block">
          Contact Sales Team on WhatsApp
        </Link>
      </div>

    </section>
  );
}
