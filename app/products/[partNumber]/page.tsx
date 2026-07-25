import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";
import ShareButton from "@/components/products/ShareButton";
import AddToEnquiryButton from "@/components/products/AddToEnquiryButton";

// 🌟 DYNAMIC SEO & WHATSAPP PREVIEW METADATA 🌟
export async function generateMetadata({
  params,
}: {
  params: Promise<{ partNumber: string }>;
}): Promise<Metadata> {
  const { partNumber } = await params;
  const normalize = (value: any) => String(value || "").trim();

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

  if (!product) {
    return {
      title: "Product Not Found | Infinity Equipments And Spares",
    };
  }

  const ogImage =
    product.images && Array.isArray(product.images) && product.images.length > 0
      ? product.images[0].startsWith("/")
        ? product.images[0]
        : `/images/products/${product.images[0]}`
      : product.image
      ? product.image.startsWith("/")
        ? product.image
        : `/images/products/${product.image}`
      : "/images/products/no-image.jpg";

  return {
    title: `${product.name} - ${product.partNumber} | Infinity Equipments And Spares`,
    description: product.description || `Buy ${product.name} (${product.partNumber}) for your heavy machinery. Genuine and aftermarket spare parts available.`,
    openGraph: {
      title: `${product.name} | ${product.partNumber}`,
      description: product.description || `Check out this spare part: ${product.name}`,
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

// 🌟 MAIN PRODUCT PAGE DISPLAY 🌟
export default async function ProductPage({
  params,
}: {
  params: Promise<{ partNumber: string }>;
}) {
  const { partNumber } = await params;

  const normalize = (value: any) => String(value || "").trim();

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
    <section className="mx-auto max-w-[1350px] px-4 py-2 sm:px-6 lg:py-3">
      
      {/* Breadcrumbs */}
      <div className="mb-1.5 sm:mb-2 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-gray-500">
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
      <div className="grid gap-2.5 lg:gap-5 lg:grid-cols-[440px_minmax(0,1fr)] xl:grid-cols-[480px_minmax(0,1fr)] xl:gap-8">
        
        {/* Left: Gallery */}
        <div className="lg:sticky lg:top-4">
          <ProductGallery images={images} productName={product.name} />
        </div>

        {/* Right: Details */}
        <div className="flex h-full flex-col pt-0 sm:pt-1">
          {/* Brand Badge */}
          <div className="mb-1 mt-1.5 sm:mt-0">
            <span className="inline-flex items-center rounded-md border border-red-100 bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-red-600 shadow-sm">
              {product.brand || "Infinity Equipments"}
            </span>
          </div>

          {/* Product Title */}
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
            {product.name}
          </h1>

          {/* Premium Info Cards */}
          <div className="mt-2 sm:mt-3 grid grid-cols-2 gap-2 sm:gap-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-2 sm:p-2.5 transition-colors hover:border-gray-300">
              <p className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Part Number
              </p>
              <p className="mt-0.5 sm:mt-1 break-words text-base sm:text-lg font-black text-red-600">
                {displayPartNumbers}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-2 sm:p-2.5 transition-colors hover:border-gray-300">
              <p className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Category
              </p>
              <p className="mt-0.5 sm:mt-1 text-base sm:text-lg font-bold text-gray-900">
                {product.category || "-"}
              </p>
            </div>
          </div>

          {/* Machine Tags */}
          {machines.length > 0 && (
            <div className="mt-2.5 sm:mt-3">
              <h3 className="mb-1 text-[12px] sm:text-[13px] font-bold text-gray-900">Compatible Equipment</h3>
              <div className="flex flex-wrap gap-1.5">
                {machines.map((machine: string, index: number) => (
                  <span
                    key={`${machine}-${index}`}
                    className="cursor-default rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[10.5px] sm:text-[11px] font-semibold text-gray-700 transition-colors hover:border-red-600 hover:text-red-600 shadow-sm"
                  >
                    {machine}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 🌟 INTERACTIVE READ MORE / SHOW LESS DESCRIPTION 🌟 */}
          {product.description && (
            <div className="mt-2.5 sm:mt-3">
              <h3 className="mb-1 text-[12px] sm:text-[13px] font-bold text-gray-900">Description</h3>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer list-none">
                  {/* Collapsed 3 Lines */}
                  <div className="text-[12.5px] sm:text-[13.5px] leading-relaxed text-gray-700 line-clamp-3 group-open:hidden">
                    {product.description}
                  </div>
                  {/* Expanded Full Text */}
                  <div className="text-[12.5px] sm:text-[13.5px] leading-relaxed text-gray-700 hidden group-open:block">
                    {product.description}
                  </div>
                  {/* Toggle Triggers */}
                  <span className="text-red-600 text-[11px] font-bold mt-1 inline-block group-open:hidden">
                    Read more...
                  </span>
                  <span className="text-red-600 text-[11px] font-bold mt-1 hidden group-open:inline-block">
                    Show less
                  </span>
                </summary>
              </details>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-3 sm:mt-auto flex flex-col gap-2 border-t border-gray-100 pt-2.5 sm:flex-row sm:items-center">
            <a
              href={`https://wa.me/919167867476?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 sm:flex-none items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 sm:py-3 text-[13px] font-bold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg focus:ring-4 focus:ring-red-600/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                className="mr-2 fill-current"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Get Quote
            </a>
            
            <div className="flex gap-2">
              <AddToEnquiryButton product={{
                id: product.partNumber || product.name,
                partNumber: product.partNumber,
                name: product.name,
                category: product.category,
                image: images[0]
              }} />
              
              <ShareButton productName={product.name} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <RelatedProducts
          currentPartNumber={String(product.partNumber)}
          category={String(product.category)}
        />
      </div>
    </section>
  );
}
