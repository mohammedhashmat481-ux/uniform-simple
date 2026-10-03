import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp, MessageCircle, Phone, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export default function FloatingButtons({ onOpenQuoteModal }) {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const location = useLocation();

  const showStickyActionBar = ['/', '/catalogue', '/contact'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const whatsappMessage = encodeURIComponent(`Hello ${SITE_CONFIG.name}, I would like to enquire about custom uniforms.`);
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      {/* Floating Buttons Stack (Bottom Right) */}
      <div className={`fixed right-4 sm:right-6 z-40 flex flex-col items-end space-y-3 pointer-events-none transition-all duration-300 ${
        showStickyActionBar ? 'bottom-20 lg:bottom-6' : 'bottom-6'
      }`}>
        
        {/* Back to top button */}
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            className="pointer-events-auto bg-navy/90 hover:bg-navy text-gold w-11 h-11 rounded-full shadow-luxury border border-gold/30 hover:border-gold flex items-center justify-center transition-all transform hover:-translate-y-1 focus:outline-none min-w-[44px] min-h-[44px]"
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Button (56px size on mobile with 44px+ tap area) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto bg-[#25D366] hover:bg-[#20bd5a] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center group transition-all transform hover:scale-105 animate-pulse-subtle min-w-[56px] min-h-[56px]"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
        </a>

      </div>

      {/* Sticky Bottom Action Bar on Mobile (Call | WhatsApp | Get Quote) */}
      {showStickyActionBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-navy/95 border-t border-gold/30 p-2.5 lg:hidden backdrop-blur-md shadow-2xl safe-bottom">
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            <a
              href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
              className="bg-navy-surface hover:bg-navy-light text-white font-semibold text-xs py-2.5 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-1 min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>Call Us</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 min-h-[44px] shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal(null)}
              className="btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-xs py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 min-h-[44px] shadow-gold-glow"
            >
              <FileText className="w-4 h-4" />
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
