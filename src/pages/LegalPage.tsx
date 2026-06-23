import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLegalItemBySlug } from '../data/cms';
import Button from '../components/Button';

export default function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = getLegalItemBySlug(slug || "");

  if (!item) {
    return (
      <div className="w-full min-h-screen bg-background-main flex items-center justify-center pt-24 pb-16 text-center flex-col gap-4">
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-text-black-muted">The document you are looking for does not exist or has been removed.</p>
        <Button asLink to="/" variant="primary" className="mt-4">Return Home</Button>
      </div>
    );
  }

  const { fieldData } = item;

  // Don't render draft pages like the 'READ THIS' note
  if (item.draft) {
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col pt-32 pb-36 px-4 md:px-8">
      <div className="max-w-[800px] w-full mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-grey-main pb-8">
          <h1 className="text-[48px] font-bold leading-tight tracking-[-0.03em] text-text-black">
            {fieldData.L_A48SMLq?.value}
          </h1>
          <p className="text-text-black-muted font-medium">
            Last Updated: {new Date(fieldData.HLi4cRCgY?.value || "").toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none prose-h4:text-2xl prose-h4:font-bold prose-p:text-text-black-muted prose-p:leading-relaxed prose-li:text-text-black-muted prose-a:text-black-main prose-strong:text-text-black"
          dangerouslySetInnerHTML={{ __html: fieldData.WM5Ns79EH?.value || "" }} 
        />

      </div>
    </div>
  );
}
