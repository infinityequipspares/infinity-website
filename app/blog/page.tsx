import Link from 'next/link';
import blogs from '../../data/blogs.json';

export const metadata = {
  title: 'Blog | Infinity Equipments And Spares',
  description: 'Read the latest updates, maintenance tips, and guides for heavy equipment spare parts.',
};

export default function BlogPage() {
  return (
    <section className="antialiased bg-white overflow-hidden min-h-screen">
      
      {/* Container with same max-width as About Page */}
      <div className="mx-auto max-w-[1360px] px-4 pt-12 pb-16 lg:px-6">
        
        {/* 1. Consistent Hero Section */}
        <div className="text-center mb-14 flex flex-col items-center">
          <span className="inline-flex items-center rounded-full bg-red-50 px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.25em] text-red-700 ring-1 ring-inset ring-red-600/20 mb-5 transition-all hover:bg-red-100 cursor-default">
            LATEST INSIGHTS & UPDATES
          </span>
          
          {/* Exact same heading font, sizes, and tracking from About Us */}
          <h1 className="text-[28px] sm:text-4xl lg:text-[54px] xl:text-[60px] font-extrabold text-gray-900 tracking-tight leading-tight lg:whitespace-nowrap mx-auto w-full">
            Our <span className="text-red-600">Blog & Guides</span>
          </h1>
          
          <p className="mt-5 text-[15px] md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed opacity-90">
            Explore our curated articles, expert maintenance tips, and industry insights to keep your heavy machinery running at peak performance.
          </p>
        </div>

        {/* 2. Premium Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link 
              href={`/blog/${blog.slug}`}
              key={blog.id} 
              className="group border border-gray-100 rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgb(220,38,38,0.12)] hover:border-red-200 hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col overflow-hidden"
            >
              {blog.image && (
                <div className="relative overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-52 object-cover border-b border-gray-50 transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle overlay effect on hover */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-3">{blog.date}</p>
                <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-[14px] leading-relaxed mb-6 flex-grow line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <span className="text-red-600 text-[13px] font-bold transition-colors inline-flex items-center mt-auto">
                  Read Article 
                  <svg className="ml-1.5 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}
