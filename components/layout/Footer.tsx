import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white py-6 mt-4">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Row 1: Logo & Description (Compact & Centered) */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link href="/" className="inline-block mb-2">
            <img
              src="/images/logo.png"
              alt="Infinity Equipments And Spares"
              className="w-[120px] h-auto object-contain"
            />
          </Link>
          <p className="text-[12px] leading-relaxed text-slate-500 font-medium max-w-[350px]">
            India's trusted supplier of genuine and aftermarket spare parts for heavy machinery and aerial platforms.
          </p>
        </div>

        {/* Row 2: Three Columns (Balanced) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-3 text-[12px] font-extrabold uppercase tracking-wider text-slate-900">Quick Links</h3>
            <ul className="flex flex-col gap-y-1.5 text-[12px] font-semibold text-slate-500">
              {["Home", "Products", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={link === "Home" ? "/" : `/${link.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-red-600 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Our Divisions */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-3 text-[12px] font-extrabold uppercase tracking-wider text-slate-900">Our Divisions</h3>
            <ul className="flex flex-col gap-y-1.5 text-[12px] font-semibold text-slate-500">
              {["Machine Rental", "Machine Sales"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-red-600 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-3 text-[12px] font-extrabold uppercase tracking-wider text-slate-900">Contact Us</h3>
            <div className="text-[12px] text-slate-500 font-medium flex flex-col gap-1 text-center md:text-left">
              <p>+91 916 786 7476</p>
              <p>+91 916 786 7176</p>
              <p>+91 916 786 7472</p>
              <p className="mt-1 break-all">
                <a href="mailto:contact@infinityequipspares.com" className="text-slate-400 hover:text-red-600 transition-colors">
                  contact@infinityequipspares.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © {new Date().getFullYear()} Infinity Equipments And Spares. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
