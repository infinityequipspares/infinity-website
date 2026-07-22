import Link from "next/link";

const brands = [
  "JLG",
  "Genie",
  "Haulotte",
  "SANY",
  "XCMG",
  "JCB",
  "LiuGong",
  "Zoomlion",
];

export default function BrandsPage() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-12">

      <div className="text-center mb-14">

        <p className="text-red-600 uppercase tracking-[4px] font-semibold">
          Brands
        </p>

        <h1 className="text-5xl font-bold mt-3">
          Browse By Brand
        </h1>

        <p className="text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
          We supply genuine and premium aftermarket spare parts for the
          world's leading Aerial Work Platform, Telehandler, Crane and
          Material Handling Equipment manufacturers.
        </p>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

        {brands.map((brand) => (

          <Link
            key={brand}
            href={`/brands/${brand.toLowerCase()}`}
            className="bg-white border rounded-2xl p-8 hover:border-red-600 hover:shadow-xl transition text-center"
          >

            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">

              <span className="text-red-600 text-2xl font-bold">
                {brand.charAt(0)}
              </span>

            </div>

            <h2 className="text-xl font-bold mt-5">
              {brand}
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              View Spare Parts
            </p>

          </Link>

        ))}

      </div>

    </section>
  );
}