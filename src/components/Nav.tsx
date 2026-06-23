import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Button from './Button';
import kl7logo from '../assets/kl7logo.png';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  const backgroundColor = useTransform(scrollY, [0, 50], ["rgba(242, 242, 242, 1)", "rgba(242, 242, 242, 0.85)"]);
  const backdropFilter = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);
  const borderBottom = useTransform(scrollY, [0, 50], ["1px solid rgba(230, 230, 230, 1)", "1px solid rgba(230, 230, 230, 0.5)"]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Bikes', to: '/inventory' },
    { label: 'Sell Your Bike', to: '/sell' },
    { label: 'About', to: '/about-us' },
    { label: 'Contact', to: '/contact' },
  ];

  const ProfileIcon = () => (
    <button
      onClick={() => navigate('/admin')}
      className="w-[46px] h-[46px] rounded-full flex items-center justify-center border border-grey-main text-black transition-transform hover:scale-105 bg-white shrink-0"
      title="Admin Login"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </button>
  );

  return (
    <>
      <motion.nav
        style={{ backgroundColor, backdropFilter, borderBottom }}
        className="fixed top-0 left-0 w-full h-auto z-50 px-8 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <div className="max-w-[1480px] mx-auto flex flex-row items-center justify-between">

          {/* Left — Logo */}
          <Link to="/" className="bg-black rounded-xl px-3 py-1.5 flex items-center shrink-0">
            <img src={kl7logo} alt="KL7 Garage" className="h-10 w-auto object-contain" />
          </Link>

          {/* Center — Nav Links (desktop) */}
          <div className="hidden lg:flex flex-row items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-text-black font-medium text-base hover:text-text-black-muted transition-colors relative group"
              >
                {label}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right — CTA + Profile (desktop) + hamburger */}
          <div className="flex flex-row items-center gap-3">
            {/* Desktop: Get in Touch + Profile */}
            <div className="hidden md:flex flex-row items-center gap-3">
              <Button asLink to="/contact" variant="primary">
                Get in Touch
              </Button>
              <ProfileIcon />
            </div>

            {/* Mobile: Profile + Hamburger */}
            <div className="flex md:hidden flex-row items-center gap-3">
              <ProfileIcon />
              <button
                className="flex flex-col justify-center items-center w-[46px] h-[46px] rounded-full border border-grey-main bg-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 4 : -2 }} className="block w-5 h-[2px] bg-black mb-[4px]" />
                <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -4 : 2 }} className="block w-5 h-[2px] bg-black" />
              </button>
            </div>

            {/* Tablet: hamburger only (md to lg) */}
            <button
              className="hidden md:flex lg:hidden flex-col justify-center items-center w-[46px] h-[46px] rounded-full border border-grey-main bg-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 4 : -2 }} className="block w-5 h-[2px] bg-black mb-[4px]" />
              <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -4 : 2 }} className="block w-5 h-[2px] bg-black" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="fixed inset-0 top-[78px] bg-background-main z-40 flex flex-col p-8 border-t border-grey-main lg:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-medium">
              {navLinks.map(({ label, to }) => (
                <Link key={to} to={to} onClick={() => setIsMobileMenuOpen(false)}>{label}</Link>
              ))}
            </div>
            <div className="mt-auto">
              <Button asLink to="/contact" variant="primary" onClick={() => setIsMobileMenuOpen(false)} className="text-center text-lg w-full">
                Get in Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}