"use client";
import { useState, useEffect } from "react";

export default function ShareButton({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: "Check out this useful guide from Infinity Equipments And Spares: ",
          url: url,
        });
      } catch (error) {
        console.log("Error sharing", error);
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col items-center">
      <h4 className="text-gray-900 font-bold mb-4 text-lg">Share this guide:</h4>
      <button 
        onClick={handleShare}
        className="flex items-center justify-center gap-2.5 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm w-fit"
      >
        {/* viewBox add karne se icon ka shape wapas normal ho jayega */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        <span>{copied ? "Link Copied!" : "Share Article"}</span>
      </button>
    </div>
  );
}
