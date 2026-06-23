import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Button from './Button';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(242, 242, 242, 1)", "rgba(242, 242, 242, 0.85)"]
  );

  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(12px)"]
  );

  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ["1px solid rgba(230, 230, 230, 1)", "1px solid rgba(230, 230, 230, 0.5)"]
  );

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Bikes', to: '/inventory' },
    { label: 'Sell Your Bike', to: '/sell' },
    { label: 'About', to: '/about-us' },
    { label: 'Contact', to: '/contact' },
  ];

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
          {/* Social Links (Left) */}
          <div className="hidden md:flex flex-row items-center gap-2">
            <a href="#" className="w-[46px] h-[46px] rounded-full flex items-center justify-center border border-grey-main text-black transition-transform hover:scale-105">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="w-[46px] h-[46px] rounded-full flex items-center justify-center border border-grey-main text-black transition-transform hover:scale-105">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>

          {/* Center Logo & Nav Links */}
          <div className="flex flex-row items-center gap-12">
            <Link to="/" className="text-2xl font-bold font-sans tracking-tight">KL7 Garage</Link>

            <div className="hidden lg:flex flex-row items-center gap-6">
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
          </div>

          {/* Right Action */}
          <div className="flex flex-row items-center gap-4">
            <Button asLink to="/contact" variant="primary" className="hidden md:flex">
              Get in Touch
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-[46px] h-[46px] rounded-full border border-grey-main bg-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 4 : -2 }}
                className="block w-5 h-[2px] bg-black mb-[4px]"
              />
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -4 : 2 }}
                className="block w-5 h-[2px] bg-black"
              />
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
            <div className="mt-auto flex flex-col gap-6">
              <div className="flex flex-row gap-4">
                <a href="#" className="w-[46px] h-[46px] rounded-full flex items-center justify-center border border-grey-main text-black">fb</a>
                <a href="#" className="w-[46px] h-[46px] rounded-full flex items-center justify-center border border-grey-main text-black">ig</a>
              </div>
              <Button asLink to="/contact" variant="primary" onClick={() => setIsMobileMenuOpen(false)} className="text-center text-lg">
                Get in Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
