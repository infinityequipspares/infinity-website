import blogs from '../../../data/blogs.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ShareButton from '../../../components/ShareButton';

// Yeh function WhatsApp aur baaki social media par proper image aur title bhejne ka kaam karega
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  
  if (!blog) return { title: 'Post Not Found' };
  
  return {
    title: `${blog.title} | Infinity Equipments And Spares`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://infinityequipspares.com/blog/${blog.slug}`,
      images: [
        {
          url: `https://infinityequipspares.com${blog.image}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: 'article',
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      
      <Link 
        href="/blog" 
        className="inline-flex items-center text-red-600 hover:text-red-800 font-bold mb-6 transition-colors hover:-translate-x-1 text-sm"
      >
        <span className="mr-2">←</span> Back to Blogs
      </Link>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        
        {blog.image && (
          <div className="w-full h-[250px] md:h-[400px] mb-8 rounded-xl overflow-hidden border border-gray-100">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 leading-tight">{blog.title}</h1>
        <p className="text-gray-500 mb-8 border-b pb-4 font-medium text-sm">Published on {blog.date}</p>
        
        <div className="text-gray-800 leading-relaxed text-base md:text-lg space-y-6">
          {blog.content.split('\n').map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <ShareButton title={blog.title} />

      </div>
    </div>
  );
}
