import Link from "next/link";
import Image from "next/image";
import machinesData from "@/json/machines.json";
import { Machine } from "@/types/machine";

const machines = machinesData as Machine[];

export default function MachinesPage() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-12">
      <div className="text-center mb-14">
        <p className="text-red-600 uppercase tracking-[4px] font-semibold">
          Machine Models
        </p>

        <h1 className="text-5xl font-bold mt-3">
          Browse Machines
        </h1>

        <p className="text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
          Find spare parts by machine model. Select your Boom Lift,
          Scissor Lift, Telehandler or Vertical Lift to view all
          compatible spare parts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {machines.map((machine) => (
          <Link
            key={machine.id}
            href={`/machines/${machine.slug}`}
            className="bg-white border rounded-2xl overflow-hidden hover:border-red-600 hover:shadow-xl transition"
          >
            <div className="h-52 bg-gray-50 flex items-center justify-center">
              <Image
                src={machine.image}
                alt={machine.name}
                width={250}
                height={180}
                className="object-contain max-h-44"
              />
            </div>

            <div className="p-6">
              <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                {machine.brand}
              </span>

              <h2 className="text-xl font-bold mt-4">
                {machine.name}
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                {machine.category}
              </p>

              <p className="text-gray-600 text-sm mt-4 line-clamp-3">
                {machine.description}
              </p>

              <div className="mt-5 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Compatible Parts
                </span>

                <span className="font-bold text-red-600">
                  {machine.compatibleProducts.length}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}