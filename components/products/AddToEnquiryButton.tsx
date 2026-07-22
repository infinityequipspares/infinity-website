"use client";

import { useEnquiry } from "@/app/context/EnquiryContext";

export default function AddToEnquiryButton({ product }: { product: any }) {
  const { addToEnquiry } = useEnquiry();

  return (
    <button
      type="button"
      onClick={() => addToEnquiry(product)}
      className="flex flex-1 items-center justify-center rounded-lg border border-red-600 bg-transparent px-4 py-2.5 sm:py-3 text-[13px] font-bold text-red-600 transition-all hover:bg-red-600 hover:text-white focus:ring-4 focus:ring-red-600/20"
    >
      Add to Enquiry
    </button>
  );
}
