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
    <section className="antialiased bg-white overflow-hidden min-h-screen">
      
      {/* Consistent Hero Section */}
      <div className="mx-auto max-w-[1360px] px-4 pt-12 pb-16 lg:px-6">
        
        <div className="text-center mb-14 flex flex-col items-center">
          <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.25em] text-red-700 ring-1 ring-inset ring-red-600/20 mb-5 transition-all hover:bg-red-100 cursor-default">
            MACHINE SALES & SERVICES
          </span>
          
          <h1 className="text-[28px] sm:text-4xl lg:text-[54px] xl:text-[60px] font-extrabold text-gray-900 tracking-tight leading-tight lg:whitespace-nowrap mx-auto w-full">
            New & Used <span className="text-red-600">Aerial Work Platforms</span>
          </h1>
          
          <p className="mt-5 text-[15px] md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed opacity-90">
            Infinity Equipments And Spares offers a curated selection of premium Boom Lifts and Scissor Lifts, engineered for reliability and heavy-duty performance.
          </p>
        </div>

        {/* Machines Grid */}
        {machines.length === 0 ? (
          <div className="text-center text-gray-500 py-16 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm max-w-4xl mx-auto">
            No machinery listings available right now. Please check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {machines.map((machine: any, index: number) => (
              <Link 
                href={`/machine-sales/${machine.slug ? machine.slug : machine.id}`} 
                key={machine.id || index} 
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(220,38,38,0.12)] hover:border-red-200 hover:-translate-y-1 transition-all duration-300 flex flex-col lg:flex-col group"
              >
                {/* JLG Style Mobile Horizontal Split Layout */}
                <div className="grid grid-cols-12 lg:grid-cols-1 w-full items-center">
                  
                  {/* Image Section */}
                  <div className="col-span-5 lg:col-span-1 h-36 sm:h-44 lg:h-56 bg-gray-50 relative border-r lg:border-r-0 lg:border-b border-gray-100 flex items-center justify-center overflow-hidden">
                     {machine.images && machine.images.length > 0 ? (
                       <div className="w-full h-full relative overflow-hidden">
                         <img 
                           src={machine.images[0]} 
                           alt={machine.model} 
                           className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                         />
                         <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
                       </div>
                     ) : (
                       <span className="text-gray-400 font-semibold text-[10px] tracking-widest uppercase">[No Image]</span>
                     )}
                  </div>

                  {/* Details Section */}
                  <div className="col-span-7 lg:col-span-1 p-4 sm:p-6 flex flex-col justify-between bg-white h-full">
                    <div>
                      <h3 className="text-[15px] sm:text-lg font-black text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1 mb-1">
                        {machine.model}
                      </h3>
                      <p className="text-red-600 text-[10px] sm:text-[11px] mb-3 sm:mb-4 font-bold uppercase tracking-widest line-clamp-1">
                        {machine.type}
                      </p>
                      
                      <div className="mb-4 bg-gray-50 py-2 px-3 rounded-xl border border-gray-100 flex justify-between items-center text-xs text-gray-700 group-hover:border-red-100 transition-colors">
                        <span className="font-semibold text-[11px] text-gray-500">Year of Mfg:</span>
                        <span className="font-bold text-gray-900">{machine.year}</span>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-center w-full bg-red-600 group-hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 text-[11.5px] sm:text-xs tracking-wider uppercase shadow-sm group-hover:shadow-md">
                      View Details
                      <svg className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
