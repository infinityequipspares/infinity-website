"use client";

import { useState } from "react";
// 🌟 Correct import path pointing to app/context/EnquiryContext
import { useEnquiry, EnquiryItem } from "@/app/context/EnquiryContext";

export default function EnquiryDrawer() {
  const { items, removeFromEnquiry, clearEnquiry, isDrawerOpen, setIsDrawerOpen } = useEnquiry();
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");

  if (items.length === 0 && !isDrawerOpen) return null;

  const handleSendWhatsApp = () => {
    let message = `Hello Infinity Equipments And Spares,%0A%0AI want a quotation for the following parts in my Enquiry List:%0A%0A`;
    
    items.forEach((item: EnquiryItem, index: number) => {
      message += `${index + 1}. *Part Name:* ${item.name}%0A   *Part No:* \`${item.partNumber}\`%0A   *Qty:* ${item.quantity}%0A%0A`;
    });

    if (clientName) message += `*Client Name:* ${clientName}%0A`;
    if (companyName) message += `*Company:* ${companyName}%0A`;
    
    message += `%0APlease check availability and share the best commercial quote.`;

    const url = `https://wa.me/919167867476?text=${message}`;
    window.open(url, "_blank");
  };

  const totalQuantity = items.reduce((sum: number, i: EnquiryItem) => sum + i.quantity, 0);

  return (
    <>
      {/* Floating Bottom Bar */}
      {items.length > 0 && !isDrawerOpen && (
        <div className="fixed bottom-4 right-4 z-[998] bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-4 border border-red-500/30">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {totalQuantity}
            </span>
            <span className="text-sm font-bold">Parts in Enquiry List</span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
          >
            View List & RFQ
          </button>
        </div>
      )}

      {/* Slide-over Drawer / Modal */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-end transition-all">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div>
                  <h2 className="text-lg font-black text-gray-900">Your Enquiry Basket</h2>
                  <p className="text-xs text-gray-500">Review selected parts before sending RFQ</p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-2xl font-bold text-gray-400 hover:text-red-600"
                >
                  &times;
                </button>
              </div>

              {/* Items List */}
              {items.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-sm font-semibold">Your enquiry list is empty.</p>
                  <p className="text-xs mt-1">Browse products and click &quot;Add to Enquiry&quot;.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                  {items.map((item: EnquiryItem) => (
                    <div key={item.partNumber} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                        <p className="text-[11px] font-mono text-red-600 font-bold">Part No: {item.partNumber}</p>
                        <p className="text-[10px] text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <button
                        onClick={() => removeFromEnquiry(item.partNumber)}
                        className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Client Details Form */}
              {items.length > 0 && (
                <div className="mt-6 space-y-3 border-t pt-4">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Your Details (Optional)</h3>
                  <input
                    type="text"
                    placeholder="Your Name / Person Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:border-red-600"
                  />
                  <input
                    type="text"
                    placeholder="Company Name / Firm Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full text-sm px-3 py-2 border rounded-lg focus:outline-none focus:border-red-600"
                  />
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {items.length > 0 && (
              <div className="border-t pt-4 space-y-2">
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Send RFQ on WhatsApp</span>
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={clearEnquiry}
                    className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2 rounded-lg transition-colors"
                  >
                    Clear List
                  </button>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-1/2 bg-gray-900 hover:bg-black text-white text-xs font-bold py-2 rounded-lg transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
