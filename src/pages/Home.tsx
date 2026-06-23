import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedInventory, getFeaturedBlog } from '../data/cms';
import CarsCard from '../components/CarsCard';
import TestimonialCard from '../components/TestimonialCard';
import CountUp from '../components/CountUp';
import TeamMemberCard from '../components/TeamMemberCard';
import BlogCard from '../components/BlogCard';
import FaqAccordion from '../components/FaqAccordion';
import FadeIn from '../components/FadeIn';
import StaggerContainer, { StaggerItem } from '../components/StaggerContainer';
import { motion } from 'framer-motion';
import Button from '../components/Button';

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-white overflow-hidden pb-36">

      {/* ─── HERO SECTION ─────────────────────────────── */}
      <section className="w-full h-screen bg-background-main overflow-hidden flex flex-col pt-[104px] px-2 pb-2">
        <div className="w-full h-full bg-black-main rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-8 lg:p-16">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://framerusercontent.com/images/QT1UEFL8QJPutAvTj9StqpyLY.webp"
              alt="KL7 Garage Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black-50" />
          </div>

          {/* Content */}
          <div className="w-full h-full max-w-[1480px] z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* Left */}
            <div className="flex flex-col justify-between h-full max-w-3xl py-8 gap-8">
              <FadeIn direction="up" delay={0.2}>
                <h1 className="text-text-white font-bold text-[56px] leading-tight tracking-[-0.03em]">
                  Kuala Lumpur's Premier Bike Showroom
                </h1>
              </FadeIn>
              <FadeIn direction="up" delay={0.4} className="mt-auto">
                <div className="flex flex-col gap-6">
                  <p className="text-text-white font-medium text-base max-w-[480px]">
                    Curated pre-owned motorcycles from the world's most sought-after brands since 2015
                  </p>
                  <Button asLink to="/inventory" variant="inverse">
                    Browse Bikes
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-between items-end h-full py-8">
              <FadeIn direction="left" delay={0.4}>
                <div className="hero-search-container bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 text-white w-[206px]">
                  <input type="text" placeholder="Search bikes..." className="hero-search-bar bg-transparent outline-none text-white placeholder-white/70" />
                </div>
              </FadeIn>

              <StaggerContainer delayChildren={0.6} staggerChildren={0.2} className="flex flex-col gap-4 mt-auto items-end">
                <StaggerItem>
                  <div className="flex flex-col items-end">
                    <span className="text-text-white font-bold text-[48px] leading-none">500+</span>
                    <span className="text-text-white-muted uppercase text-sm tracking-wider">Bikes Sold</span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex flex-col items-end">
                    <span className="text-text-white font-bold text-[48px] leading-none">RM 40M</span>
                    <span className="text-text-white-muted uppercase text-sm tracking-wider">Sales Value</span>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FEATURED BIKES SECTION ───────────────────── */}
      <section className="w-full bg-background-main py-20 flex flex-col items-center">
        <div className="max-w-[1480px] w-full px-8 flex flex-col gap-10">
          <FadeIn direction="up">
            <div className="flex flex-row justify-between items-end w-full">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-bold uppercase tracking-wider text-text-extra-muted">Featured Bikes</span>
                <h2 className="text-[48px] font-bold leading-tight tracking-[-0.03em]">Performance Meets Prestige</h2>
              </div>
              <div className="flex flex-col items-end gap-6">
                <Button asLink to="/inventory" variant="primary">
                  Browse Bikes
                </Button>
                <p className="text-text-black-muted max-w-[480px] text-right">
                  Handpicked from our collection. Each one represents the pinnacle of motorcycling excellence.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Grid */}
          <StaggerContainer delayChildren={0.2} staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
            {getFeaturedInventory().slice(0, 3).map((item) => (
              <StaggerItem key={item.id}>
                <CarsCard item={item} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── SERVICES SECTION ─────────────────────────── */}
      <section className="w-full bg-background-main py-20 flex flex-col items-center">
        <div className="max-w-[1480px] w-full px-8 flex flex-col gap-20">

          <FadeIn direction="up">
            <div className="flex flex-row justify-between items-start w-full">
              <div className="flex flex-col gap-4 max-w-[550px]">
                <div className="bg-white border border-grey-main rounded-full px-4 py-2 w-fit">
                  <span className="text-base font-medium uppercase tracking-wider">SERVICES</span>
                </div>
                <h2 className="text-[48px] font-bold leading-tight tracking-[-0.03em] max-w-[480px]">
                  We're Way More Than a Showroom
                </h2>
              </div>
              <div className="flex flex-col gap-6 items-start self-end max-w-[480px]">
                <p className="text-text-black font-medium text-base">
                  Premium bikes deserve premium service—and that's exactly what you'll get.
                </p>
                <Button asLink to="/inventory" variant="primary">
                  Browse Bikes
                </Button>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer delayChildren={0.2} staggerChildren={0.15} className="flex flex-col lg:flex-row gap-6 h-[800px]">
            {/* Left Column */}
            <div className="flex flex-col gap-6 w-full lg:w-1/2 h-full">
              <StaggerItem className="w-full h-1/2">
                <div className="w-full h-full relative rounded-[12px] overflow-hidden p-5 flex flex-col justify-end group cursor-pointer">
                  <div className="absolute inset-0 z-0">
                    <img src="https://framerusercontent.com/images/ePT9kuMpmdFFmnCqOllNvONQys.webp" alt="Inspection" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black-50 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-white font-medium text-2xl z-10 transition-transform duration-300 group-hover:-translate-y-1">Full Technical Inspection</h3>
                </div>
              </StaggerItem>
              <StaggerItem className="w-full h-1/2">
                <div className="w-full h-full relative rounded-[16px] overflow-hidden p-5 flex flex-col justify-end group cursor-pointer">
                  <div className="absolute inset-0 z-0">
                    <img src="https://framerusercontent.com/images/WyhRtolqAtg9ZPTE92NjlKjv0.webp" alt="Detailing" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black-50 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-white font-medium text-2xl z-10 transition-transform duration-300 group-hover:-translate-y-1">Professional Detailing</h3>
                </div>
              </StaggerItem>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 w-full lg:w-1/2 h-full">
              <StaggerItem className="w-full h-[40%]">
                <div className="w-full h-full bg-black-main rounded-[16px] relative overflow-hidden p-5 flex flex-col justify-end items-center group cursor-pointer">
                  <div className="absolute inset-0 z-0 flex justify-center items-center opacity-30">
                    <div className="w-[350px] h-[350px] rounded-full border border-white/20 absolute -bottom-[166px] -left-[79px]" />
                  </div>
                  <h3 className="text-white font-medium text-2xl z-10 transition-transform duration-300 group-hover:-translate-y-1">Verified History & Trusted Brand</h3>
                </div>
              </StaggerItem>

              <StaggerItem className="w-full h-[30%]">
                <div className="w-full h-full relative rounded-[16px] overflow-hidden p-5 flex flex-col justify-end items-center group cursor-pointer">
                  <div className="absolute inset-0 z-0">
                    <img src="https://framerusercontent.com/images/TcgsebcRv5iSa7dvNbl6PMQECA.webp" alt="Warranty" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black-50 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-white font-medium text-2xl z-10 transition-transform duration-300 group-hover:-translate-y-1">Warranty Support</h3>
                </div>
              </StaggerItem>

              <StaggerItem className="w-full h-[30%]">
                <div className="w-full h-full relative rounded-[16px] overflow-hidden p-5 flex flex-row justify-center items-end group cursor-pointer">
                  <div className="absolute inset-0 z-0">
                    <img src="https://framerusercontent.com/images/DKYMPBTwzZsENhq8F0kqQLKshtw.jpg" alt="Financing" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black-50 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-white font-medium text-2xl z-10 transition-transform duration-300 group-hover:-translate-y-1">Loan & Financing</h3>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ─── TESTIMONIALS SECTION ─────────────────────── */}
      <section className="w-full bg-background-main py-20 flex flex-col items-center">
        <div className="max-w-[1480px] w-full px-8 flex flex-col gap-20">

          <FadeIn direction="up">
            <div className="flex flex-row justify-between items-start w-full">
              <div className="flex flex-col gap-4 max-w-[550px]">
                <div className="bg-white border border-grey-main rounded-full px-4 py-2 w-fit">
                  <span className="text-base font-medium uppercase tracking-wider">TESTIMONIALS</span>
                </div>
                <h2 className="text-[48px] font-bold leading-tight tracking-[-0.03em] max-w-[480px]">
                  Great Numbers, Happy Riders.
                </h2>
              </div>
              <div className="flex flex-col gap-6 items-start self-end max-w-[480px]">
                <p className="text-text-black font-medium text-base">
                  Real experiences from riders who found their dream bike and trusted us completely.
                </p>
                <Button asLink to="/inventory" variant="primary">
                  Browse Bikes
                </Button>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer delayChildren={0.2} staggerChildren={0.1} className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Testimonials Grid */}
            <div className="w-full lg:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-6">
              <StaggerItem><TestimonialCard
                name="Amir Razali"
                quote="Outstanding service from start to finish, truly professional team and exceptional bike quality throughout"
                vehicle="Ducati Panigale V4 Owner"
              /></StaggerItem>
              <StaggerItem><TestimonialCard
                name="Haziq Farhan"
                quote="Transparent pricing, honest advice, and zero pressure—exactly what buying a pre-owned bike should be"
                vehicle="Honda CBR1000RR Owner"
              /></StaggerItem>
              <StaggerItem><TestimonialCard
                name="Syafiq Danial"
                quote="Incredible selection of pristine bikes, each one meticulously inspected and beautifully presented to perfection"
                vehicle="Kawasaki Ninja ZX-10R Owner"
              /></StaggerItem>
              <StaggerItem><TestimonialCard
                name="Daniel Lim"
                quote="Knowledgeable team who genuinely care, made finding my dream ride effortless and enjoyable"
                vehicle="BMW S1000RR Owner"
              /></StaggerItem>
            </div>

            {/* Right Column - Metrics */}
            <div className="w-full lg:w-[35%] flex flex-col gap-6">
              <StaggerItem className="h-[180px]">
                <div className="bg-background-mid rounded-2xl p-6 flex flex-col justify-between h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <CountUp targetNumber={10} duration={2} fontSize={58} lineHeight={58} color="#000000" fontWeight="500" />
                  <span className="text-text-black font-medium text-base">Years of Experience</span>
                </div>
              </StaggerItem>

              <StaggerItem className="h-[240px]">
                <div className="bg-background-mid rounded-2xl p-6 flex flex-col justify-between h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <CountUp targetNumber={500} duration={2.5} fontSize={58} lineHeight={58} color="#000000" fontWeight="500" />
                  <span className="text-text-black font-medium text-base">Happy Riders</span>
                </div>
              </StaggerItem>

              <StaggerItem className="h-[120px]">
                <div className="bg-background-main rounded-none flex flex-col justify-end items-start h-full gap-2 pt-6">
                  <div className="flex gap-2 items-center bg-white border border-grey-main rounded-full px-4 py-2 hover:bg-background-mid cursor-pointer transition-colors">
                    <span className="font-bold text-black">Google Rating 5.0</span>
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                  <span className="text-sm font-medium text-text-black">From +1000 reviews</span>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ─── TEAM SECTION ─────────────────────────────── */}
      <section className="w-full bg-background-main py-20 flex flex-col items-center">
        <div className="max-w-[1480px] w-full px-8 flex flex-col gap-20">
          <FadeIn direction="up">
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center w-full gap-20">

              {/* Left - Team Members */}
              <StaggerContainer delayChildren={0.2} staggerChildren={0.15} className="flex flex-col md:flex-row w-full lg:w-[60%] gap-6 items-center md:items-end">
                <StaggerItem className="w-full md:w-1/2">
                  <TeamMemberCard
                    name="Farid Hasan"
                    role="Sales Director"
                    height="324px"
                    image="https://framerusercontent.com/images/1yWlVlCg6wQ01Y2X6qA0K0xG0E.webp"
                  />
                </StaggerItem>
                <StaggerItem className="w-full md:w-1/2">
                  <TeamMemberCard
                    name="Nurul Ain"
                    role="Founder & CEO"
                    height="424px"
                    image="https://framerusercontent.com/images/xH1B6Z4I9v3R8fK7M2W5B9T4.webp"
                  />
                </StaggerItem>
              </StaggerContainer>

              {/* Right - Content */}
              <div className="flex flex-col gap-6 w-full lg:w-[40%] self-start">
                <div className="bg-white border border-grey-main rounded-full px-4 py-2 w-fit">
                  <span className="text-base font-medium uppercase tracking-wider">OUR TEAM</span>
                </div>
                <h2 className="text-[48px] font-bold leading-tight tracking-[-0.03em] max-w-[480px]">
                  Meet The Experts.
                </h2>
                <p className="text-text-black font-medium text-base mt-2">
                  Passionate about bikes, precision, and exceptional service. Meet the people who make it happen.
                </p>
                <Button asLink to="/about-us" variant="primary" className="mt-2">
                  Learn More
                </Button>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── BLOG SECTION ─────────────────────────────── */}
      <section className="w-full bg-background-main py-20 flex flex-col items-center">
        <div className="max-w-[1480px] w-full px-8 flex flex-col gap-20">
          <FadeIn direction="up">
            <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-20">

              {/* Left Content */}
              <div className="flex flex-col gap-6 w-full lg:w-[40%]">
                <div className="bg-white border border-grey-main rounded-full px-4 py-2 w-fit">
                  <span className="text-base font-medium uppercase tracking-wider">BLOG</span>
                </div>
                <h2 className="text-[48px] font-bold leading-tight tracking-[-0.03em] max-w-[480px]">
                  Insights & Expertise Now
                </h2>
                <p className="text-text-black font-medium text-base mt-2">
                  Market trends, buying guides, and insider knowledge to help you make smarter decisions.
                </p>
                <Button asLink to="/journal" variant="primary" className="mt-2">
                  View All
                </Button>
              </div>

              {/* Right Content - Blog Grid */}
              <StaggerContainer delayChildren={0.2} staggerChildren={0.15} className="w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-6">
                {getFeaturedBlog().slice(0, 2).map((post) => (
                  <StaggerItem key={post.id} className="min-h-[384px]">
                    <BlogCard item={post} />
                  </StaggerItem>
                ))}
              </StaggerContainer>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────── */}
      <section className="w-full bg-background-main py-10 flex flex-col items-center">
        <div className="max-w-[1480px] w-full px-8 relative flex flex-col justify-center items-start min-h-[400px] rounded-[24px] overflow-hidden p-16">
          <div className="absolute inset-0 z-0">
            <img src="https://framerusercontent.com/images/Uo8cUllDqyVPZ0KESUwPobILA.png" alt="CTA Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <FadeIn direction="up" fullWidth>
            <div className="relative z-10 flex flex-col gap-6 max-w-[50%]">
              <h2 className="text-[48px] font-bold leading-tight tracking-[-0.03em] text-white">
                Ready to Find Your Dream Bike?
              </h2>
              <p className="text-white/90 font-medium text-base">
                Visit our showroom and feel what true performance means. Every bike available for immediate viewing.
              </p>
              <Button asLink to="/contact" variant="inverse" className="mt-2">
                Visit Showroom
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FAQ SECTION ──────────────────────────────── */}
      <section className="w-full bg-background-main py-20 flex flex-col items-center">
        <div className="max-w-[1480px] w-full px-8 flex flex-col lg:flex-row gap-20">

          <FadeIn direction="up">
            <div className="flex flex-col gap-6 w-full lg:w-1/2">
              <div className="bg-white border border-grey-main rounded-full px-4 py-2 w-fit">
                <span className="text-base font-medium uppercase tracking-wider">FAQ</span>
              </div>
              <h2 className="text-[48px] font-bold leading-tight tracking-[-0.03em] max-w-[480px]">
                Everything You Need Here
              </h2>
              <p className="text-text-black font-medium text-base mt-2">
                Everything you need to know about financing, warranties, and buying a bike with confidence.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2} className="w-full lg:w-1/2">
            <FaqAccordion items={[
              { question: "What loan options do you offer?", answer: "We work with a wide network of banks and lenders to offer flexible hire purchase plans—whether you're buying a sports, adventure, or classic bike. Our finance team will walk you through competitive rates and payment plans tailored to your budget. Pre-approval is available within the same day." },
              { question: "Can I trade in my current bike?", answer: "Absolutely. We accept trade-ins on all makes and models. Bring your bike in for a free, no-obligation appraisal, and we'll apply its value directly toward your next purchase." },
              { question: "Do your used bikes come with a warranty?", answer: "All bikes in our inventory go through a rigorous multi-point inspection and come with a limited warranty. Extended protection plans are also available for added peace of mind." },
              { question: "How do I schedule a viewing?", answer: "You can book a viewing directly on our website or call our showroom. We're open 7 days a week and happy to accommodate same-day appointments." },
              { question: "Do you offer delivery?", answer: "Yes. We offer delivery within the Klang Valley. Once your paperwork is finalised, we'll coordinate a convenient time to bring your bike directly to you." },
            ]} />
          </FadeIn>

        </div>
      </section>

    </div>
  );
}
