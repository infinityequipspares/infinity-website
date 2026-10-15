import blogs from '../../../data/blogs.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return { title: 'Post Not Found' };
  return {
    title: `${blog.title} | Infinity Equipments And Spares`,
    description: blog.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      
      {/* Back Button */}
      <Link 
        href="/blog" 
        className="inline-flex items-center text-red-600 hover:text-red-800 font-bold mb-8 transition-colors hover:-translate-x-1"
      >
        <span className="mr-2">←</span> Back to Blogs
      </Link>

      {/* Blog Content */}
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">{blog.title}</h1>
        <p className="text-gray-500 mb-10 border-b pb-6 font-medium">Published on {blog.date}</p>
        
        <div className="text-gray-800 leading-relaxed text-lg md:text-xl space-y-8">
          {blog.content.split('\n').map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

    </div>
  );
}
