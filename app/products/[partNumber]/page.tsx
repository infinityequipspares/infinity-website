import Link from "next/link";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ partNumber: string }>;
}) {
  const { partNumber } = await params;

  const normalize = (value: any) => String(value || "").trim();

  // FIX: Added ': any' to stop TypeScript strict checking for JSON properties
  const product: any = products.find((item: any) => {
    const allPartNumbers = [
      normalize(item.partNumber),
      normalize(item.alternatePartNumbers1),
      normalize(item.alternatePartNumbers2),
      normalize(item.alternatePartNumbers3),
    ].filter(Boolean);

    return (
      allPartNumbers.includes(normalize(partNumber)) ||
      normalize(item.slug) === normalize(partNumber)
    );
  });

  if (!product) notFound();

  const machines = String(product.machines || "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);

  const images =
    product.images &&
    Array.isArray(product.images) &&
    product.images.length > 0
      ? product.images.map((img: string) =>
          img.startsWith("/") ? img : `/images/products/${img}`
        )
      : product.image
      ? [
          product.image.startsWith("/")
            ? product.image
            : `/images/products/${product.image}`,
        ]
      : ["/images/products/no-image.jpg"];

  const partNumbers = [
    product.partNumber,
    product.alternatePartNumbers1,
    product.alternatePartNumbers2,
    product.alternatePartNumbers3,
  ]
    .map((p) => normalize(p))
    .filter(Boolean);

  const displayPartNumbers = [...new Set(partNumbers)].join(" / ");

  const whatsappMessage = `Hello Infinity Equipments And Spares,

I need quotation for:
Part Number: ${displayPartNumbers}
Product: ${product.name}`;

  return (
    <section className="mx-auto max-w-[1350px] px-4 py-6 sm:px-6 lg:py-8">
      {/* Breadcrumbs */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
        <Link href="/" className="transition-colors hover:text-red-600">
          Home
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/products" className="transition-colors hover:text-red-600">
          Products
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900">{product.partNumber}</span>
      </div>

      {/* Product Layout */}
      <div className="grid gap-8 lg:grid-cols-[500px_minmax(0,1fr)] xl:grid-cols-[540px_minmax(0,1fr)] xl:gap-12">
        {/* Left: Gallery */}
        <div className="lg:sticky lg:top-6">
          <ProductGallery images={images} productName={product.name} />
        </div>

        {/* Right: Details */}
        <div className="flex h-full flex-col pt-1">
          {/* Brand Badge */}
          <div className="mb-2">
            <span className="inline-flex items-center rounded-md border border-red-100 bg-red-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-red-600 shadow-sm">
              {product.brand || "Infinity Equipments"}
            </span>
          </div>

          {/* Product Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>

          {/* Premium Info Cards (FIX: grid-cols-2 for Mobile Side-by-Side) */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 transition-colors hover:border-gray-300">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                Part Number
              </p>
              <p className="mt-1.5 break-words text-lg font-black text-red-600">
                {displayPartNumbers}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 transition-colors hover:border-gray-300">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                Category
              </p>
              <p className="mt-1.5 text-lg font-bold text-gray-900">
                {product.category || "-"}
              </p>
            </div>
          </div>

          {/* Machine Tags (FIX: Moved UP above Description) */}
          {machines.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-2 text-sm font-bold text-gray-900">Compatible Equipment</h3>
              <div className="flex flex-wrap gap-2.5">
                {machines.map((machine: string, index: number) => (
                  <span
                    key={`${machine}-${index}`}
                    className="cursor-default rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:border-red-600 hover:text-red-600 shadow-sm"
                  >
                    {machine}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description (FIX: Moved DOWN below Machine Tags) */}
          {product.description && (
            <div className="mt-5">
              <h3 className="mb-1 text-sm font-bold text-gray-900">Description</h3>
              <p className="text-[16px] leading-[1.8] text-gray-700">
                {product.description}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-auto flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center">
            <a
              href={`https://wa.me/919167867476?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg bg-red-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg focus:ring-4 focus:ring-red-600/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="mr-2.5 fill-current"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Get Quote on WhatsApp
            </a>
            <button
              type="button"
              className="flex items-center justify-center rounded-lg border border-red-600 bg-transparent px-8 py-3.5 text-sm font-bold text-red-600 transition-all hover:bg-red-600 hover:text-white focus:ring-4 focus:ring-red-600/20"
            >
              Add to Enquiry
            </button>
          </div>
        </div>
      </div>

      {/* Related Products - Full Width */}
      <div className="mt-10 sm:mt-12">
        <RelatedProducts
          currentPartNumber={String(product.partNumber)}
          category={String(product.category)}
        />
      </div>
    </section>
  );
}
