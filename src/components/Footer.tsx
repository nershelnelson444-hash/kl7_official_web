import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function Footer() {
  return (
    <footer className="w-full bg-black-main text-white pt-24 pb-8 px-4 md:px-8">
      <div className="max-w-[1480px] mx-auto flex flex-col gap-16">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">

          {/* Brand & CTA */}
          <div className="flex flex-col gap-6 max-w-[400px]">
            <Link to="/" className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-2xl font-bold tracking-tight">KL7 GARAGE</span>
            </Link>

            <h2 className="text-[32px] font-bold leading-tight tracking-[-0.03em]">
              Ready to test your dream bike?
            </h2>
            <p className="text-text-white-muted font-medium leading-relaxed">
              Curated pre-owned motorcycles from the world's most prestigious brands since 2015.
            </p>
            <Button asLink to="/contact" variant="inverse">
              Contact us
            </Button>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">

            {/* Showroom */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-text-white-muted">Showroom</h4>
              <div className="flex flex-col gap-4 font-medium">
                <Link to="/" className="hover:text-text-white-muted transition-colors">Home</Link>
                <Link to="/inventory" className="hover:text-text-white-muted transition-colors">Bikes</Link>
                <Link to="/sell" className="hover:text-text-white-muted transition-colors">Sell Your Bike</Link>
              </div>
            </div>

            {/* Dealership */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-text-white-muted">Company</h4>
              <div className="flex flex-col gap-4 font-medium">
                <Link to="/about-us" className="hover:text-text-white-muted transition-colors">About</Link>
                <Link to="/journal" className="hover:text-text-white-muted transition-colors">Journal</Link>
                <Link to="/contact" className="hover:text-text-white-muted transition-colors">Contact</Link>
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
              <h4 className="text-sm font-bold uppercase tracking-wider text-text-white-muted">Connect</h4>
              <div className="flex flex-col gap-4 font-medium">
                <a href="#" className="hover:text-text-white-muted transition-colors">Instagram</a>
                <a href="#" className="hover:text-text-white-muted transition-colors">Facebook</a>
                <a href="#" className="hover:text-text-white-muted transition-colors">TikTok</a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/20 text-sm font-medium text-text-white-muted">
          <p>© {new Date().getFullYear()} KL7 Garage. All rights reserved.</p>
          <div className="flex flex-row gap-6">
            <Link to="/legal-pages/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/legal-pages/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/legal-pages/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
