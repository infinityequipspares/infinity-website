import Link from 'next/link';
import blogs from '../../data/blogs.json';

export const metadata = {
  title: 'Blog | Infinity Equipments And Spares',
  description: 'Read the latest updates, maintenance tips, and guides for heavy equipment spare parts.',
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      
      <div className="text-center mb-12 flex flex-col items-center">
        <span className="inline-block px-4 py-1.5 mb-4 text-[11px] font-extrabold tracking-widest text-red-700 uppercase bg-red-50 border border-red-100 rounded-full">
          LATEST INSIGHTS & UPDATES
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Our <span className="text-red-600">Blog & Guides</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-medium">
          Explore our curated articles, expert maintenance tips, and industry insights to keep your heavy machinery running at peak performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link 
            href={`/blog/${blog.slug}`}
            key={blog.id} 
            className="group border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:shadow-red-600/20 hover:border-red-200 hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col overflow-hidden"
          >
            {blog.image && (
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-44 object-cover border-b border-gray-100"
              />
            )}
            
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-gray-500 text-xs mb-3">{blog.date}</p>
              <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                {blog.excerpt}
              </p>
              
              <span className="text-blue-600 text-sm group-hover:text-red-600 font-bold transition-colors inline-flex items-center mt-auto">
                Read More <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
