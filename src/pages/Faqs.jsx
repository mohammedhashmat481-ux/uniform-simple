import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronDown, MessageCircle, HelpCircle, PhoneCall } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { FAQS_DATA } from '../data/faqsData';

export default function Faqs({ onOpenQuoteModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaqId, setOpenFaqId] = useState('faq-1');

  const categories = ['All', 'Ordering & Bulk Orders', 'Customisation & Fabric', 'Pricing & Payment', 'Delivery & Timelines', 'Sizing / Returns / Alterations'];

  const filteredFaqs = FAQS_DATA.filter(faq => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(`Hello ${SITE_CONFIG.name}, I have a question about uniform ordering.`)}`;

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | {SITE_CONFIG.name}</title>
        <meta name="description" content="Answers to common questions about uniform minimum order quantities, fabric selections, embroidery customization, lead times, and payment terms." />
        
        {/* FAQPage JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS_DATA.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      {/* Banner */}
      <section className="bg-navy py-16 border-b border-gold/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-fabric-pattern opacity-30"></div>
        <div className="max-w-site mx-auto px-4 sm:px-6 relative z-10 text-center">
          <nav className="flex justify-center text-xs text-gold/80 mb-3 font-medium uppercase tracking-wider">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2 text-slate-500">/</span>
            <span className="text-white">FAQs</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Everything you need to know about our institutional uniform ordering, fabrics, sizing, and lead times.
          </p>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="py-16 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Search Box */}
          <div className="relative mb-8">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. MOQ, lead time, embroidery, samples)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-sm pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white shadow-card focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-full transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-navy text-gold shadow-gold-glow border border-gold/40'
                    : 'bg-white text-body hover:bg-navy-surface hover:text-white border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-navy">No Matching Questions Found</h3>
              <p className="text-xs text-body mt-1">Try refining your search terms or connect directly with our tailoring specialist.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleFaq(faq.id);
                        }
                      }}
                      aria-expanded={isOpen}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-ivory/50"
                    >
                      <span className="font-serif text-base sm:text-lg font-bold text-heading">
                        {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-gold text-navy rotate-180' : 'bg-ivory text-slate-500'
                      }`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-0 text-sm text-body leading-relaxed border-t border-slate-100 mt-1">
                        <p className="pt-3">{faq.answer}</p>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-gold font-medium">{faq.category}</span>
                          <button
                            onClick={() => onOpenQuoteModal(null)}
                            className="text-navy hover:text-gold font-bold transition-colors"
                          >
                            Ask specific question ›
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Still Have Questions CTA */}
          <div className="mt-16 bg-navy text-white p-8 rounded-3xl border border-gold/30 text-center space-y-4 shadow-luxury">
            <h3 className="font-serif text-2xl font-bold text-white">Still Have Questions?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Our Senior Uniform Specialist is available to answer your specific institutional requirements, custom sizing queries, and fabric sample dispatches.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs px-6 py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Chat on WhatsApp
              </a>
              <Link
                to="/contact"
                className="btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-xs px-6 py-3 rounded-xl shadow-gold-glow flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Contact Us Directly
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
