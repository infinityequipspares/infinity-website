'use client';

import React, { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createPortal } from 'react-dom';
import machineSalesData from '@/data/machine-sales.json';

export default function MachineDetail({ params }: { params: Promise<any> }) {
  const resolvedParams = use(params);
  const machineId = resolvedParams.id || resolvedParams.slug;

  const rawMachine = machineSalesData.find((m: any) => 
    String(m.slug) === String(machineId) || 
    String(m.id) === String(machineId) || 
    String(m.ID) === String(machineId)
  ) as any;

  if (!rawMachine) {
    notFound();
  }

  const imageString = rawMachine.images || rawMachine.Images || "";
  const images = imageString
    .toString()
    .split(',')
    .map((img: string) => img.trim())
    .filter((img: string) => img !== "")
    .map((img: string) => `/images/machine-sales/${img}`);

  const [selectedImage, setSelectedImage] = useState(images[0] || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLightboxOpen]);

  const handleImageClick = (img: string, index: number) => {
    setSelectedImage(img);
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIdx);
    setSelectedImage(images[nextIdx]);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIdx);
    setSelectedImage(images[prevIdx]);
  };

  const machine = {
    id: rawMachine.id || rawMachine.ID,
    brand: rawMachine.brand || rawMachine.Brand || '',
    model: rawMachine.model || rawMachine.Model || 'Unknown Model',
    type: rawMachine.type || rawMachine.Type || 'Unknown Type',
    year: rawMachine['year of manufacture'] || rawMachine.year || '-',
    platformHeight: rawMachine['platform height'] || rawMachine.platformHeight || '-',
    workingHeight: rawMachine['working height'] || rawMachine.workingHeight || '-',
    origin: rawMachine['country origin'] || rawMachine.origin || '-',
    condition: rawMachine.condition || rawMachine.Condition || '-',
    location: rawMachine['machine location'] || rawMachine.location || '-',
    price: rawMachine.price || rawMachine.Price || '',
    description: rawMachine.description || rawMachine.Description || 'No detailed description available for this machine.',
  };

  const whatsappMessage = `Hello Infinity Equipments And Spares, I would like to inquire about the following equipment: ${machine.brand} ${machine.model} (${machine.year} Model). Please share formal commercial quotation and availability.`;

  const handleShare = async () => {
    const shareData = {
      title: `${machine.brand} ${machine.model}`,
      text: `Check out this machine: ${machine.brand} ${machine.model} (${machine.year}) on Infinity Equipments`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-[#f4f4f4] min-h-screen pb-16">
      {/* Clean Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-300 py-3 mb-6 shadow-sm relative z-10">
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-start text-xs md:text-sm text-gray-600 font-medium">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span>&gt;</span>
            <Link href="/equipment-sales" className="hover:text-red-600">Equipment Sales</Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-bold">{machine.model}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Main Page Viewport */}
          <div className="lg:col-span-7 flex flex-col bg-white p-4 md:p-5 rounded-2xl border border-gray-200 shadow-md">
            <div 
              className="bg-gray-900 rounded-xl overflow-hidden relative mb-4 h-[300px] sm:h-[380px] md:h-[460px] flex items-center justify-center cursor-pointer group shadow-inner"
              onClick={() => handleImageClick(selectedImage, currentIndex)}
            >
              {selectedImage ? (
                <img src={selectedImage} alt={machine.model} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <span className="text-gray-400 text-sm">No Image Available</span>
              )}
              
              <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md">
                <span>🔍 Click to View Gallery</span>
              </div>
            </div>

            <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5">Photos ({images.length})</p>
            
            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
                {images.map((img: string, idx: number) => (
                  <div 
                    key={idx} 
                    onClick={() => {
                      setSelectedImage(img);
                      setCurrentIndex(idx);
                    }}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-100 border-2 overflow-hidden cursor-pointer flex-shrink-0 transition-all ${selectedImage === img ? 'border-red-600 ring-2 ring-red-600/30 scale-95 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`${machine.model} - ${idx+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Details */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-md">
              <div className="mb-1">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  {machine.condition} • {machine.brand || 'INDUSTRIAL ASSET'}
                </span>
              </div>
              
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-gray-200">
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight truncate">{machine.model}</h1>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 truncate">{machine.type}</p>
                </div>
                
                <div className="bg-gray-50 py-2 px-2.5 sm:px-3 rounded-xl border border-gray-200 text-right flex-shrink-0 shadow-inner">
                  {machine.price ? (
                    <div>
                      <span className="text-base sm:text-lg md:text-xl font-black text-gray-900 tracking-tight">
                        ₹ {Number(machine.price).toLocaleString('en-IN')}
                      </span>
                      <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-gray-500">(+Taxes & Logistics)</p>
                    </div>
                  ) : (
                    <span className="text-xs sm:text-sm font-extrabold text-gray-800">Call for Price</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                <a 
                  href={`https://wa.me/919167867476?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-2 sm:px-4 rounded-xl transition-all shadow-md text-xs tracking-wide"
                >
                  WhatsApp
                </a>
                <a 
                  href="tel:919167867476"
                  className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-2 sm:px-4 rounded-xl transition-all shadow-sm text-xs tracking-wide"
                >
                  📞 Call Us
                </a>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-md space-y-3 text-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b pb-2">Machine Details & Information</h3>
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-medium">Machine Location:</span>
                <span className="font-bold text-gray-900">{machine.location}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-medium">Country Origin:</span>
                <span className="font-bold text-gray-900">{machine.origin}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-medium">Year of Mfg:</span>
                <span className="font-bold text-gray-900">{machine.year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 🌟 PREMIUM "MACHINERYLINE" STYLE GALLERY PORTAL 🌟 */}
      {isLightboxOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[99999999] bg-white flex flex-col select-none touch-none">
          
          {/* Header Bar */}
          <div className="h-[60px] md:h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 md:gap-3">
                 <span className="text-xs md:text-sm font-bold text-red-600 uppercase tracking-wider">{machine.brand}</span>
                 <span className="text-gray-300">|</span>
                 <h2 className="text-sm md:text-lg font-black text-gray-900 leading-tight">{machine.model}</h2>
              </div>
              <p className="text-xs font-bold text-gray-500 mt-0.5 tracking-wide">
                {machine.price ? `₹ ${Number(machine.price).toLocaleString('en-IN')}` : 'Price on request'}
              </p>
            </div>
            
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-full flex items-center justify-center transition-colors text-gray-600 border border-gray-200"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Main 3-Column Layout */}
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden bg-[#18181b]">
            
            {/* 1. Left: Vertical Thumbnails (Hidden on very small screens, visible on md+) */}
            <div className="hidden md:flex w-[120px] flex-col gap-3 p-4 overflow-y-auto bg-[#18181b] border-r border-white/5 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              {images.map((img: string, idx: number) => (
                <div 
                  key={idx} 
                  onClick={() => { setSelectedImage(img); setCurrentIndex(idx); }} 
                  className={`w-full aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${currentIndex === idx ? 'border-[3px] border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)] opacity-100 scale-105' : 'border border-white/10 opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* 2. Center: Large Image Area */}
            <div className="flex-1 relative flex items-center justify-center p-2 md:p-6 bg-[#18181b]">
              {/* Image Counter */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/60 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-white text-xs md:text-sm font-bold tracking-widest z-10 border border-white/10">
                {currentIndex + 1} / {images.length}
              </div>
              
              <img 
                src={selectedImage} 
                alt="Main View" 
                className="max-w-full max-h-[70vh] md:max-h-[85vh] object-contain drop-shadow-2xl" 
              />
              
              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevImage(e); }} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/40 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10 group shadow-xl">
                     <svg className="w-5 h-5 md:w-7 md:h-7 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextImage(e); }} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/40 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10 group shadow-xl">
                     <svg className="w-5 h-5 md:w-7 md:h-7 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </>
              )}

              {/* Mobile Horizontal Thumbnails (Only visible on mobile) */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-0 w-full md:hidden px-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img: string, idx: number) => (
                      <div 
                        key={idx}
                        onClick={() => { setSelectedImage(img); setCurrentIndex(idx); }}
                        className={`w-14 h-14 rounded-lg cursor-pointer flex-shrink-0 transition-all overflow-hidden ${currentIndex === idx ? 'border-2 border-red-500 scale-105 opacity-100' : 'border border-white/20 opacity-50'}`}
                      >
                        <img src={img} alt="thumb" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Right: Contact Seller Area */}
            <div className="w-full md:w-[360px] bg-white flex flex-col flex-shrink-0 overflow-y-auto border-l border-gray-200 shadow-[-10px_0_20px_rgba(0,0,0,0.05)] z-20">
              <div className="p-5 md:p-6 flex flex-col gap-6">
                
                {/* Seller Info Card */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Seller's Contacts</h3>
                  
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0 p-1 shadow-sm">
                        <img src="/images/logo.webp" alt="Logo" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-sm leading-tight">Infinity Equipments <br/>And Spares</h4>
                        <p className="text-[11px] text-gray-500 font-bold mt-1">Navi Mumbai, India</p>
                      </div>
                    </div>
                    
                    <div className="bg-emerald-50 text-emerald-700 text-[11px] font-extrabold px-3 py-1.5 rounded-md flex items-center gap-1.5 w-fit">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      Verified Seller
                    </div>
                  </div>
                </div>

                {/* Call To Action Buttons */}
                <div className="flex flex-col gap-3">
                  <a 
                    href={`https://wa.me/919167867476?text=${encodeURIComponent(whatsappMessage)}`} 
                    target="_blank" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors shadow-sm text-sm"
                  >
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                     WhatsApp Us
                  </a>
                  <a 
                    href="tel:+919167867476" 
                    className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors shadow-sm text-sm"
                  >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 1h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                     +91 916 786 7476
                  </a>
                </div>
                
                {/* Form placeholder (Optional Info box) */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mt-2">
                  <h3 className="text-xs font-extrabold text-gray-900 mb-2.5 uppercase tracking-wide">Interested in this {machine.brand}?</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">Click WhatsApp or Call to get the best price, detailed inspection reports, and delivery information across India.</p>
                </div>

              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
