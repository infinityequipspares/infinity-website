import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white py-6 mt-4">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Row 1: Logo, Description & Social Media */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link href="/" className="inline-block mb-2">
            <img
              src="/images/logo.webp"
              alt="Infinity Equipments And Spares"
              className="w-[120px] h-auto object-contain"
            />
          </Link>
          <p className="text-[12px] leading-relaxed text-slate-500 font-medium max-w-[350px]">
            India's trusted supplier of genuine and aftermarket spare parts for heavy machinery and aerial platforms.
          </p>

          {/* 🌟 Social Media Icons (SVG Direct - No Error) 🌟 */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-5">
            
            {/* WhatsApp */}
            <a href="https://whatsapp.com/channel/0029VaNVcfR4Spk7xdMq3J2k" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Channel" className="text-slate-400 hover:text-green-500 transition-colors hover:-translate-y-0.5 transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
            
            {/* Facebook */}
            <a href="https://www.facebook.com/share/19za4G3tW2/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook Page" className="text-slate-400 hover:text-blue-600 transition-colors hover:-translate-y-0.5 transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/infinityequipspares?obrf=MWxmdG8yY2h6NHgwbQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-pink-600 transition-colors hover:-translate-y-0.5 transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* X (Twitter) */}
            <a href="https://x.com/iesparesindia?s=11" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-slate-400 hover:text-slate-900 transition-colors hover:-translate-y-0.5 transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/ishaq-ahemad-khan-161b00435?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-blue-700 transition-colors hover:-translate-y-0.5 transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            {/* YouTube */}
            <a href="https://youtube.com/@infinityequipspares?si=J4WV7qG47jWJ3wUD" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-slate-400 hover:text-red-600 transition-colors hover:-translate-y-0.5 transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>

          </div>
        </div>

        {/* Row 2: Three Columns (Balanced) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          
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
              <p>
                <a href="tel:+919167867476" className="hover:text-red-600 transition-colors">
                  +91 916 786 7476
                </a>
              </p>
              <p>
                <a href="tel:+919167867176" className="hover:text-red-600 transition-colors">
                  +91 916 786 7176
                </a>
              </p>
              <p>
                <a href="tel:+919167867472" className="hover:text-red-600 transition-colors">
                  +91 916 786 7472
                </a>
              </p>
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
