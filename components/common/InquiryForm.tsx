"use client";

import { useState } from "react";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    brand: "",
    partDetails: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Infinity Equipments And Spares,%0A%0A*New Part Inquiry:*%0A- *Name:* ${formData.name}%0A- *Phone:* ${formData.phone}%0A- *Email:* ${formData.email || "N/A"}%0A- *Machine Brand/Model:* ${formData.brand || "N/A"}%0A- *Required Part Details:* ${formData.partDetails}`;
    const whatsappUrl = `https://wa.me/919167867476?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    // 🌟 FIX: Padding (p-8 to p-6) aur height ko compact kar diya
    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-200/80 w-full">
      <div className="mb-5">
        <h2 className="text-xl font-extrabold text-gray-900">
          Can't Find Your Part?
        </h2>
        <p className="text-gray-600 text-[13px] mt-1.5 leading-relaxed">
          Send us your machine details, and we will get back to you with a quotation immediately.
        </p>
      </div>

      {/* 🌟 FIX: space-y-4 ko space-y-3 kar diya gap kam karne ke liye */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase tracking-wider">
            Your Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rahul Sharma"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-[13px] transition-all bg-gray-50 focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase tracking-wider">
              Phone / WhatsApp <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-[13px] transition-all bg-gray-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-[13px] transition-all bg-gray-50 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase tracking-wider">
            Machine Brand / Model
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="e.g. Genie Z-45, JLG 450AJ, etc."
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-[13px] transition-all bg-gray-50 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-700 mb-1 uppercase tracking-wider">
            Required Part Description / Part Number <span className="text-red-600">*</span>
          </label>
          <textarea
            name="partDetails"
            required
            rows={2}
            value={formData.partDetails}
            onChange={handleChange}
            placeholder="Enter part numbers (e.g. Joystick, Control Box)..."
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none text-[13px] transition-all resize-none bg-gray-50 focus:bg-white"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-6 mt-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-[14px]"
        >
          <span>Get Quote on WhatsApp</span>
        </button>
      </form>
    </div>
  );
}
