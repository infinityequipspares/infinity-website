import Link from 'next/link';
import blogs from '../../data/blogs.json';

export const metadata = {
  title: 'Blog | Infinity Equipments And Spares',
  description: 'Read the latest updates, maintenance tips, and guides for heavy equipment spare parts.',
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      
      {/* Premium Heading Section */}
      <div className="text-center mb-16 flex flex-col items-center">
        <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-extrabold tracking-widest text-red-700 uppercase bg-red-50 border border-red-100 rounded-full">
          LATEST INSIGHTS & UPDATES
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
          Our <span className="text-red-600">Blog & Guides</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-medium">
          Explore our curated articles, expert maintenance tips, and industry insights to keep your heavy machinery running at peak performance.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div 
            key={blog.id} 
            className="group border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl hover:shadow-red-600/20 hover:border-red-200 hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-red-600 transition-colors">{blog.title}</h2>
            <p className="text-gray-500 text-sm mb-4">{blog.date}</p>
            <p className="text-gray-700 mb-6 flex-grow">{blog.excerpt}</p>
            <Link href={`/blog/${blog.slug}`} className="text-blue-600 group-hover:text-red-600 font-bold transition-colors inline-flex items-center">
              Read More <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
