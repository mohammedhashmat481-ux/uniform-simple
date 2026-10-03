import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Linkedin } from 'lucide-react';
import { NeedleThreadIcon } from '../common/CustomIcons';
import { SITE_CONFIG } from '../../config/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-slate-300 pt-16 pb-8 border-t border-gold/20 relative">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center bg-navy-surface shadow-gold-glow">
                <NeedleThreadIcon className="w-5 h-5 text-gold" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                APEX CRAFT
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href={SITE_CONFIG.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-surface border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={SITE_CONFIG.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-surface border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={SITE_CONFIG.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-navy-surface border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-white font-semibold text-base tracking-wide border-b border-gold/30 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-gold transition-colors flex items-center gap-2">
                  <span className="text-gold">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors flex items-center gap-2">
                  <span className="text-gold">›</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="hover:text-gold transition-colors flex items-center gap-2">
                  <span className="text-gold">›</span> Catalogue & Products
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-gold transition-colors flex items-center gap-2">
                  <span className="text-gold">›</span> Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors flex items-center gap-2">
                  <span className="text-gold">›</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div className="space-y-4">
            <h4 className="font-serif text-white font-semibold text-base tracking-wide border-b border-gold/30 pb-2 inline-block">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SITE_CONFIG.categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/catalogue?category=${cat.id}`} className="hover:text-gold transition-colors flex items-center gap-2">
                    <span className="text-gold">›</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-white font-semibold text-base tracking-wide border-b border-gold/30 pb-2 inline-block">
              Headquarters
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="hover:text-gold transition-colors">
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-gold transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>{SITE_CONFIG.contact.workingHours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="text-slate-500">Tailored to Perfection</span>
            <span className="text-slate-600">•</span>
            <span>Designed by Apex Craft Tailoring Digital</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
