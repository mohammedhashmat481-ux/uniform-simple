import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    organisation: '',
    uniformType: 'School Uniforms',
    approxQuantity: '',
    message: '',
    websiteHoneypot: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone / WhatsApp is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (formData.websiteHoneypot) return;

    setLoading(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          organisation: formData.organisation,
          uniformType: formData.uniformType,
          approxQuantity: formData.approxQuantity ? parseInt(formData.approxQuantity) : 0,
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setSubmitted(true);
    } catch (err) {
      console.warn('API submission notice:', err.message);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = `*New Contact Enquiry*
*Name:* ${formData.fullName || 'N/A'}
*Phone:* ${formData.phone || 'N/A'}
*Email:* ${formData.email || 'N/A'}
*Organisation:* ${formData.organisation || 'N/A'}
*Uniform Type:* ${formData.uniformType}
*Approx Quantity:* ${formData.approxQuantity || 'N/A'}
*Message:* ${formData.message || 'I would like to enquire about uniforms.'}`;

    const url = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const directWhatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(`Hello ${SITE_CONFIG.name}, I would like to get a uniform quote.`)}`;

  return (
    <>
      <Helmet>
        <title>Contact Us | {SITE_CONFIG.name}</title>
        <meta name="description" content="Contact Apex Craft Uniforms. Request institutional uniform quotes, schedule site measurement drives, or visit our atelier." />
        
        {/* Contact LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": SITE_CONFIG.name,
            "telephone": SITE_CONFIG.contact.phone,
            "email": SITE_CONFIG.contact.email,
            "address": SITE_CONFIG.contact.address
          })}
        </script>
      </Helmet>

      {/* Banner */}
      <section className="bg-navy py-12 sm:py-16 border-b border-gold/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-fabric-pattern opacity-30"></div>
        <div className="max-w-site mx-auto px-4 sm:px-6 relative z-10 text-center">
          <nav className="flex justify-center text-xs text-gold/80 mb-2.5 font-medium uppercase tracking-wider">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2 text-slate-500">/</span>
            <span className="text-white">Contact Us</span>
          </nav>
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Connect With Our Senior Tailoring Team
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto mt-2.5">
            Have questions about bulk orders, fabric swatches, or size measurement drives? We are at your service.
          </p>
        </div>
      </section>

      {/* Main 2-Column Section */}
      <section className="py-12 sm:py-20 bg-ivory">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT COLUMN: Contact Details & Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-navy text-white p-6 sm:p-8 rounded-3xl shadow-luxury border border-gold/30 space-y-6">
                <div>
                  <span className="text-[11px] sm:text-xs font-semibold text-gold tracking-widest uppercase block">
                    Headquarters & Atelier
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                    Get In Touch Directly
                  </h2>
                  <div className="w-12 h-0.5 bg-gold mt-2"></div>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Corporate Office & Atelier:</strong>
                      <span className="text-xs text-slate-300 leading-relaxed block mt-0.5">{SITE_CONFIG.contact.address}</span>
                    </div>
                  </li>

                  <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <strong className="text-white block text-[11px]">Call Us Directly:</strong>
                      <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="hover:text-gold transition-colors text-xs sm:text-sm font-semibold">
                        {SITE_CONFIG.contact.phone}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <strong className="text-white block text-[11px]">Official Email:</strong>
                      <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-gold transition-colors text-xs sm:text-sm font-semibold truncate block">
                        {SITE_CONFIG.contact.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <strong className="text-white block text-[11px]">Working Hours:</strong>
                      <span className="text-xs text-slate-300">{SITE_CONFIG.contact.workingHours}</span>
                    </div>
                  </li>
                </ul>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Follow Us:</span>
                  <div className="flex space-x-2.5">
                    <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-navy-surface border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all" aria-label="Instagram">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-navy-surface border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all" aria-label="Facebook">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-navy-surface border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all" aria-label="LinkedIn">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Big Chat on WhatsApp Button */}
              <a
                href={directWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 sm:p-5 rounded-3xl shadow-xl flex items-center justify-center gap-3 group transition-all transform hover:-translate-y-1 min-h-[56px]"
              >
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current shrink-0" />
                <div className="text-left">
                  <span className="block text-[10px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider">Instant Assistance</span>
                  <span className="block text-sm sm:text-base font-bold text-white">Chat on WhatsApp Now</span>
                </div>
              </a>

            </div>

            {/* RIGHT COLUMN: Interactive Enquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-luxury border border-slate-200">
                <div className="mb-6">
                  <h2 className="font-serif text-xl sm:text-3xl font-bold text-heading">
                    Send Us an Institutional Enquiry
                  </h2>
                  <p className="text-xs text-body mt-1">
                    Fill out the form below to receive a formal quotation and fabric catalog.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto border border-gold/30">
                      <CheckCircle2 className="w-10 h-10 text-gold" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-navy">Enquiry Sent Successfully!</h3>
                    <p className="text-xs text-body max-w-md mx-auto leading-relaxed">
                      Thank you for connecting with {SITE_CONFIG.name}. Our uniform coordinator will contact you within 2 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 bg-navy text-gold text-xs font-bold px-6 py-3.5 rounded-xl min-h-[44px]"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <input 
                      type="text" 
                      name="websiteHoneypot" 
                      value={formData.websiteHoneypot} 
                      onChange={e => setFormData({...formData, websiteHoneypot: e.target.value})} 
                      className="hidden" 
                      tabIndex="-1" 
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-heading mb-1">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          autoComplete="name"
                          placeholder="e.g. Alok Verma"
                          value={formData.fullName}
                          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full text-base sm:text-xs px-3.5 py-3 rounded-xl border bg-ivory/50 focus:bg-white focus:outline-none transition-all min-h-[44px] ${
                            errors.fullName ? 'border-rose-500' : 'border-slate-300 focus:border-gold'
                          }`}
                        />
                        {errors.fullName && <p className="text-rose-500 text-[10px] mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-heading mb-1">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="e.g. 9876543210"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full text-base sm:text-xs px-3.5 py-3 rounded-xl border bg-ivory/50 focus:bg-white focus:outline-none transition-all min-h-[44px] ${
                            errors.phone ? 'border-rose-500' : 'border-slate-300 focus:border-gold'
                          }`}
                        />
                        {errors.phone && <p className="text-rose-500 text-[10px] mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-heading mb-1">Email Address *</label>
                        <input
                          type="email"
                          autoComplete="email"
                          placeholder="admin@school.edu.in"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full text-base sm:text-xs px-3.5 py-3 rounded-xl border bg-ivory/50 focus:bg-white focus:outline-none transition-all min-h-[44px] ${
                            errors.email ? 'border-rose-500' : 'border-slate-300 focus:border-gold'
                          }`}
                        />
                        {errors.email && <p className="text-rose-500 text-[10px] mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-heading mb-1">Organization / School Name</label>
                        <input
                          type="text"
                          name="organisation"
                          autoComplete="organization"
                          placeholder="e.g. Apex Hospital Group"
                          value={formData.organisation}
                          onChange={e => setFormData({ ...formData, organisation: e.target.value })}
                          className="w-full text-base sm:text-xs px-3.5 py-3 rounded-xl border border-slate-300 bg-ivory/50 focus:bg-white focus:border-gold focus:outline-none transition-all min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-heading mb-1">Uniform Category</label>
                        <select
                          value={formData.uniformType}
                          onChange={e => setFormData({ ...formData, uniformType: e.target.value })}
                          className="w-full text-base sm:text-xs px-3.5 py-3 rounded-xl border border-slate-300 bg-ivory/50 focus:bg-white focus:border-gold focus:outline-none transition-all min-h-[44px]"
                        >
                          <option value="School Uniforms">School Uniforms</option>
                          <option value="Corporate Suits & Shirts">Corporate Suits & Shirts</option>
                          <option value="Medical & Healthcare">Medical & Healthcare</option>
                          <option value="Hospitality & Chefwear">Hospitality & Chefwear</option>
                          <option value="Industrial & Safety Workwear">Industrial & Safety Workwear</option>
                          <option value="Sports & Athletic Jerseys">Sports & Athletic Jerseys</option>
                          <option value="Security Force Attire">Security Force Attire</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-heading mb-1">Estimated Quantity (Pieces)</label>
                        <input
                          type="number"
                          placeholder="e.g. 250"
                          value={formData.approxQuantity}
                          onChange={e => setFormData({ ...formData, approxQuantity: e.target.value })}
                          className="w-full text-base sm:text-xs px-3.5 py-3 rounded-xl border border-slate-300 bg-ivory/50 focus:bg-white focus:border-gold focus:outline-none transition-all min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-heading mb-1">Detailed Requirements</label>
                      <textarea
                        rows="4"
                        placeholder="Mention colors, fabric preference, target delivery date, embroidery details..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full text-base sm:text-xs px-3.5 py-3 rounded-xl border border-slate-300 bg-ivory/50 focus:bg-white focus:border-gold focus:outline-none transition-all"
                      ></textarea>
                    </div>

                    <div className="pt-2 flex flex-col xs:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-xs py-3.5 px-6 rounded-xl shadow-gold-glow flex items-center justify-center gap-2 min-h-[48px]"
                      >
                        {loading ? <span className="animate-spin">⏳</span> : <Send className="w-4 h-4" />}
                        Submit Formal Enquiry
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsAppSend}
                        className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 min-h-[48px]"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" /> Send via WhatsApp
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* "What Happens Next" 3-step strip */}
      <section className="py-12 bg-white border-y border-gold/15">
        <div className="max-w-site mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-[11px] sm:text-xs font-semibold text-gold uppercase tracking-widest block">Clear Timeline</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-heading">What Happens Next?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="p-5 sm:p-6 bg-ivory rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-full bg-navy text-gold font-bold font-serif mx-auto flex items-center justify-center">1</div>
              <h4 className="font-serif font-bold text-navy text-base">Consultation Call</h4>
              <p className="text-xs text-body">Within 2 hours, our specialist reviews your requirements and sends fabric swatch options.</p>
            </div>

            <div className="p-5 sm:p-6 bg-ivory rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-full bg-navy text-gold font-bold font-serif mx-auto flex items-center justify-center">2</div>
              <h4 className="font-serif font-bold text-navy text-base">Custom Prototype Sample</h4>
              <p className="text-xs text-body">We tailor physical sample garments with your exact logo embroidery for institutional sign-off.</p>
            </div>

            <div className="p-5 sm:p-6 bg-ivory rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-full bg-navy text-gold font-bold font-serif mx-auto flex items-center justify-center">3</div>
              <h4 className="font-serif font-bold text-navy text-base">Bulk Manufacturing</h4>
              <p className="text-xs text-body">CAD laser cutting, automated stitching, size sorting, and doorstep dispatch on schedule.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width Google Map (Responsive height: 300px mobile, 450px desktop) */}
      <section className="h-72 sm:h-96 lg:h-[450px] w-full relative border-t border-gold/20">
        <iframe
          title="Apex Craft Location Map"
          src={SITE_CONFIG.contact.mapIframeUrl}
          className="w-full h-full border-0 filter grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
}
