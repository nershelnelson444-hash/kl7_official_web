import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

import TeamMemberCard from '../components/TeamMemberCard';
import FaqAccordion from '../components/FaqAccordion';
import CountUp from '../components/CountUp';
import ScrollReveal from '../components/ScrollReveal';
import { springs } from '../utils/motionTokens';

export default function AboutUs() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 50]);

  return (
    <div className="flex flex-col font-sans overflow-x-hidden relative pt-20">
      {/* AMBIENT LAYER */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 bg-[#F2F2F2]"
        style={{ y: backgroundY }}
      />

      {/* ─── 1. HERO SECTION ──────────────────────────── */}
      <section className="pt-[100px] pb-24 px-8 max-w-[1480px] mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal offsetStart="start 95%" offsetEnd="start 65%" distance={50}>
            <h1 className="text-[56px] font-bold tracking-tight text-black leading-[1.05] mb-6">
              KL7 GARAGE — KUALA LUMPUR'S PREMIER BIKE SHOWROOM
            </h1>
            <p className="text-[#4D4D4D] text-[18px] max-w-md mb-8">
              Curated pre-owned motorcycles from the world's most prestigious brands, delivered with integrity and expertise since 2015.
            </p>
            <Button variant="primary">Meet our team</Button>
          </ScrollReveal>

          <div className="flex flex-col gap-8 lg:ml-12 relative pt-8">
            <ScrollReveal staggerIndex={1} offsetStart="start 95%" offsetEnd="start 60%">
              <motion.div
                className="bg-white p-8 rounded-[24px] border border-[rgba(230,230,230,0.5)] shadow-sm"
                whileHover={{ y: -2, transition: springs.hover }}
              >
                <CountUp targetNumber={350} font="Space Grotesk" fontSize={58} suffix="M+" />
                <p className="text-[#808080] uppercase text-sm tracking-widest mt-1 font-medium">In Financing</p>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal staggerIndex={2} offsetStart="start 95%" offsetEnd="start 60%">
              <motion.div
                className="bg-white p-8 rounded-[24px] border border-[rgba(230,230,230,0.5)] shadow-sm translate-x-4 lg:translate-x-8"
                whileHover={{ y: -2, transition: springs.hover }}
              >
                <CountUp targetNumber={500} font="Space Grotesk" fontSize={58} suffix="+" />
                <p className="text-[#808080] uppercase text-sm tracking-widest mt-1 font-medium">Riders Served</p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── 2. MISSION SECTION ───────────────────────── */}
      <section className="py-[110px] px-8 max-w-[1480px] mx-auto w-full z-10 relative">
        <ScrollReveal offsetStart="start 90%" offsetEnd="start 55%">
          <div className="flex flex-col gap-4 mb-12">
            <span className="text-[14px] text-[#808080] uppercase tracking-widest font-bold">THE MISSION</span>
            <h2 className="text-[48px] font-bold text-black leading-[1.1]">A Showroom Built on a Philosophy</h2>
          </div>
          <blockquote className="text-[22px] font-medium text-[#4D4D4D] leading-relaxed max-w-3xl border-l-4 border-black pl-8 italic">
            "You hold the power here. No pressure, no games, no outdated tactics. Just transparent pricing, expert guidance, and respect for your time and intelligence."
            <footer className="mt-4 text-base font-bold text-black not-italic">— Our Promise to You</footer>
          </blockquote>
        </ScrollReveal>
      </section>

      {/* ─── 3. STATS SECTION ─────────────────────────── */}
      <section className="py-[110px] px-8 max-w-[1480px] mx-auto w-full z-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ScrollReveal staggerIndex={0}>
            <motion.div className="bg-white p-8 rounded-tr-3xl rounded-bl-3xl border border-grey-main translate-y-2">
              <CountUp targetNumber={10} fontSize={48} suffix="+" />
              <p className="text-[13px] text-[#808080] mt-2 uppercase font-medium tracking-wide">Years In Business</p>
            </motion.div>
          </ScrollReveal>
          <ScrollReveal staggerIndex={1}>
            <motion.div className="bg-white p-8 rounded-tr-3xl rounded-bl-3xl border border-grey-main -translate-y-2">
              <CountUp targetNumber={98} fontSize={48} suffix="%" />
              <p className="text-[13px] text-[#808080] mt-2 uppercase font-medium tracking-wide">Score Satisfaction</p>
            </motion.div>
          </ScrollReveal>
          <ScrollReveal staggerIndex={2}>
            <motion.div className="bg-white p-8 rounded-tr-3xl rounded-bl-3xl border border-grey-main translate-y-3">
              <CountUp targetNumber={30} fontSize={48} suffix="+" />
              <p className="text-[13px] text-[#808080] mt-2 uppercase font-medium tracking-wide">Brands Available</p>
            </motion.div>
          </ScrollReveal>
          <ScrollReveal staggerIndex={3}>
            <motion.div className="bg-white p-8 rounded-tr-3xl rounded-bl-3xl border border-grey-main -translate-y-1">
              <CountUp targetNumber={500} fontSize={48} suffix="+" />
              <p className="text-[13px] text-[#808080] mt-2 uppercase font-medium tracking-wide">Happy Riders</p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 4. TEAM SECTION ──────────────────────────── */}
      <section className="py-[130px] px-8 max-w-[1480px] mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
            <ScrollReveal staggerIndex={0}><TeamMemberCard name="Nurul Ain" role="Founder & CEO" height="400px" image="https://framerusercontent.com/images/1yWlVlCg6wQ01Y2X6qA0K0xG0E.webp" /></ScrollReveal>
            <ScrollReveal staggerIndex={1}><div className="pt-12"><TeamMemberCard name="Farid Hasan" role="Sales Director" height="360px" image="https://framerusercontent.com/images/xH1B6Z4I9v3R8fK7M2W5B9T4.webp" /></div></ScrollReveal>
            <ScrollReveal staggerIndex={2}><TeamMemberCard name="Arif Zulkifli" role="Finance Manager" height="380px" image="https://framerusercontent.com/images/1yWlVlCg6wQ01Y2X6qA0K0xG0E.webp" /></ScrollReveal>
            <ScrollReveal staggerIndex={3}><div className="pt-8"><TeamMemberCard name="Izzaty Rashid" role="Service Advisor" height="400px" image="https://framerusercontent.com/images/xH1B6Z4I9v3R8fK7M2W5B9T4.webp" /></div></ScrollReveal>
          </div>

          <div className="flex flex-col justify-center sticky top-32 self-start">
            <ScrollReveal offsetStart="start 80%" offsetEnd="start 50%">
              <h2 className="text-[14px] text-[#808080] uppercase tracking-widest font-bold mb-3">THE TEAM</h2>
              <h3 className="text-[48px] font-bold text-black leading-[1.1] mb-8">A team of experts, tailored for you.</h3>
              <p className="text-[#4D4D4D] text-base font-medium mb-8">
                Passionate about bikes, precision, and exceptional service. Meet the people who make it happen.
              </p>
              <Button asLink to="/contact" variant="primary">Get in Touch</Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── 5. SERVICES SECTION ──────────────────────── */}
      <section className="py-[110px] px-8 max-w-[1480px] mx-auto w-full z-10 relative">
        <ScrollReveal offsetStart="start 90%" offsetEnd="start 55%">
          <div className="flex flex-col gap-4 mb-16">
            <span className="text-[14px] text-[#808080] uppercase tracking-widest font-bold">SERVICES</span>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              <h2 className="text-[48px] font-bold text-black leading-[1.1] max-w-lg">
                We're Way More Than a Showroom
              </h2>
              <div className="flex flex-col gap-4 max-w-sm">
                <p className="text-[#4D4D4D] text-base font-medium">
                  Premium bikes deserve premium service—and that's exactly what you'll get.
                </p>
                <Button asLink to="/inventory" variant="primary">Browse Bikes</Button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
          <div className="flex flex-col gap-6 w-full lg:w-1/2 h-full">
            <div className="w-full h-1/2 relative rounded-[16px] overflow-hidden p-5 flex flex-col justify-end group cursor-pointer">
              <div className="absolute inset-0 z-0">
                <img src="https://framerusercontent.com/images/ePT9kuMpmdFFmnCqOllNvONQys.webp" alt="Inspection" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black-50" />
              </div>
              <h3 className="text-white font-medium text-2xl z-10 transition-transform duration-300 group-hover:-translate-y-1">Full Technical Inspection</h3>
            </div>
            <div className="w-full h-1/2 relative rounded-[16px] overflow-hidden p-5 flex flex-col justify-end group cursor-pointer">
              <div className="absolute inset-0 z-0">
                <img src="https://framerusercontent.com/images/WyhRtolqAtg9ZPTE92NjlKjv0.webp" alt="Detailing" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black-50" />
              </div>
              <h3 className="text-white font-medium text-2xl z-10 transition-transform duration-300 group-hover:-translate-y-1">Professional Detailing</h3>
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full lg:w-1/2 h-full">
            <div className="w-full h-[40%] bg-black-main rounded-[16px] relative overflow-hidden p-5 flex flex-col justify-end group cursor-pointer">
              <h3 className="text-white font-medium text-2xl z-10 transition-transform duration-300 group-hover:-translate-y-1">Verified History & Trusted Brand</h3>
            </div>
            <div className="w-full h-[30%] relative rounded-[16px] overflow-hidden p-5 flex flex-col justify-end group cursor-pointer">
              <div className="absolute inset-0 z-0">
                <img src="https://framerusercontent.com/images/TcgsebcRv5iSa7dvNbl6PMQECA.webp" alt="Warranty" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black-50" />
              </div>
              <h3 className="text-white font-medium text-2xl z-10 transition-transform duration-300 group-hover:-translate-y-1">Warranty Support</h3>
            </div>
            <div className="w-full h-[30%] relative rounded-[16px] overflow-hidden p-5 flex flex-col justify-end group cursor-pointer">
              <div className="absolute inset-0 z-0">
                <img src="https://framerusercontent.com/images/DKYMPBTwzZsENhq8F0kqQLKshtw.jpg" alt="Financing" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black-50" />
              </div>
              <h3 className="text-white font-medium text-2xl z-10 transition-transform duration-300 group-hover:-translate-y-1">Loan & Financing</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. FAQ SECTION ───────────────────────────── */}
      <section className="py-[140px] px-8 max-w-[1480px] mx-auto w-full z-10 relative mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal>
            <div className="sticky top-32">
              <h2 className="text-[14px] text-[#808080] uppercase tracking-widest font-bold mb-3">FAQ</h2>
              <h3 className="text-[48px] font-bold text-black leading-[1.1]">Common questions about KL7 Garage, answered honestly.</h3>
            </div>
          </ScrollReveal>

          <ScrollReveal staggerIndex={1} offsetStart="start 80%" offsetEnd="start 40%">
            <FaqAccordion
              items={[
                { question: "What Makes You Different From Other Showrooms?", answer: "We've eliminated high-pressure tactics. You'll experience transparent pricing, honest conversations, expert guidance, and genuine respect for your time. We're riders first, salespeople second—and that makes all the difference." },
                { question: "How Long Have You Been in Business?", answer: "We've been serving bike enthusiasts for over 10 years. Our founder started KL7 Garage in 2015 with a simple mission: rebuild the bike buying experience around trust, expertise, and complete transparency." },
                { question: "Who Are Your Team Members?", answer: "Our team includes certified motorcycle technicians, experienced finance specialists, and dedicated sales advisors—all passionate about bikes. Every team member shares our commitment to exceptional service and integrity." },
                { question: "What Brands Do You Specialize In?", answer: "We specialize in prestigious brands: Ducati, Honda, Kawasaki, Yamaha, BMW Motorrad, Triumph, KTM, Harley-Davidson, Aprilia, and Suzuki. Only the finest bikes earn a place in our showroom." },
                { question: "Do You Offer Aftersales Support?", answer: "Absolutely. Our relationship doesn't end when you ride away. We provide ongoing support, service coordination, warranty assistance, and technical advice throughout your ownership." },
              ]}
            />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
