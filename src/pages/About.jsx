import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Award, 
  ShieldCheck, 
  Users, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Sparkles 
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { 
  NeedleThreadIcon, 
  ScissorsIcon, 
  MeasuringTapeIcon, 
  FabricRollIcon 
} from '../components/common/CustomIcons';

export default function About({ onOpenQuoteModal }) {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(`Hello ${SITE_CONFIG.name}, I would like to learn more about your uniform manufacturing capabilities.`)}`;

  const coreValues = [
    {
      icon: <Award className="w-8 h-8 text-gold" />,
      title: "Uncompromising Quality",
      description: "Every seam, thread, and button is subjected to rigorous 3-tier quality inspection before dispatch."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-gold" />,
      title: "Integrity & Transparency",
      description: "Clear institutional bulk pricing with zero hidden fees, upfront fabric certification, and honest delivery promises."
    },
    {
      icon: <NeedleThreadIcon className="w-8 h-8 text-gold" />,
      title: "Master Craftsmanship",
      description: "Combining traditional bespoke tailoring artistry with modern CAD laser cutting for perfect fit repeatability."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-gold" />,
      title: "Customer First Service",
      description: "Dedicated account managers, on-site measurement drives, and sorting per department or student class."
    }
  ];

  const teamMembers = [
    {
      name: "Vikramaditya Roy",
      role: "Founder & Managing Director",
      experience: "22+ Years in Textile Manufacturing",
      bio: "Pioneered automated CAD cutting and custom fabric formulation for premier educational boards across India.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Ananya Deshmukh",
      role: "Chief Textile & Design Specialist",
      experience: "16+ Years in Apparel Engineering",
      bio: "Specializes in anti-microbial healthcare scrubs and flame-resistant industrial workwear compliance.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Rajesh Kulkarni",
      role: "Head of Factory Operations",
      experience: "18+ Years in Production Control",
      bio: "Oversees daily output of 2,000+ stitched pieces with lean manufacturing and strict delivery schedules.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | {SITE_CONFIG.name} - Bespoke Uniform Tailoring</title>
        <meta name="description" content="Learn about Apex Craft Uniforms' 15+ years of heritage, manufacturing facility, core values, and dedication to institutional uniform excellence." />
      </Helmet>

      {/* Banner with Breadcrumb */}
      <section className="bg-navy py-16 border-b border-gold/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-fabric-pattern opacity-30"></div>
        <div className="max-w-site mx-auto px-4 sm:px-6 relative z-10 text-center">
          <nav className="flex justify-center text-xs text-gold/80 mb-3 font-medium uppercase tracking-wider">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2 text-slate-500">/</span>
            <span className="text-white">About Us</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Crafting Institutional Prestige Since 2009
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Where traditional tailoring heritage meets automated high-capacity garment manufacturing.
          </p>
        </div>
      </section>

      {/* Our Story (Text + Image with offset gold frame) */}
      <section className="py-20 bg-ivory relative">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Story Image with Gold Frame Offset */}
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-gold/40 rounded-3xl transform -rotate-2 hidden sm:block"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-luxury border border-gold/20 bg-navy">
                <img 
                  src="/images/about/factory.webp" 
                  alt="Apex Craft Manufacturing Workshop" 
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-navy text-white p-6 rounded-2xl shadow-luxury border border-gold/30 hidden sm:block">
                <div className="font-serif text-3xl font-bold text-gold">15+ Years</div>
                <div className="text-xs text-slate-300">Of Tailoring Mastery</div>
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <span className="text-xs font-semibold text-gold tracking-widest uppercase block">
                Our Heritage & Legacy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heading leading-tight">
                Built on Precision Fit, Premium Textiles, and Trust
              </h2>
              <div className="w-16 h-0.5 bg-gold"></div>

              <p className="text-sm text-body leading-relaxed">
                Founded with a singular vision to redefine institutional attire, Apex Craft Uniforms has grown from a specialized tailoring atelier into one of the nation's premier uniform manufacturers.
              </p>
              <p className="text-sm text-body leading-relaxed">
                We believe that a uniform is not merely apparel—it is a visual embodiment of your organization's ethos, pride, and discipline. From prestigious international academies to multi-city hospital chains and industrial facilities, we deliver garments designed to look sharp, feel comfortable, and withstand rigorous daily wear.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-navy">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>CAD Computerized Patterning</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-navy">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Color-Fast & Anti-Pill Fabric</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-navy">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>High-Density Japanese Embroidery</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-navy">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>On-Site Fitting & Size Sorting</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onOpenQuoteModal(null)}
                  className="btn-gold-sheen bg-navy hover:bg-navy-light text-gold font-bold text-sm px-7 py-3.5 rounded-xl shadow-luxury transition-all"
                >
                  Consult Our Tailoring Experts
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-16 bg-white border-y border-gold/15">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission */}
            <div className="bg-ivory p-8 sm:p-10 rounded-3xl border border-gold/20 shadow-card relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center mb-6 shadow-gold-glow">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-heading mb-4">Our Mission</h3>
              <p className="text-sm text-body leading-relaxed">
                To equip institutions and corporate organizations with world-class uniform solutions that blend luxury aesthetics, durable fabric technology, and flawless fit, delivered on time with unmatched customer satisfaction.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-navy text-white p-8 sm:p-10 rounded-3xl border border-gold/30 shadow-luxury relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-navy-surface border border-gold/40 text-gold flex items-center justify-center mb-6 shadow-gold-glow">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gold mb-4">Our Vision</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                To set the benchmark for bespoke uniform manufacturing across Asia, pioneering sustainable textile innovation, automated custom fitting, and long-term institutional partnerships.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-ivory">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-gold tracking-widest uppercase block">
              Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heading">
              Our 4 Pillars of Excellence
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((val, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-gold/40 shadow-card hover:shadow-luxury transition-all group">
                <div className="mb-6 group-hover:scale-110 transition-transform">
                  {val.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-heading mb-3 group-hover:text-navy transition-colors">
                  {val.title}
                </h3>
                <p className="text-xs text-body leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capability & Facts */}
      <section className="py-20 bg-navy text-white border-y border-gold/20 relative">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-semibold text-gold tracking-widest uppercase block">
                Infrastructure & Scale
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                State-of-the-Art Garment Manufacturing Facility
              </h2>
              <div className="w-16 h-0.5 bg-gold"></div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Spanning over 25,000 square feet of modern production floor, our facility is equipped with automated fabric spreading machines, CAD pattern plotters, 12-head embroidery lines, and steam finishing tunnels.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="bg-navy-surface p-4 rounded-xl border border-white/10">
                  <div className="font-serif text-2xl font-bold text-gold">50,000+</div>
                  <div className="text-xs text-slate-300 mt-1">Monthly Stitched Capacity</div>
                </div>
                <div className="bg-navy-surface p-4 rounded-xl border border-white/10">
                  <div className="font-serif text-2xl font-bold text-gold">200+</div>
                  <div className="text-xs text-slate-300 mt-1">Textile Mills Partners</div>
                </div>
                <div className="bg-navy-surface p-4 rounded-xl border border-white/10">
                  <div className="font-serif text-2xl font-bold text-gold">100%</div>
                  <div className="text-xs text-slate-300 mt-1">In-House QC Testing</div>
                </div>
                <div className="bg-navy-surface p-4 rounded-xl border border-white/10">
                  <div className="font-serif text-2xl font-bold text-gold">24 Hours</div>
                  <div className="text-xs text-slate-300 mt-1">Sample Turnaround</div>
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/images/about/craft.webp" 
                alt="Precision Stitching Craftsman" 
                className="rounded-2xl object-cover h-60 w-full border border-gold/30 shadow-luxury"
              />
              <img 
                src="/images/products/fabric-sample.webp" 
                alt="Fabric Swatches & Texture" 
                className="rounded-2xl object-cover h-60 w-full border border-gold/30 shadow-luxury"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Leadership Team (Placeholders) */}
      <section className="py-20 bg-ivory">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-gold tracking-widest uppercase block">
              Leadership
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-heading">
              Meet Our Tailoring Directors
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-200 hover:shadow-luxury transition-all group">
                <div className="h-64 overflow-hidden bg-slate-100">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-serif text-xl font-bold text-navy">{member.name}</h3>
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider">{member.role}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{member.experience}</p>
                  <p className="text-xs text-body pt-2 border-t border-slate-100 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise Strip */}
      <section className="py-12 bg-gold/10 border-y border-gold/30">
        <div className="max-w-site mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold text-navy flex items-center justify-center shrink-0 shadow-gold-glow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-navy">The Apex Craft Zero-Defect Guarantee</h3>
              <p className="text-xs text-slate-600 mt-0.5">Free replacement for any stitching defect or size discrepancy within 30 days of delivery.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenQuoteModal(null)}
            className="btn-gold-sheen bg-navy hover:bg-navy-light text-gold font-bold text-xs px-6 py-3 rounded-xl shrink-0"
          >
            Request Fabric Swatches
          </button>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h2 className="font-serif text-3xl font-bold text-white">Partner with India's Premier Uniform Manufacturer</h2>
          <p className="text-sm text-slate-300">Let's discuss how we can elevate your school, company, or hospital uniform standards.</p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onOpenQuoteModal(null)}
              className="btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-sm px-8 py-3.5 rounded-xl shadow-gold-glow"
            >
              Get a Free Quote
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm px-8 py-3.5 rounded-xl flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
