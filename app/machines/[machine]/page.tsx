import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";
import machines from "@/data/machine models.json";

type Props = {
  params: Promise<{
    machine: string;
  }>;
};

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export default async function MachinePage({ params }: Props) {
  const { machine } = await params;

  const machineData = (machines as any[]).find(
    (item) => slugify(item["Machine Model"]) === machine
  );

  if (!machineData) {
    notFound();
  }

  const compatibleProducts = (products as any[]).filter((product) =>
    product.machines &&
    product.machines
      .split(",")
      .some(
        (m: string) =>
          m.trim().toLowerCase() ===
          String(machineData["Machine Model"]).toLowerCase()
      )
  );

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-8">
        Home / Machines /{" "}
        <span className="text-red-600 font-semibold">
          {machineData["Machine Model"]}
        </span>
      </div>

      <div className="grid lg:grid-cols-[550px_1fr] gap-12">
        <div className="bg-white border rounded-2xl p-8 flex items-center justify-center">
          <div className="text-gray-400 text-sm">No machine image available</div>
        </div>

        <div>
          <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
            {machineData["Brand Name"]}
          </span>

          <h1 className="text-4xl font-bold mt-4">
            {machineData["Machine Model"]}
          </h1>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-5">Specifications</h2>
            <div className="border rounded-xl overflow-hidden">
              <div className="grid grid-cols-2 border-b">
                <div className="bg-gray-50 p-4 font-semibold">Brand Name</div>
                <div className="p-4">{machineData["Brand Name"]}</div>
              </div>
              <div className="grid grid-cols-2 border-b">
                <div className="bg-gray-50 p-4 font-semibold">Machine Model</div>
                <div className="p-4">{machineData["Machine Model"]}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="bg-gray-50 p-4 font-semibold">Machine Type</div>
                <div className="p-4">{machineData["Machine Type"]}</div>
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/919167867476?text=Hello Infinity Equipments And Spares, I need spare parts for ${machineData["Machine Model"]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-8 bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-lg font-semibold transition"
          >
            Get Spare Parts
          </a>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Compatible Spare Parts</h2>

        {compatibleProducts.length === 0 ? (
          <p className="text-gray-500">Spare parts will be updated soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {compatibleProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.partNumber}`}
                className="border rounded-xl overflow-hidden hover:border-red-600 hover:shadow-lg transition"
              >
                <div className="h-52 bg-white flex items-center justify-center p-6">
                  <Image
                    src={product.image || "/images/products/no-image.jpg"}
                    alt={product.name || "Product"}
                    width={220}
                    height={220}
                    className="object-contain max-h-44"
                  />
                </div>
                <div className="p-5">
                  <p className="text-red-600 text-sm font-semibold">
                    {product.brand}
                  </p>
                  <h3 className="font-bold mt-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-3">
                    {product.partNumber}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
