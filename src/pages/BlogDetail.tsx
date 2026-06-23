import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogItemBySlug } from '../data/cms';
import Button from '../components/Button';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = getBlogItemBySlug(slug || "");

  if (!item) {
    return (
      <div className="w-full min-h-screen bg-background-main flex items-center justify-center pt-24 pb-16 text-center flex-col gap-4">
        <h1 className="text-4xl font-bold">Article Not Found</h1>
        <p className="text-text-black-muted">The article you are looking for does not exist or has been removed.</p>
        <Button asLink to="/blog" variant="primary" className="mt-4">Back to Journal</Button>
      </div>
    );
  }

  const { fieldData } = item;

  return (
    <div className="w-full min-h-screen bg-white flex flex-col pt-32 pb-36 px-4 md:px-8">
      <div className="max-w-[1000px] w-full mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-6 items-center text-center max-w-3xl mx-auto">
          <div className="flex flex-row gap-2 text-text-black-muted font-medium text-sm">
            <Link to="/blog" className="hover:text-black">Journal</Link>
            <span>/</span>
            <span className="text-black">Article</span>
          </div>
          
          <h1 className="text-[48px] md:text-[56px] font-bold leading-tight tracking-[-0.03em] text-text-black">
            {fieldData.vE5dzHwR_?.value}
          </h1>
          
          <p className="text-[20px] md:text-[24px] text-text-black-muted leading-relaxed">
            {fieldData.Kbtb6KX_T?.value}
          </p>
        </div>

        {/* Hero Image */}
        {fieldData.ems8fj_dg?.value && (
          <div className="w-full aspect-video rounded-[24px] overflow-hidden bg-background-mid">
            <img 
              src={fieldData.ems8fj_dg.value} 
              alt={fieldData.vE5dzHwR_?.value} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div 
          className="prose prose-lg max-w-3xl mx-auto prose-h3:text-3xl prose-h3:font-bold prose-h3:tracking-tight prose-h4:text-2xl prose-h4:font-bold prose-h5:text-xl prose-h5:font-bold prose-p:text-text-black-muted prose-p:leading-relaxed prose-a:text-black-main prose-strong:text-text-black"
          dangerouslySetInnerHTML={{ __html: fieldData.zvFxw4BYS?.value || "" }} 
        />

      </div>
    </div>
  );
}
