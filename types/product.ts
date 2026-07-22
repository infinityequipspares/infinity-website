export interface Product {
  id: number;

  partNumber: string;

  alternatePartNumbers?: string;

  brand: string;

  name: string;

  category: string;

  machines: string;

  type: string;

  stock: string;

  image: string;

  description: string;

  seoKeywords: string;

  slug: string;

  brandSlug?: string;

  featured?: boolean;

  images?: string[];

  features?: string[];

  applications?: string[];

  relatedProducts?: string[];

  cataloguePdf?: string;

  video?: string;

  specifications?: {
    [key: string]: string;
  };
}