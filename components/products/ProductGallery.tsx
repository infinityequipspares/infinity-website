"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const imageList =
    images && images.length > 0
      ? images.map((img) => {
          if (!img) return "/images/products/no-image.jpg";

          if (img.startsWith("/images/")) return img;

          return `/images/products/${img}`;
        })
      : ["/images/products/no-image.jpg"];

  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  
  // State for the Amazon-style hover zoom
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setSelectedImage(imageList[0]);
  }, [images]);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    // Only apply on desktop (Tailwind lg breakpoint is 1024px)
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    // Use nativeEvent.offsetX/Y to get coordinates strictly within the unscaled image bounds
    const target = e.currentTarget;
    const x = (e.nativeEvent.offsetX / target.offsetWidth) * 100;
    const y = (e.nativeEvent.offsetY / target.offsetHeight) * 100;

    setMousePos({ x, y });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1 lg:w-[72px] lg:flex-col lg:overflow-visible">
        {imageList.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-all duration-300 ${
              selectedImage === image
                ? "border-red-600 shadow-md"
                : "border-gray-200 hover:border-red-400"
            }`}
          >
            <Image
              src={image}
              alt={`${productName} ${index + 1}`}
              width={64}
              height={64}
              className="h-full w-full object-contain p-1"
              onError={(e) => {
                e.currentTarget.src = "/images/products/no-image.jpg";
              }}
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex h-[300px] lg:h-[470px] flex-1 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">
        <span className="absolute left-4 top-4 z-10 rounded-md bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Product Image
        </span>

        <div className="flex h-full w-full items-center justify-center p-4 sm:p-5">
          <Image
            src={selectedImage}
            alt={productName}
            width={700}
            height={700}
            priority
            className="max-h-full max-w-full lg:max-h-[400px] lg:max-w-[400px] object-contain transition-transform duration-300 hover:scale-105"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
              transform: isZoomed ? "scale(2)" : undefined,
              cursor: isZoomed ? "zoom-in" : "default"
            }}
            onError={(e) => {
              e.currentTarget.src = "/images/products/no-image.jpg";
            }}
          />
        </div>
      </div>
    </div>
  );
}
