import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, MessageCircle, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { fetchProducts } from '../services/api';
import { NeedleThreadIcon, FabricRollIcon, MeasuringTapeIcon, ShirtIcon } from '../components/common/CustomIcons';

export default function Catalogue({ onOpenQuoteModal }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProducts(activeCategory, searchQuery)
      .then(data => {
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const categories = [
    { id: 'all', name: 'All Categories' },
    ...SITE_CONFIG.categories
  ];

  const fabricSwatches = [
    { name: "Super 120s Poly-Viscose", use: "Corporate Suits & Blazers", color: "#1E293B" },
    { name: "Egyptian Long Cotton", use: "Executive Shirts & Chefwear", color: "#F8FAFC" },
    { name: "Combed Cotton Pique", use: "School & Corporate Polos", color: "#1D4ED8" },
    { name: "Heavyweight Cotton Drill", use: "Industrial & Factory Workwear", color: "#C9A24B" },
    { name: "4-Way Stretch Spandex", use: "Medical Scrubs & Healthcare", color: "#0D9488" },
    { name: "Ripstop Canvas", use: "Security Cargo & Tactical Wear", color: "#334155" }
  ];

  return (
    <>
      <Helmet>
        <title>Catalogue & Uniform Collection | {SITE_CONFIG.name}</title>
        <meta name="description" content="Browse our complete catalogue of school uniforms, corporate suits, healthcare scrubs, chef jackets, industrial workwear, and sports jerseys." />
      </Helmet>

      {/* Banner */}
      <section className="bg-navy py-12 sm:py-16 border-b border-gold/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-fabric-pattern opacity-30"></div>
        <div className="max-w-site mx-auto px-4 sm:px-6 relative z-10 text-center">
          <nav className="flex justify-center text-xs text-gold/80 mb-2.5 font-medium uppercase tracking-wider">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2 text-slate-500">/</span>
            <span className="text-white">Catalogue</span>
          </nav>
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Institutional & Corporate Uniform Collection
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto mt-2.5">
            Explore our precision-crafted catalog. All garments can be customized with your logo, colors, and sizing specifications.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Search Bar */}
      <section className="py-4 sm:py-6 bg-white border-b border-slate-200 sticky top-[57px] sm:top-[68px] z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-site mx-auto px-4 sm:px-6 space-y-3">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            
            {/* Horizontally Scrollable Chip Row on Mobile */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none snap-x snap-mandatory">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`whitespace-nowrap text-xs font-semibold px-4 py-2.5 rounded-full transition-all shrink-0 snap-start min-h-[40px] flex items-center ${
                    activeCategory === cat.id
                      ? 'bg-navy text-gold shadow-gold-glow border border-gold/40'
                      : 'bg-ivory text-body hover:bg-navy-surface hover:text-white border border-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products or fabrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-base sm:text-xs pl-10 pr-4 py-2.5 rounded-full border border-slate-300 bg-ivory/50 focus:bg-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all min-h-[44px]"
              />
            </div>

          </div>

        </div>
      </section>

      {/* Product Grid (1 col on 320-374px, 2 col from 375px/xs, 3 on md, 4 on lg) */}
      <section className="py-10 sm:py-16 bg-ivory">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <p className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-navy">{products.length}</span> uniform designs
            </p>
            {activeCategory !== 'all' && (
              <button
                onClick={() => handleCategoryChange('all')}
                className="text-xs text-gold hover:underline font-semibold min-h-[36px] flex items-center"
              >
                Reset Filter
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-slate-200 p-4 space-y-4">
                  <div className="bg-slate-200 h-40 rounded-xl"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8">
              <ShirtIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-navy">No Matching Uniforms Found</h3>
              <p className="text-xs text-body max-w-sm mx-auto mt-2">
                We couldn't find any designs matching "{searchQuery}". We craft 100% custom designs from scratch according to your exact requirements.
              </p>
              <button
                onClick={() => onOpenQuoteModal(null)}
                className="mt-6 btn-gold-sheen bg-gold text-navy font-bold text-xs px-6 py-3 rounded-xl shadow-gold-glow min-h-[44px]"
              >
                Request Custom Design
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => {
                const img = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : (product.image || '/images/products/school-blazer.webp');
                const colorsList = Array.isArray(product.colors) ? product.colors.join(', ') : product.colors;
                return (
                  <div 
                    key={product._id || product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-200 hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-44 xs:h-52 sm:h-56 overflow-hidden bg-slate-100">
                        <img 
                          src={img} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-navy/90 text-gold text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-gold/30">
                          {product.categoryName || product.category}
                        </span>
                      </div>

                      <div className="p-4 sm:p-5 space-y-1.5">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-heading group-hover:text-navy transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-body leading-relaxed line-clamp-2">
                          {product.shortDescription}
                        </p>

                        <div className="pt-2 space-y-0.5 text-[11px] text-slate-500 border-t border-slate-100 mt-2">
                          <p className="truncate"><strong className="text-slate-700">Fabric:</strong> {product.fabric}</p>
                          {colorsList && <p className="truncate"><strong className="text-slate-700">Colors:</strong> {colorsList}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 pt-0 flex gap-2">
                      <button
                        onClick={() => onOpenQuoteModal(product)}
                        className="flex-1 btn-gold-sheen bg-navy hover:bg-navy-light text-gold font-semibold text-xs py-2.5 px-2.5 rounded-xl text-center transition-all min-h-[44px]"
                      >
                        Enquire Now
                      </button>

                      <a
                        href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(`Hello ${SITE_CONFIG.name}, I would like to enquire about ${product.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 min-w-[44px] min-h-[44px]"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* Customisation Options Section */}
      <section className="py-14 sm:py-20 bg-white border-y border-gold/15">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-semibold text-gold tracking-widest uppercase block">
              Bespoke Personalization
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-heading">
              Customization Options & Branding
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <div className="bg-ivory p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-2 sm:space-y-3">
              <NeedleThreadIcon className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-navy">High-Density Embroidery</h3>
              <p className="text-xs text-body leading-relaxed">Japanese Barudan embroidery machines producing metallic gold bullion, 3D puff, and high-definition crest logos.</p>
            </div>

            <div className="bg-ivory p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-2 sm:space-y-3">
              <FabricRollIcon className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-navy">Custom Fabric Blends</h3>
              <p className="text-xs text-body leading-relaxed">Choose anti-bacterial, flame-retardant, stain-proof, or moisture-wicking dry fit textiles from certified mills.</p>
            </div>

            <div className="bg-ivory p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-2 sm:space-y-3">
              <MeasuringTapeIcon className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-navy">Size Drives & Fitting</h3>
              <p className="text-xs text-body leading-relaxed">We conduct on-site fitting sessions for staff and students, ensuring zero exchange hassle after delivery.</p>
            </div>

            <div className="bg-ivory p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-2 sm:space-y-3">
              <ShirtIcon className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-navy">Specialized Packaging</h3>
              <p className="text-xs text-body leading-relaxed">Garments pre-sorted and labeled by student section, department, or branch for effortless distribution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fabric and Colour Swatches Section */}
      <section className="py-14 sm:py-20 bg-ivory">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-semibold text-gold tracking-widest uppercase block">
              Material Library
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-heading">
              Featured Fabrics & Color Swatches
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {fabricSwatches.map((swatch, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-xl border-2 border-gold/30 shrink-0 shadow-inner flex items-center justify-center text-[10px] font-bold"
                  style={{ backgroundColor: swatch.color, color: swatch.color === '#F8FAFC' ? '#1E293B' : '#FFFFFF' }}
                >
                  SWATCH
                </div>
                <div>
                  <h4 className="font-serif font-bold text-navy text-xs sm:text-sm">{swatch.name}</h4>
                  <p className="text-[11px] text-gold font-medium mt-0.5">{swatch.use}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Custom Request CTA */}
      <section className="py-14 sm:py-16 bg-navy text-white text-center border-t border-gold/20">
        <div className="max-w-2xl mx-auto px-4 space-y-3 sm:space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Can't Find Your Exact Design?</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            We manufacture 100% custom uniform designs according to your institution's brand manual and sample specifications.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenQuoteModal(null)}
              className="btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-gold-glow min-h-[48px]"
            >
              Request Custom Design & Sampling
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
