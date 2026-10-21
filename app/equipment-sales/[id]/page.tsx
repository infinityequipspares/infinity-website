'use client';

import React, { useState, useEffect, useRef, use } from 'react';
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

  // Parse images
  const imageString = rawMachine.images || rawMachine.Images || "";
  const images = imageString
    .toString()
    .split(',')
    .map((img: string) => img.trim())
    .filter((img: string) => img !== "")
    .map((img: string) => `/images/machine-sales/${img}`);

  // States
  const [selectedImage, setSelectedImage] = useState(images[0] || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Read More States
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Zoom States (Click to Zoom specific area)
  const [zoomProps, setZoomProps] = useState({ isZoomed: false, x: 50, y: 50 });

  // Touch Swipe States for Mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when lightbox is open
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

  // Thumbnail Auto-Scroll Feature
  useEffect(() => {
    const activeThumbMain = document.getElementById(`thumb-main-${currentIndex}`);
    if (activeThumbMain) {
      activeThumbMain.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    const activeThumbLight = document.getElementById(`thumb-light-${currentIndex}`);
    if (activeThumbLight) {
      activeThumbLight.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentIndex, isLightboxOpen]);

  // Image Navigation Handlers
  const handleImageClick = (img: string, index: number) => {
    setSelectedImage(img);
    setCurrentIndex(index);
    setIsLightboxOpen(true);
    setZoomProps({ ...zoomProps, isZoomed: false });
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIdx);
    setSelectedImage(images[nextIdx]);
    setZoomProps({ ...zoomProps, isZoomed: false });
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIdx);
    setSelectedImage(images[prevIdx]);
    setZoomProps({ ...zoomProps, isZoomed: false });
  };

  // Keyboard Navigation (Desktop Main & Lightbox)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (isLightboxOpen && e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, currentIndex]);

  // Mobile Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Smart Zoom Logic (Zooms where customer clicks)
  const handleZoomToggle = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomProps({ isZoomed: !zoomProps.isZoomed, x, y });
  };

  const handleZoomMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!zoomProps.isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomProps({ ...zoomProps, x, y });
  };

  // Standardized Equipment Data
  const machine = {
    id: rawMachine.id || rawMachine.ID,
    brand: rawMachine.brand || rawMachine.Brand || 'Unknown Brand',
    model: rawMachine.model || rawMachine.Model || 'Unknown Model',
    type: rawMachine.type || rawMachine.Type || 'Industrial Equipment',
    year: rawMachine['year of manufacture'] || rawMachine.year || '-',
    platformHeight: rawMachine['platform height'] || rawMachine.platformHeight || '-',
    workingHeight: rawMachine['working height'] || rawMachine.workingHeight || '-',
    origin: rawMachine['country origin'] || rawMachine.origin || '-',
    condition: rawMachine.condition || rawMachine.Condition || 'Used',
    location: rawMachine['machine location'] || rawMachine.location || 'Navi Mumbai, India',
    price: rawMachine.price || rawMachine.Price || '',
    description: rawMachine.description || rawMachine.Description || 'No detailed description available for this equipment.',
  };

  const formattedPrice = machine.price && !isNaN(Number(machine.price)) 
    ? Number(machine.price).toLocaleString('en-IN') 
    : null;

  const CONTACT_PHONE = "+919167867476";
  const CONTACT_EMAIL = "contact@infinityequipspares.com";
  
  const whatsappMessage = `Hello Infinity Equipments, I am interested in the ${machine.brand} ${machine.model} (${machine.year} Model). Please share the commercial quotation and inspection report.`;
  const emailSubject = encodeURIComponent(`Enquiry: ${machine.brand} ${machine.model} (${machine.year})`);
  const emailBody = encodeURIComponent(`Hello Infinity Equipments And Spares Team,\n\nI would like to request a formal quotation, current availability, and detailed inspection report for the following equipment listed on your website:\n\nBrand: ${machine.brand}\nModel: ${machine.model}\nYear: ${machine.year}\n\nPlease let me know the next steps.\n\nThank you.`);

  const handleShare = async () => {
    const shareData = {
      title: `${machine.brand} ${machine.model} - Infinity Equipments`,
      text: `Check out this ${machine.brand} ${machine.model} (${machine.year}) on Infinity Equipments And Spares.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share dismissed or failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const specsList = [
    { label: 'Make / Brand', value: machine.brand },
    { label: 'Model', value: machine.model },
    { label: 'Year of Mfg', value: machine.year },
    { label: 'Country of Origin', value: machine.origin },
    { label: 'Platform Height', value: machine.platformHeight },
    { label: 'Working Height', value: machine.workingHeight },
    { label: 'Location', value: machine.location },
    { label: 'Condition', value: machine.condition },
  ];

  const visibleSpecs = isSpecsExpanded ? specsList : specsList.slice(0, 4);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20 font-sans text-gray-900">
      
      {/* Subtle Pulse Animation for Call Button */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ring-pulse {
          0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.15); }
          70% { box-shadow: 0 0 0 6px rgba(220, 38, 38, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }
        .animate-call-btn {
          animation: ring-pulse 2s infinite;
        }
      `}} />

      {/* 1. TOP BREADCRUMB NAVIGATION */}
      <nav className="bg-white border-b border-gray-200 py-3 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
          <ol className="flex items-center gap-2 text-[11px] md:text-[13px] text-gray-500 font-medium overflow-hidden whitespace-nowrap">
            <li><Link href="/" className="hover:text-red-600 transition-colors">Home</Link></li>
            <li><span className="text-gray-300">/</span></li>
            <li><Link href="/equipment-sales" className="hover:text-red-600 transition-colors">Equipment Sales</Link></li>
            <li><span className="text-gray-300">/</span></li>
            <li className="text-gray-900 font-bold truncate">{machine.model}</li>
          </ol>
        </div>
      </nav>

      <main className="container mx-auto px-4 lg:px-8 max-w-[1400px] mt-4 md:mt-8">
        
        {/* Mobile Only: Top Header (Title + Share button) */}
        <div className="flex lg:hidden items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-gray-100 text-gray-700 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">
                {machine.condition}
              </span>
              <span className="text-red-600 text-[11px] font-black uppercase tracking-widest">
                {machine.brand}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {machine.brand} {machine.model}
            </h1>
          </div>
          
          <button 
            onClick={handleShare}
            className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-red-600 transition-colors flex-shrink-0 mt-1"
            title="Share Equipment"
          >
            <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm active:bg-gray-50 transition-colors">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            </div>
          </button>
        </div>

        {/* MAIN GRID (Amazon Style: Left Gallery, Right Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start">
          
          {/* LEFT: GALLERY AREA */}
          <section className="lg:col-span-7 flex flex-col gap-3">
            
            {/* Main Image Viewport with Arrows, Click-to-Zoom & Mobile Swipe */}
            <div 
              className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative h-[320px] sm:h-[450px] lg:h-[550px] flex items-center justify-center ${zoomProps.isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'} group`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt={`${machine.brand} ${machine.model}`} 
                  onClick={handleZoomToggle}
                  onMouseMove={handleZoomMove}
                  style={{
                    transformOrigin: `${zoomProps.x}% ${zoomProps.y}%`,
                    transform: zoomProps.isZoomed ? 'scale(2.5)' : 'scale(1)'
                  }}
                  className="w-full h-full object-contain p-2 transition-transform duration-200 ease-out" 
                />
              ) : (
                <span className="text-gray-400 font-medium">No Images Available</span>
              )}

              {/* In-page Navigation Arrows (Always visible on hover for desktop, persistent for mobile) */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 z-10 transition-all opacity-80 hover:opacity-100 focus:outline-none"
                    aria-label="Previous image"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 z-10 transition-all opacity-80 hover:opacity-100 focus:outline-none"
                    aria-label="Next image"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </>
              )}
              
              {/* Expand to Lightbox Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(true); }}
                className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-800 text-[10px] md:text-xs px-3 py-2 rounded-lg opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-sm font-bold z-10"
              >
                <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                <span className="hidden sm:inline">Fullscreen</span>
              </button>
            </div>

            {/* Horizontal Thumbnails (Desktop & Mobile) */}
            {images.length > 1 && (
              <div className="bg-white p-2 md:p-2.5 rounded-xl border border-gray-200 shadow-sm flex gap-2 md:gap-2.5 overflow-x-auto scrollbar-hide">
                {images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    id={`thumb-main-${idx}`} 
                    onClick={() => { setSelectedImage(img); setCurrentIndex(idx); setZoomProps({...zoomProps, isZoomed: false}); }}
                    className={`relative w-14 h-14 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all focus:outline-none ${currentIndex === idx ? 'ring-2 ring-red-600 ring-offset-1 border-transparent active-thumbnail scale-[1.02]' : 'border border-gray-200 opacity-60 hover:opacity-100'}`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* RIGHT: DETAILS, PRICING, SPECS (Amazon Style Layout) */}
          <section className="lg:col-span-5 flex flex-col gap-4 md:gap-5">
            
            {/* Slim Verified Badge at Top */}
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 rounded text-[9px] md:text-[10px] font-extrabold w-fit uppercase tracking-widest shadow-sm">
              <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              Verified Industrial Supplier
            </div>

            {/* Desktop Title & Share (Hidden on Mobile) */}
            <div className="hidden lg:flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-100 text-gray-700 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">
                    {machine.condition}
                  </span>
                  <span className="text-red-600 text-[11px] font-black uppercase tracking-widest">
                    {machine.brand}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  {machine.brand} {machine.model}
                </h1>
                <p className="text-sm text-gray-500 mt-2 font-medium">
                  {machine.type} • Manufactured in {machine.year}
                </p>
              </div>
              
              <button 
                onClick={handleShare}
                className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-red-600 transition-colors flex-shrink-0 mt-1"
                title="Share Equipment"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </div>
              </button>
            </div>

            {/* Price Box */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 md:p-5">
              <h2 className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Asking Price</h2>
              {formattedPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">₹ {formattedPrice}</span>
                  <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 hidden sm:inline-block">Excl. Tax & Logistics</span>
                </div>
              ) : (
                <span className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">Price on Request</span>
              )}
              <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 sm:hidden block mt-0.5">Excl. Tax & Logistics</span>
            </div>

            {/* 3 Buttons in ONE Row (Clean White Backgrounds) */}
            <div className="grid grid-cols-3 gap-2 w-full">
              <a 
                href={`https://wa.me/${CONTACT_PHONE.replace('+', '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center py-2.5 px-1 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#25D366] transition-all duration-300 text-center"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 mb-1 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
                <span className="text-[10px] md:text-[11px] font-bold text-gray-700 group-hover:text-[#25D366] transition-colors">WhatsApp</span>
              </a>
              
              <a 
                href={`tel:${CONTACT_PHONE}`} 
                className="group flex flex-col items-center justify-center py-2.5 px-1 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-red-600 animate-call-btn transition-all duration-300 text-center"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 mb-1 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 1h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span className="text-[10px] md:text-[11px] font-extrabold text-gray-700 group-hover:text-red-600 transition-colors">Call Us</span>
              </a>

              <a 
                href={`mailto:${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`} 
                className="group flex flex-col items-center justify-center py-2.5 px-1 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-gray-800 transition-all duration-300 text-center"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 mb-1 text-gray-500 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span className="text-[10px] md:text-[11px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Email</span>
              </a>
            </div>

            {/* Technical Specifications with Read More */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-1">
              <div className="bg-gray-50 border-b border-gray-200 px-4 md:px-5 py-3 md:py-3.5">
                <h3 className="text-[11px] md:text-xs font-extrabold text-gray-900 uppercase tracking-widest">Technical Specifications</h3>
              </div>
              <div className="p-0">
                <ul className="divide-y divide-gray-100">
                  {visibleSpecs.map((spec, index) => (
                    <li key={index} className="flex justify-between items-center p-3 md:p-4 hover:bg-gray-50 transition-colors text-xs md:text-sm">
                      <span className="text-gray-500 font-medium">{spec.label}</span>
                      <span className="font-bold text-gray-900 text-right">{spec.value}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Read More Button for Specs */}
                {specsList.length > 4 && (
                  <button 
                    onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}
                    className="w-full p-3 md:p-3.5 text-[10px] md:text-xs font-bold text-red-600 bg-gray-50 hover:bg-gray-100 transition-colors border-t border-gray-200 flex items-center justify-center gap-1 uppercase tracking-widest"
                  >
                    {isSpecsExpanded ? 'Show Less' : 'Read More'}
                    <svg className={`w-3.5 h-3.5 md:w-4 md:h-4 transform transition-transform ${isSpecsExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                )}
              </div>
            </div>

          </section>
        </div>

        {/* 4. FULL-WIDTH EQUIPMENT DESCRIPTION */}
        {machine.description && machine.description !== 'No detailed description available for this equipment.' && (
          <div className="mt-6 md:mt-8 col-span-12">
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-8">
              <h3 className="text-xs md:text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-3 md:mb-4 border-b border-gray-100 pb-2 md:pb-3">Equipment Description</h3>
              <div className={`text-gray-600 text-[12px] md:text-sm leading-relaxed whitespace-pre-wrap ${!isDescExpanded ? 'line-clamp-3 md:line-clamp-4' : ''}`}>
                {machine.description}
              </div>
              
              {/* Read More Toggle for Description */}
              {machine.description.length > 150 && (
                <button 
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="mt-3 md:mt-4 text-[10px] md:text-xs font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-lg w-max"
                >
                  {isDescExpanded ? 'Show Less' : 'Read More'}
                  <svg className={`w-3 h-3 md:w-3.5 md:h-3.5 transform transition-transform ${isDescExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </button>
              )}
            </section>
          </div>
        )}

      </main>
      
      {/* 5. LIGHTBOX PORTAL (PREMIUM GALLERY WITH LOGO HEADER & PERFECT ZOOM) */}
      {isLightboxOpen && mounted && createPortal(
        <div 
          className="fixed inset-0 z-[99999999] bg-white flex flex-col h-[100dvh] w-[100vw] overflow-hidden select-none"
          role="dialog" 
          aria-modal="true"
        >
          {/* Header Bar with Logo (Black & Red text like Website) */}
          <header className="h-[60px] md:h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-3 md:px-6 flex-shrink-0 z-30 shadow-sm">
            <div className="flex items-center gap-2 md:gap-3">
              <img src="/images/logo.webp" alt="Infinity Equipments And Spares" className="h-7 md:h-9 object-contain" />
              <div className="flex flex-col justify-center">
                 <span className="font-extrabold text-[11px] md:text-sm leading-tight">
                    <span className="text-gray-900">Infinity Equipments</span> <span className="text-red-600">And Spares</span>
                 </span>
                 <span className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mt-0.5 truncate max-w-[150px] sm:max-w-md">{machine.brand} {machine.model}</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 hover:bg-red-50 hover:text-red-600 border border-gray-200 rounded-full flex items-center justify-center transition-colors text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Close gallery"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </header>

          {/* Main Workspace */}
          <div className="flex flex-1 flex-col md:flex-row overflow-hidden bg-gray-50">
            
            {/* Center Large Image Area with Precise Click-to-Zoom */}
            <section className="flex-1 relative flex items-center justify-center p-2 md:p-8 h-full overflow-hidden bg-gray-50/50">
              
              <div className="absolute top-3 left-3 md:top-6 md:left-6 bg-white border border-gray-200 px-2.5 md:px-3 py-1 md:py-1.5 rounded-md text-gray-700 text-[10px] md:text-xs font-extrabold tracking-widest z-10 shadow-sm">
                {currentIndex + 1} / {images.length}
              </div>

              <img 
                src={selectedImage} 
                alt={`${machine.brand} ${machine.model} Full View`} 
                className={`w-full h-full object-contain drop-shadow-sm select-none transition-transform duration-200 ease-out ${zoomProps.isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={handleZoomToggle}
                onMouseMove={handleZoomMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  transformOrigin: `${zoomProps.x}% ${zoomProps.y}%`,
                  transform: zoomProps.isZoomed ? 'scale(3)' : 'scale(1)'
                }}
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => prevImage(e)} 
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white/80 hover:bg-white text-gray-800 hover:text-red-600 rounded-full flex items-center justify-center transition-all border border-gray-200 shadow-md focus:outline-none"
                  >
                     <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button 
                    onClick={(e) => nextImage(e)} 
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white/80 hover:bg-white text-gray-800 hover:text-red-600 rounded-full flex items-center justify-center transition-all border border-gray-200 shadow-md focus:outline-none"
                  >
                     <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </>
              )}

              {/* Bottom Horizontal Thumbnails (Lightbox) */}
              {images.length > 1 && (
                <div className="absolute bottom-3 md:bottom-4 inset-x-0 flex justify-center w-full px-3 md:px-4">
                  <div className="flex gap-2 md:gap-2.5 overflow-x-auto p-1.5 md:p-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm max-w-full scrollbar-hide">
                    {images.map((img: string, idx: number) => (
                      <button 
                        key={idx}
                        id={`thumb-light-${idx}`}
                        onClick={() => { setSelectedImage(img); setCurrentIndex(idx); setZoomProps({...zoomProps, isZoomed: false}); }}
                        className={`w-10 h-10 md:w-16 md:h-16 rounded-md overflow-hidden flex-shrink-0 transition-all ${currentIndex === idx ? 'border-2 border-red-600 shadow-sm opacity-100 active-thumbnail scale-105' : 'border border-gray-200 opacity-50 hover:opacity-100'}`}
                      >
                        <img src={img} alt="thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
