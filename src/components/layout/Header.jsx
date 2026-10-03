import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { NeedleThreadIcon } from '../common/CustomIcons';
import { SITE_CONFIG } from '../../config/siteConfig';

export default function Header({ onOpenQuoteModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Banner strip */}
      <div className="bg-navy-dark text-white/80 text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-site mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
              {SITE_CONFIG.tagline}
            </span>
            <span className="text-white/40">|</span>
            <span>📍 {SITE_CONFIG.contact.cityState}</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="hover:text-gold transition-colors flex items-center gap-1.5 min-h-[32px]">
              <Phone className="w-3.5 h-3.5 text-gold" /> {SITE_CONFIG.contact.phone}
            </a>
            <span className="text-white/40">|</span>
            <span>{SITE_CONFIG.contact.workingHours}</span>
          </div>
        </div>
      </div>

      {/* Main Header Navbar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-navy/95 backdrop-blur-md shadow-luxury py-3 border-b border-gold/20' 
            : 'bg-navy py-4 sm:py-5'
        }`}
        style={{ WebkitBackdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-site mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold/40 flex items-center justify-center bg-navy-surface group-hover:border-gold transition-colors shadow-gold-glow shrink-0">
              <NeedleThreadIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gold group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-white block leading-none">
                APEX CRAFT
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-gold uppercase block font-sans mt-0.5 font-medium">
                UNIFORM MANUFACTURERS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors py-2 px-1 ${
                    isActive ? 'text-gold font-semibold' : 'text-slate-200 hover:text-gold'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full transition-all"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Quote Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-sm px-6 py-2.5 rounded-xl shadow-gold-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0 min-h-[44px]"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Hamburger Button (min 44x44px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-200 hover:text-gold p-2.5 rounded-xl focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center bg-navy-surface/60 border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-navy-dark/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer Container */}
          <div className="relative w-4/5 max-w-sm bg-navy text-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 border-l border-gold/20 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <NeedleThreadIcon className="w-6 h-6 text-gold" />
                  <span className="font-serif font-bold text-lg text-white tracking-tight">APEX CRAFT</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center justify-between py-3.5 px-4 rounded-xl transition-all min-h-[44px] ${
                        isActive 
                          ? 'bg-gold/15 text-gold font-semibold border-l-4 border-gold' 
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="text-base font-medium">{link.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile drawer footer details */}
            <div className="space-y-4 pt-6 border-t border-white/10 safe-bottom">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold py-3.5 px-4 rounded-xl text-center text-sm shadow-gold-glow min-h-[48px]"
              >
                Get a Free Quote
              </button>
              <div className="text-xs text-slate-400 space-y-1.5 text-center">
                <p>📞 <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="hover:text-gold">{SITE_CONFIG.contact.phone}</a></p>
                <p>✉️ <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-gold">{SITE_CONFIG.contact.email}</a></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
