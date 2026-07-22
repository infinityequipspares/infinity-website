"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({ productName }: { productName: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Infinity Equipments And Spares",
      text: `Check out this spare part: ${productName}`,
      url: window.location.href,
    };

    // Agar mobile browser hai toh native share sheet khulegi
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Agar desktop browser hai toh link copy ho jayega
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2 second baad wapas normal icon
    }
  };

  return (
    <button
      onClick={handleShare}
      type="button"
      title="Share Product"
      className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:border-gray-400 hover:bg-gray-50 hover:text-red-600 focus:ring-4 focus:ring-gray-200"
    >
      {copied ? (
        <Check className="h-5 w-5 text-green-600" />
      ) : (
        <Share2 className="h-5 w-5" />
      )}
    </button>
  );
}
