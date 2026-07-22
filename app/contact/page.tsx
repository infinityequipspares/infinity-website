import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Wrench } from "lucide-react";
import InquiryForm from "@/components/common/InquiryForm";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[1360px] px-4 py-8 antialiased sm:py-12 lg:px-6">
      
      {/* Hero Section */}
      <div className="mx-auto max-w-4xl text-center">
        <span className="mb-4 inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-700 ring-1 ring-inset ring-red-600/20">
          Contact Infinity Equipments And Spares
        </span>
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-[44px] lg:leading-[1.15]">
          Let's Get Your Machine <span className="text-red-600">Back To Work</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-[14px] leading-relaxed text-gray-600 sm:text-[15px]">
          Need Genuine or Premium Aftermarket Spare Parts for Boom Lifts,
          Scissor Lifts, Telehandlers, Spider Lifts, Vertical Lifts, Cranes and
          Material Handling Equipment? Our experienced team is ready to assist
          you with genuine and premium aftermarket solutions across India.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
        
        {/* === LEFT COLUMN === */}
        <div className="flex flex-col gap-6 lg:gap-8">
          
          <div className="flex flex-col rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-gray-900">
              Contact Information
            </h2>
            <div className="flex flex-grow flex-col space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col rounded-xl border border-gray-200/80 bg-gray-50/50 p-5">
                  <h3 className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-red-600">
                    <Phone className="h-4 w-4" />
                    Phone Numbers
                  </h3>
                  <div className="flex flex-col space-y-2">
                    <a href="tel:+919167867476" className="text-[14px] font-semibold text-gray-800 transition-colors hover:text-red-600">+91 916 786 7476</a>
                    <a href="tel:+919167867176" className="text-[14px] font-semibold text-gray-800 transition-colors hover:text-red-600">+91 916 786 7176</a>
                    <a href="tel:+919167867472" className="text-[14px] font-semibold text-gray-800 transition-colors hover:text-red-600">+91 916 786 7472</a>
                  </div>
                </div>

                <div className="flex flex-col rounded-xl border border-gray-200/80 bg-gray-50/50 p-5">
                  <h3 className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-red-600">
                    <MapPin className="h-4 w-4" />
                    Office Address
                  </h3>
                  <p className="text-[14px] font-medium leading-relaxed text-gray-800">
                    507, V Times Square, Palm Beach Road<br />
                    Sector-15, CBD Belapur, Navi Mumbai<br />
                    Maharashtra, India - 400614
                  </p>
                </div>
              </div>

              <div className="flex flex-col rounded-xl border border-gray-200/80 bg-gray-50/50 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-red-600">
                  <Mail className="h-4 w-4" />
                  Email Address
                </h3>
                <div className="flex flex-col space-y-2">
                  <a href="mailto:infinityequipmentsandspares@gmail.com" className="break-all text-[14px] font-semibold text-gray-800 transition-colors hover:text-red-600">infinityequipmentsandspares@gmail.com</a>
                  <a href="mailto:infinityequipspares@gmail.com" className="break-all text-[14px] font-semibold text-gray-800 transition-colors hover:text-red-600">infinityequipspares@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 pt-2">
              <a href="https://wa.me/919167867476" target="_blank" rel="noopener noreferrer" className="flex h-[44px] flex-1 min-w-[160px] items-center justify-center rounded-md bg-green-600 px-6 text-[13px] font-bold text-white shadow-sm transition-transform duration-200 hover:-translate-y-px hover:bg-green-700">
                WhatsApp Us
              </a>
              <a href="tel:+919167867476" className="flex h-[44px] flex-1 min-w-[160px] items-center justify-center rounded-md border border-gray-300 bg-white px-6 text-[13px] font-bold text-gray-900 shadow-sm transition-transform duration-200 hover:-translate-y-px hover:border-red-600 hover:text-red-600">
                Call Now
              </a>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-extrabold tracking-tight text-gray-900">
              <Clock className="h-6 w-6 text-gray-900" />
              Business Hours
            </h2>
            <div className="flex flex-grow flex-col space-y-6">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between rounded-md bg-gray-50/80 px-4 py-3 text-[14px] ring-1 ring-inset ring-gray-200/60">
                  <span className="font-bold text-gray-900">Monday – Saturday</span>
                  <span className="font-semibold text-gray-700">09:30 AM – 07:00 PM</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-red-50/80 px-4 py-3 text-[14px] ring-1 ring-inset ring-red-100">
                  <span className="font-bold text-gray-900">Sunday</span>
                  <span className="font-bold text-red-600">Closed</span>
                </div>
              </div>

              <div className="flex flex-col rounded-xl border border-gray-200/80 bg-gray-50/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-600">
                  <Wrench className="h-4 w-4" />
                  Our Services
                </h3>
                <ul className="grid gap-3 text-[13.5px] font-medium text-gray-700 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <li className="flex items-center gap-2"><span className="text-red-600">✓</span> Genuine Parts</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">✓</span> Aftermarket Parts</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">✓</span> Boom Lift Spares</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">✓</span> Scissor Lift Spares</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">✓</span> Telehandler Spares</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">✓</span> Spider Lift Spares</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">✓</span> Rental Support</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">✓</span> Sales Support</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">✓</span> Technical Support</li>
                  <li className="flex items-center gap-2"><span className="text-red-600">✓</span> PAN India Delivery</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* === RIGHT COLUMN === */}
        <div className="flex flex-col gap-6 lg:gap-8 h-full">
          
          {/* Compact Inquiry Form */}
          <InquiryForm />

          {/* Google Map */}
          <div className="flex flex-col rounded-2xl border border-gray-200/80 bg-white p-2 shadow-sm overflow-hidden h-[300px] flex-grow min-h-[250px]">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15088.354674681323!2d73.02943265541992!3d19.015822399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3c09f3e4619%3A0x7d6f58f796cf0224!2sSector%2015%2C%20CBD%20Belapur%2C%20Navi%20Mumbai%2C%20Maharashtra%20400614!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '0.85rem' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>

        </div>

      </div>

      {/* 🌟 UPGRADED: Premium Red Gradient CTA Banner 🌟 */}
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-800 p-8 shadow-lg lg:flex-row lg:px-12 lg:py-10 border border-red-500/20">
        <div className="max-w-2xl text-center lg:text-left">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Need a Quick Quotation?
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-red-100 sm:text-[15px]">
            Share your Part Number on WhatsApp and our team will help you
            identify the correct spare part and provide a quotation as quickly
            as possible.
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          <Link 
            href="https://wa.me/919167867476" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex h-[44px] min-w-[200px] items-center justify-center rounded-lg bg-white px-6 text-[13.5px] font-bold text-red-700 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-lg"
          >
            Get Quote on WhatsApp
          </Link>
          <a 
            href="tel:+919167867476" 
            className="flex h-[44px] min-w-[160px] items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/70 px-6 text-[13.5px] font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-red-700"
          >
            Call Now
          </a>
        </div>
      </div>

    </section>
  );
}
