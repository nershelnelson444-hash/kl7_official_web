import React from 'react';
import { blog } from '../data/cms';
import BlogCard from '../components/BlogCard';

export default function Blog() {
  return (
    <div className="w-full min-h-screen bg-background-main flex flex-col pt-32 pb-36 px-4 md:px-8">
      <div className="max-w-[1480px] w-full mx-auto flex flex-col gap-12">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 max-w-2xl border-b border-grey-main pb-8">
          <h1 className="text-[56px] font-bold leading-none tracking-[-0.03em] text-text-black">
            Journal
          </h1>
          <p className="text-[20px] text-text-black-muted">
            Latest news, insights, and stories from the world of premium automotive excellence.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blog.map((item) => (
            <BlogCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
}
