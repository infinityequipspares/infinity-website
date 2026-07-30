'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import machineSalesData from '@/data/machine-sales.json';

export default function MachineDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const machineId = resolvedParams.id;

  const rawMachine = machineSalesData.find((m: any) => 
    m.slug === machineId || m.id === machineId || m.ID === machineId
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
  const [isExtraZoomed, setIsExtraZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleImageClick = (img: string, index: number) => {
    setSelectedImage(img);
    setCurrentIndex(index);
    setIsLightboxOpen(true);
    setIsExtraZoomed(false);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIdx);
    setSelectedImage(images[nextIdx]);
    setIsExtraZoomed(false);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIdx);
    setSelectedImage(images[prevIdx]);
    setIsExtraZoomed(false);
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

  const whatsappMessage = `Hi Infinity Equipments Corporate Team, I am inquiring about the commercial asset: ${machine.brand} ${machine.model} (${machine.year} Model). Please share formal commercial quotation and availability.`;

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
      {/* Clean Breadcrumb Bar (Share Button removed from here) */}
      <div className="bg-white border-b border-gray-300 py-3 mb-6 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-start text-xs md:text-sm text-gray-600 font-medium">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span>&gt;</span>
            <Link href="/machine-sales" className="hover:text-red-600">Machine Sales</Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-bold">{machine.model}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Gallery Viewport */}
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
                <span>🔍 Click to Expand & Slide</span>
              </div>

              {images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(e); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2.5 sm:p-3 rounded-lg transition-colors backdrop-blur-sm shadow-lg"
                  >
                    ❮
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(e); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2.5 sm:p-3 rounded-lg transition-colors backdrop-blur-sm shadow-lg"
                  >
                    ❯
                  </button>
                </>
              )}
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

          {/* Right Side: Model, Price, WhatsApp/Call Buttons & Exact Product-Style Share Button */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-md">
              <div className="mb-1">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  {machine.condition} • {machine.brand || 'INDUSTRIAL ASSET'}
                </span>
              </div>
              
              {/* Model & Price Side-by-Side */}
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

              {/* Action Buttons (WhatsApp & Call Us) */}
              <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                <a 
                  href={`https://wa.me/919167867476?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-2 sm:px-4 rounded-xl transition-all shadow-md text-xs tracking-wide"
                >
                  <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  WhatsApp
                </a>

                <a 
                  href="tel:919167867476"
                  className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-2 sm:px-4 rounded-xl transition-all shadow-sm text-xs tracking-wide"
                >
                  📞 Call Us
                </a>
              </div>

              {/* Exact Product-Style Share Button */}
              <button 
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2.5 px-4 rounded-xl border border-gray-300 transition-all text-xs shadow-sm"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>{copied ? 'Link Copied to Clipboard!' : 'Share Machine'}</span>
              </button>
            </div>

            {/* Machine Details & Information Box */}
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
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-medium">Platform Height:</span>
                <span className="font-bold text-gray-900">{machine.platformHeight}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-medium">Working Height:</span>
                <span className="font-bold text-gray-900">{machine.workingHeight}</span>
              </div>
            </div>

            {/* Machine Description */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-md">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3 border-b pb-2">Machine Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                {machine.description}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/75 backdrop-blur-sm flex flex-col justify-between select-none p-3 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto z-25 bg-black/60 px-4 py-2.5 rounded-xl border border-white/15 backdrop-blur-md">
            <span className="text-xs font-bold tracking-wider text-white/90">
              Photo {currentIndex + 1} of {images.length}
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsExtraZoomed(!isExtraZoomed); }}
                className="px-3 py-1.5 text-xs font-bold bg-black/70 hover:bg-black text-white rounded-lg transition-colors border border-white/20 shadow-lg"
              >
                {isExtraZoomed ? '🔍 Reset Zoom' : '🔍 Extra Zoom'}
              </button>
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors font-bold text-base shadow-2xl flex-shrink-0"
              >
                ✕
              </button>
            </div>
          </div>

          <div 
            className="relative flex-grow flex items-center justify-center w-full h-full p-2 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Fullscreen Preview" 
              className={`transition-transform duration-300 object-contain max-h-[75vh] max-w-[95vw] ${isExtraZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'}`}
              onClick={() => setIsExtraZoomed(!isExtraZoomed)}
            />

            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-3 rounded-xl transition-colors shadow-2xl text-sm sm:text-base z-25 backdrop-blur-sm"
                >
                  ❮
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-3 rounded-xl transition-colors shadow-2xl text-sm sm:text-base z-25 backdrop-blur-sm"
                >
                  ❯
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div 
              className="max-w-3xl w-full mx-auto flex gap-2 overflow-x-auto justify-center p-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/15 shadow-2xl z-25"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img: string, idx: number) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setSelectedImage(img);
                    setCurrentIndex(idx);
                    setIsExtraZoomed(false);
                  }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 cursor-pointer flex-shrink-0 transition-all ${currentIndex === idx ? 'border-red-600 scale-105 shadow-lg ring-2 ring-red-600/40' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
