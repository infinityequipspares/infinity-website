import brands from "@/data/brands.json";

// Yeh map exactly unhi names se match karta hai jo aapke folder mein hain
// Isse baaki kisi code ya json file par koi asar nahi padega
const brandImageMap: { [key: string]: string } = {
  jlg: "JLG.png",
  genie: "Genie.png",
  haulotte: "Haulotte.png",
  sany: "Sany.png",
  xcmg: "XCMG.png",
  jcb: "JCB.png",
  liugong: "Liugong.png",
  zoomlion: "Zoomlion.png",
};

export default function BrandsSection() {
  return (
    // Padding py-16 md:py-24 se kam karke py-10 md:py-16 kar di gayi hai
    <section className="py-10 md:py-16 bg-white z-0 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section - Bottom margin mb-16 se kam karke mb-10/12 kar diya hai */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 rounded-md border border-red-200/60 bg-red-50/80 backdrop-blur-sm shadow-sm">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-red-700">
              Trusted Global Brands
            </span>
          </div>

          <h2 className="mt-4 md:mt-5 text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold text-slate-900 leading-[1.25] tracking-tight">
            Our Brands
          </h2>

          <p className="mt-4 md:mt-5 text-lg md:text-xl font-medium text-slate-700 max-w-3xl mx-auto">
            Delivering genuine OEM and premium aftermarket parts for the industry's most trusted machinery brands.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {brands.map((brand: any, index: number) => {
            // Yahan hum Vercel ko strict file name pass kar rahe hain taaki image na toote
            const brandKey = brand["Brand Name"].toLowerCase();
            const exactFileName = brandImageMap[brandKey] || `${brand["Brand Name"]}.png`;

            return (
              <div
                key={index}
                className="group relative flex h-28 md:h-36 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 md:px-8 md:py-6 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-red-200 hover:shadow-xl overflow-hidden"
              >
                <img
                  src={`/images/brands/${exactFileName}`}
                  alt={`${brand["Brand Name"]} aftermarket parts`}
                  className="h-full w-full object-contain select-none transition-all duration-500 ease-out md:filter md:grayscale md:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
