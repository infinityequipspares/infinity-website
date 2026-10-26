import { MetadataRoute } from 'next'
import products from '../data/products.json' 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 'www.' add kar diya gaya hai
  const baseUrl = 'https://www.infinityequipspares.com'

  const basePages = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    // Purane machine wale links ko naye equipment wale links se replace kar diya hai
    { url: `${baseUrl}/equipment-rental`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/equipment-sales`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  const productPages = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.slug || product.partNumber}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...basePages, ...productPages]
}
