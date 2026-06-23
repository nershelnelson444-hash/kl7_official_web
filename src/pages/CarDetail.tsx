import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getInventoryItemBySlug } from '../data/cms';
import Carousel from '../components/Carousel';
import Accordion from '../components/Accordion';
import Button from '../components/Button';

export default function CarDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = getInventoryItemBySlug(slug || "");

  if (!item) {
    return (
      <div className="w-full min-h-screen bg-background-main flex items-center justify-center pt-24 pb-16 text-center flex-col gap-4">
        <h1 className="text-4xl font-bold">Vehicle Not Found</h1>
        <p className="text-text-black-muted">The vehicle you are looking for does not exist or has been removed.</p>
        <Button asLink to="/inventory" variant="primary" className="mt-4">Back to Inventory</Button>
      </div>
    );
  }

  const { fieldData } = item;

  // Collect images for carousel
  const images = [];
  if (fieldData.yhmUaSJgn?.value) images.push({ src: fieldData.yhmUaSJgn.value, alt: "Thumbnail" });
  if (fieldData.BVMRK1GFF?.value) images.push({ src: fieldData.BVMRK1GFF.value, alt: "Gallery 1" });
  if (fieldData.GhhqWNVLi?.value) images.push({ src: fieldData.GhhqWNVLi.value, alt: "Gallery 2" });
  if (fieldData.XGFwlZjwx?.value) images.push({ src: fieldData.XGFwlZjwx.value, alt: "Gallery 3" });
  if (fieldData.c7AF1En5j?.value) images.push({ src: fieldData.c7AF1En5j.value, alt: "Gallery 4" });

  // Format Carousel Props
  const carouselProps: any = { autoPlay: true, interval: 4000, borderRadius: 24 };
  images.forEach((img, i) => {
    carouselProps[`image${i + 1}`] = img;
  });

  return (
    <div className="w-full min-h-screen bg-background-main flex flex-col pt-32 pb-36 px-4 md:px-8">
      <div className="max-w-[1480px] w-full mx-auto flex flex-col gap-12">

        {/* Breadcrumb & Title */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 text-text-black-muted font-medium text-sm">
            <Link to="/inventory" className="hover:text-black">Inventory</Link>
            <span>/</span>
            <span className="text-black">{fieldData.FhhhIfKRq?.value}</span>
            <span>/</span>
            <span className="text-black">{fieldData.i251F_cLI?.value}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <h1 className="text-[56px] font-bold leading-none tracking-[-0.03em] text-text-black">
              {fieldData.i251F_cLI?.value}
            </h1>
            <h2 className="text-[48px] font-bold leading-none tracking-[-0.03em] text-text-black">
              ${fieldData.ieALPznS3?.value}
            </h2>
          </div>
        </div>

        {/* Hero Gallery */}
        <div className="w-full h-[50vh] md:h-[70vh] rounded-[24px] overflow-hidden bg-background-mid">
          {images.length > 0 ? (
            <Carousel {...carouselProps} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-extra-muted">No Images Available</div>
          )}
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 mt-8">

          {/* Main Info */}
          <div className="flex-1 flex flex-col gap-12">

            {/* Highlights Bar */}
            <div className="flex flex-row flex-wrap gap-4 bg-white p-6 rounded-2xl border border-grey-main">
              <div className="flex flex-col pr-8 border-r border-grey-main gap-1">
                <span className="text-text-extra-muted text-sm font-bold uppercase">Year</span>
                <span className="font-bold text-xl">{fieldData.AsGqvZIRE?.value}</span>
              </div>
              <div className="flex flex-col pr-8 border-r border-grey-main gap-1">
                <span className="text-text-extra-muted text-sm font-bold uppercase">Mileage</span>
                <span className="font-bold text-xl">{fieldData.FixYCUMxe?.value?.toLocaleString()} mi</span>
              </div>
              <div className="flex flex-col pr-8 border-r border-grey-main gap-1">
                <span className="text-text-extra-muted text-sm font-bold uppercase">Engine</span>
                <span className="font-bold text-xl">{fieldData.b0EvjjHmu?.value}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-text-extra-muted text-sm font-bold uppercase">Transmission</span>
                <span className="font-bold text-xl">{fieldData.DUdYPJIP0?.value}</span>
              </div>
            </div>

            {/* Overview */}
            <Accordion title="Vehicle Overview" defaultOpen={true}>
              <div className="text-[18px] leading-relaxed text-text-black-muted" dangerouslySetInnerHTML={{ __html: fieldData.HKJOw7KI7?.value || "" }} />
            </Accordion>

            {/* Specifications */}
            <Accordion title="Specifications" defaultOpen={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl border border-grey-main overflow-hidden">
                <div className="p-6 border-b md:border-r md:border-b-0 border-grey-main flex justify-between">
                  <span className="text-text-black-muted">Drivetrain</span>
                  <span className="font-bold">{fieldData.VOiJF5nuX?.value}</span>
                </div>
                <div className="p-6 border-b border-grey-main flex justify-between">
                  <span className="text-text-black-muted">Power</span>
                  <span className="font-bold">{fieldData.aoQqPXyK7?.value}</span>
                </div>
                <div className="p-6 border-b md:border-r border-grey-main flex justify-between">
                  <span className="text-text-black-muted">Exterior</span>
                  <span className="font-bold">{fieldData.BpRFrjZwy?.value}</span>
                </div>
                <div className="p-6 border-b border-grey-main flex justify-between">
                  <span className="text-text-black-muted">Interior</span>
                  <span className="font-bold">{fieldData.BsutmQ78B?.value}</span>
                </div>
                <div className="p-6 border-b md:border-r border-grey-main md:border-b-0 flex justify-between">
                  <span className="text-text-black-muted">Body Type</span>
                  <span className="font-bold">{fieldData.gCShDyGRg?.value}</span>
                </div>
                <div className="p-6 flex justify-between">
                  <span className="text-text-black-muted">Fuel Type</span>
                  <span className="font-bold">{fieldData.XKcYqdDj3?.value}</span>
                </div>
              </div>
            </Accordion>

            {/* Features */}
            {fieldData.P8jIPIoSA?.value && (
              <Accordion title="Key Features" defaultOpen={false}>
                <div className="text-[18px] leading-relaxed text-text-black-muted prose max-w-none" dangerouslySetInnerHTML={{ __html: fieldData.P8jIPIoSA.value }} />
              </Accordion>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-[400px]">
            <div className="sticky top-[120px] bg-white rounded-2xl border border-grey-main p-8 flex flex-col gap-8 shadow-sm">
              <div className="flex flex-col gap-2">
                <span className="text-text-black-muted uppercase tracking-wider text-sm font-bold">Interested?</span>
                <h3 className="text-[32px] font-bold leading-none tracking-[-0.03em]">Contact Sales</h3>
              </div>

              <div className="flex flex-col gap-4">
                <Button asLink to="/contact" variant="primary" className="w-full">Enquire Now</Button>
              </div>

              <div className="border-t border-grey-main pt-6 flex flex-col gap-4 text-sm text-text-black-muted">
                <div className="flex justify-between">
                  <span>Reference</span>
                  <span className="font-medium text-black">{fieldData.N5J_P9k5F?.value}</span>
                </div>
                <div className="flex justify-between">
                  <span>VIN</span>
                  <span className="font-medium text-black">{fieldData.nbtxPVxMC?.value}</span>
                </div>
                <div className="flex justify-between">
                  <span>Condition</span>
                  <span className="font-medium text-black">{fieldData.mwpOsOmon?.value}</span>
                </div>
                <div className="flex justify-between">
                  <span>Owners</span>
                  <span className="font-medium text-black">{fieldData.i2W8PQvdS?.value}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
