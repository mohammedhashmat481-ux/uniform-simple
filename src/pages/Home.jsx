import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  MessageCircle, 
  CheckCircle, 
  Star, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

import { SITE_CONFIG } from '../config/siteConfig';
import { 
  FEATURED_PRODUCTS, 
  TESTIMONIALS, 
  PROCESS_STEPS, 
  WHY_CHOOSE_US 
} from '../data/dummyData';

import { 
  NeedleThreadIcon, 
  ScissorsIcon, 
  MeasuringTapeIcon, 
  FabricRollIcon, 
  ShirtIcon, 
  QualityBadgeIcon 
} from '../components/common/CustomIcons';

export default function Home({ onOpenQuoteModal }) {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Animated stat counter state
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounters([
        Math.floor(SITE_CONFIG.stats[0].value * progress),
        Math.floor(SITE_CONFIG.stats[1].value * progress),
        Math.floor(1.2 * progress * 10) / 10,
        Math.floor(SITE_CONFIG.stats[3].value * progress)
      ]);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const renderFeatureIcon = (iconName) => {
    const props = { className: "w-7 h-7 sm:w-8 sm:h-8 text-gold" };
    switch (iconName) {
      case 'FabricRollIcon': return <FabricRollIcon {...props} />;
      case 'NeedleThreadIcon': return <NeedleThreadIcon {...props} />;
      case 'MeasuringTapeIcon': return <MeasuringTapeIcon {...props} />;
      case 'ShirtIcon': return <ShirtIcon {...props} />;
      case 'ScissorsIcon': return <ScissorsIcon {...props} />;
      case 'QualityBadgeIcon': return <QualityBadgeIcon {...props} />;
      default: return <QualityBadgeIcon {...props} />;
    }
  };

  const fadeInVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const whatsappMessage = encodeURIComponent(`Hello ${SITE_CONFIG.name}, I would like to get a quote for custom uniforms for my organization.`);
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <Helmet>
        <title>{SITE_CONFIG.name} | Premium Uniform Manufacturing</title>
        <meta name="description" content="Custom uniform manufacturing for schools, corporate entities, healthcare, hospitality, industrial, and security teams. Tailored to represent excellence." />
        
        {/* LocalBusiness JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": SITE_CONFIG.name,
            "description": SITE_CONFIG.description,
            "telephone": SITE_CONFIG.contact.phone,
            "email": SITE_CONFIG.contact.email,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": SITE_CONFIG.contact.address,
              "addressLocality": "Bangalore",
              "addressRegion": "Karnataka",
              "addressCountry": "IN"
            },
            "url": "https://apexcraftuniforms.com",
            "priceRange": "$$"
          })}
        </script>
      </Helmet>

      {/* 1. HERO SECTION (dvh/svh for mobile browser address bars) */}
      <section className="relative min-h-[85dvh] lg:min-h-[90vh] bg-navy flex items-center overflow-hidden border-b border-gold/20">
        
        {/* Background Image with Dark Navy Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/hero-bg.webp" 
            alt="Tailoring Atelier and Uniform Craftsmanship" 
            className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-10000 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70"></div>
          <div className="absolute inset-0 bg-dark-fabric-pattern opacity-40"></div>
        </div>

        <div className="relative z-10 max-w-site mx-auto px-4 sm:px-6 py-12 xs:py-16 lg:py-24 w-full">
          <motion.div 
            className="max-w-3xl space-y-4 xs:space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-surface/80 border border-gold/40 text-gold text-[11px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-gold-glow max-w-full truncate">
              <NeedleThreadIcon className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="truncate">Bespoke Institutional & Corporate Tailoring</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight">
              Uniforms That <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">Define Your Identity</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm xs:text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl">
              Elevate your organization's prestige with bespoke uniform manufacturing. Sourced from high-grade textiles, cut with CAD precision, and hand-finished with meticulous embroidery.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-col xs:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => onOpenQuoteModal(null)}
                className="btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-gold-glow flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-1 min-h-[48px]"
              >
                <span>Get a Free Bulk Quote</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <Link
                to="/catalogue"
                className="bg-navy-surface/90 hover:bg-navy-surface text-white border border-white/20 hover:border-gold font-semibold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl backdrop-blur-md flex items-center justify-center gap-2 transition-all min-h-[48px]"
              >
                Explore Catalogue
              </Link>
            </div>

            {/* Trust Strip */}
            <div className="pt-6 sm:pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300 border-t border-white/10 mt-6 sm:mt-8">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>200+ Premium Fabrics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Logo Embroidery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>ISO Certified QC</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Pan-India Delivery</span>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 2. ANIMATED STATS BAR (2x2 grid on mobile, 4 in a row on desktop) */}
      <section className="bg-navy-dark text-white py-8 sm:py-12 border-b border-gold/20 relative z-20">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y-0 sm:divide-y-0 md:divide-x divide-white/10">
            
            <div className="p-2 sm:p-0">
              <div className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gold tracking-tight">
                {counters[0]}+
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium">Years of Craftsmanship</p>
            </div>

            <div className="p-2 sm:p-0">
              <div className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gold tracking-tight">
                {counters[1]}+
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium">Corporate & Institutional Clients</p>
            </div>

            <div className="p-2 sm:p-0">
              <div className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gold tracking-tight">
                {counters[2]}M+
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium">Uniforms Delivered</p>
            </div>

            <div className="p-2 sm:p-0">
              <div className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gold tracking-tight">
                {counters[3]}+
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1 font-medium">Cities Served Nationwide</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHO WE SERVE (1 col on 320px, 2 col on xs 400px+, 3 col on lg) */}
      <section className="py-14 sm:py-20 bg-ivory relative">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-10 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-semibold text-gold tracking-widest uppercase block">
              Tailored Sector Solutions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-heading">
              Industries & Sectors We Serve
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
            <p className="text-xs sm:text-sm text-body">
              Specialized fabric choices, safety compliance, and bespoke styling tailored to every professional domain.
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {SITE_CONFIG.categories.slice(0, 6).map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/catalogue?category=${cat.id}`)}
                className="group relative h-64 xs:h-72 sm:h-80 rounded-2xl overflow-hidden shadow-card hover:shadow-luxury cursor-pointer transform transition-all duration-300 border border-gold/10"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/50 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"></div>
                
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white z-10">
                  <span className="text-[10px] sm:text-xs text-gold uppercase tracking-wider font-semibold mb-0.5">
                    Custom Manufacturing
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-white group-hover:text-gold transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-300 mt-2 sm:mt-3 group-hover:text-white transition-colors">
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>

                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-navy/60 backdrop-blur-md border border-gold/40 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE US (6 Icon Features) */}
      <section className="py-14 sm:py-20 bg-white border-y border-gold/15 relative">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-semibold text-gold tracking-widest uppercase block">
              Uncompromising Excellence
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-heading">
              Why Apex Craft Stands Apart
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div 
                key={idx}
                className="bg-ivory/60 hover:bg-ivory p-6 sm:p-8 rounded-2xl border border-slate-200/80 hover:border-gold/40 shadow-card hover:shadow-luxury transition-all duration-300 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-navy flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-navy-surface transition-all shadow-md">
                  {renderFeatureIcon(item.icon)}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-heading mb-2 sm:mb-3 group-hover:text-navy transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-body leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. OUR PROCESS (5-Step Timeline) */}
      <section className="py-14 sm:py-20 bg-navy text-white relative overflow-hidden">
        <div className="max-w-site mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-semibold text-gold tracking-widest uppercase block">
              From Concept To Delivery
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Our 5-Step Crafting Process
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
            <p className="text-xs sm:text-sm text-slate-300">
              Seamless institutional procurement designed for clarity, speed, and zero fitting errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gold/20 -z-0"></div>

            {PROCESS_STEPS.map((proc, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-navy-surface border-2 border-gold flex items-center justify-center font-serif text-lg sm:text-xl font-bold text-gold shadow-gold-glow group-hover:bg-gold group-hover:text-navy transition-all duration-300 mb-4 sm:mb-6">
                  {proc.step}
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2 group-hover:text-gold transition-colors">
                  {proc.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                  {proc.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. FEATURED PRODUCTS (1 col on 320px, 2 col on xs 400px+, 3 on md, 4 on lg) */}
      <section className="py-14 sm:py-20 bg-ivory">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-gold tracking-widest uppercase block">
                Bespoke Showroom
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-heading mt-1">
                Featured Uniform Showcase
              </h2>
              <div className="w-16 h-0.5 bg-gold mt-2.5"></div>
            </div>

            <Link 
              to="/catalogue"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-navy hover:text-gold transition-colors min-h-[44px]"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {FEATURED_PRODUCTS.slice(0, 4).map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-200/80 hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-navy/90 text-gold text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-gold/30">
                      {product.categoryName}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-heading group-hover:text-navy transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-body leading-relaxed line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0 flex gap-2">
                  <button
                    onClick={() => onOpenQuoteModal(product)}
                    className="flex-1 btn-gold-sheen bg-navy hover:bg-navy-light text-gold font-semibold text-xs py-2.5 px-3 rounded-xl text-center transition-all min-h-[44px]"
                  >
                    Enquire Now
                  </button>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(`Hello, I am interested in inquiring about ${product.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 min-w-[44px] min-h-[44px]"
                    title="Quick WhatsApp Enquiry"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. TESTIMONIALS SLIDER */}
      <section className="py-14 sm:py-20 bg-white border-t border-gold/15">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-10 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-semibold text-gold tracking-widest uppercase block">
              Trusted Reputation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-heading">
              What Institutional Leaders Say
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto bg-ivory rounded-3xl p-6 sm:p-12 shadow-luxury border border-gold/20 relative">
            
            <div className="flex items-center gap-1 text-gold mb-4 sm:mb-6">
              {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              ))}
            </div>

            <blockquote className="font-serif text-base sm:text-2xl text-navy italic leading-relaxed mb-6 sm:mb-8">
              "{TESTIMONIALS[activeTestimonial].quote}"
            </blockquote>

            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3 sm:gap-4">
                <img 
                  src={TESTIMONIALS[activeTestimonial].avatar} 
                  alt={TESTIMONIALS[activeTestimonial].name} 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gold"
                />
                <div>
                  <h4 className="font-serif font-bold text-navy text-sm sm:text-base">
                    {TESTIMONIALS[activeTestimonial].name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-body font-sans">
                    {TESTIMONIALS[activeTestimonial].title}, <span className="font-medium text-navy">{TESTIMONIALS[activeTestimonial].organization}</span>
                  </p>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2 self-end xs:self-center">
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                  className="w-10 h-10 rounded-full bg-white border border-slate-300 hover:border-gold flex items-center justify-center text-navy hover:text-gold transition-colors min-w-[44px] min-h-[44px]"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full bg-white border border-slate-300 hover:border-gold flex items-center justify-center text-navy hover:text-gold transition-colors min-w-[44px] min-h-[44px]"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. CTA BAND */}
      <section className="py-14 sm:py-16 bg-gradient-to-r from-navy-dark via-navy to-navy-surface text-white border-t border-gold/30 relative overflow-hidden">
        <div className="max-w-site mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-center lg:text-left">
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Ready to Outfit Your Team in Distinction?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak with our senior uniform specialist today for fabric samples, site measurement drives, and institutional pricing quotes.
            </p>
          </div>

          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 shrink-0 w-full xs:w-auto">
            <button
              onClick={() => onOpenQuoteModal(null)}
              className="btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-sm px-7 py-3.5 rounded-xl shadow-gold-glow transition-all min-h-[48px]"
            >
              Get a Free Quote
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Instant WhatsApp Chat
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
