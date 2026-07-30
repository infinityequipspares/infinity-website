import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import machineSalesData from '@/data/machine-sales.json';

export const metadata: Metadata = {
  title: 'New & Used Aerial Work Platforms | Infinity Equipments And Spares',
  description: 'Buy premium new and used Aerial Work Platforms, Boom Lifts, and Scissor Lifts from Infinity Equipments And Spares. High-quality imported machinery for your projects.',
  keywords: 'used machine, used boom lift, aerial work platforms, Infinity Equipments And Spares, used scissor lift, JLG used machine, Genie lifts India',
};

export default function MachineSales() {
  const machines = machineSalesData.map((row: any) => {
    const imageString = row.images || row.Images || "";
    const imgArray = imageString
      .toString()
      .split(',')
      .map((img: string) => img.trim())
      .filter((img: string) => img !== "")
      .map((img: string) => `/images/machine-sales/${img}`);

    return {
      id: row.id || row.ID,
      slug: row.slug || row.Slug || '',
      brand: row.brand || row.Brand || '',
      model: row.model || row.Model || 'Unknown Model',
      type: row.type || row.Type || 'Unknown Type',
      year: row['year of manufacture'] || row.year || '-',
      condition: row.condition || row.Condition || '-',
      images: imgArray
    };
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      {/* Reduced Top Heading Space & Size */}
      <div className="text-center mb-6 md:mb-12">
        <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-red-700 border border-red-200 shadow-sm">
          MACHINE SALES & SERVICES
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-2.5">
          New & Used <span className="text-red-600">Aerial Work Platforms</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
          Infinity Equipments And Spares offers a curated selection of premium Boom Lifts and Scissor Lifts, engineered for reliability and heavy-duty performance.
        </p>
      </div>

      {machines.length === 0 ? (
        <div className="text-center text-gray-500 py-16 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
          No machinery listings available right now. Please check back later.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {machines.map((machine: any, index: number) => (
            <Link 
              href={`/machine-sales/${machine.slug ? machine.slug : machine.id}`} 
              key={machine.id || index} 
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-col group"
            >
              {/* JLG Style Mobile Horizontal Split Layout */}
              <div className="grid grid-cols-12 lg:grid-cols-1 w-full items-center">
                
                {/* Image Section (Left on Mobile, Top on Desktop) */}
                <div className="col-span-5 lg:col-span-1 h-36 sm:h-44 lg:h-52 bg-gray-100 relative border-r lg:border-r-0 lg:border-b border-gray-100 flex items-center justify-center overflow-hidden">
                   {machine.images && machine.images.length > 0 ? (
                     <img src={machine.images[0]} alt={machine.model} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                   ) : (
                     <span className="text-gray-400 font-medium text-xs tracking-wide">[No Image]</span>
                   )}
                </div>

                {/* Details Section showing Model and Year of Mfg (Price Removed) */}
                <div className="col-span-7 lg:col-span-1 p-3.5 sm:p-5 flex flex-col justify-between bg-white h-full">
                  <div>
                    <h3 className="text-sm sm:text-lg font-black text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">{machine.model}</h3>
                    <p className="text-red-700 text-[10px] sm:text-xs mb-2.5 font-semibold uppercase tracking-wider line-clamp-1">{machine.type}</p>
                    
                    {/* Showing Year of Mfg instead of Price */}
                    <div className="mb-3 bg-gray-50 py-1.5 px-2.5 rounded-xl border border-gray-200 flex justify-between items-center text-xs text-gray-700">
                      <span className="font-medium text-[11px]">Year of Mfg:</span>
                      <span className="font-bold text-gray-900">{machine.year}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-center w-full bg-red-600 group-hover:bg-red-700 text-white font-bold py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl transition-colors text-[11px] sm:text-xs tracking-wider uppercase shadow-sm">
                    View Details
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
