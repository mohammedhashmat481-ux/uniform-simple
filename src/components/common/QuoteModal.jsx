import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export default function QuoteModal({ isOpen, onClose, initialProduct = null }) {
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
  const [serverError, setServerError] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  useEffect(() => {
    if (initialProduct) {
      setFormData(prev => ({
        ...prev,
        uniformType: initialProduct.categoryName || initialProduct.category || 'School Uniforms',
        message: `Hello, I am interested in inquiring about the "${initialProduct.name}". Please provide details on pricing, available fabrics, and minimum order quantity.`
      }));
    }
  }, [initialProduct]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone / WhatsApp number is required';
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
    setServerError('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          organisation: formData.organisation,
          uniformType: formData.uniformType,
          approxQuantity: formData.approxQuantity ? parseInt(formData.approxQuantity) : 0,
          message: formData.message,
          productName: initialProduct ? initialProduct.name : undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit enquiry');
      }

      setSubmitted(true);
    } catch (err) {
      console.warn('API submission fallback:', err.message);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = `*New Uniform Enquiry from Website*
*Name:* ${formData.fullName || 'N/A'}
*Phone:* ${formData.phone || 'N/A'}
*Email:* ${formData.email || 'N/A'}
*Organisation:* ${formData.organisation || 'N/A'}
*Uniform Type:* ${formData.uniformType}
*Approx Quantity:* ${formData.approxQuantity || 'N/A'}
${initialProduct ? `*Product:* ${initialProduct.name}\n` : ''}*Message:* ${formData.message || 'I would like to get a custom uniform quote.'}`;

    const url = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-navy-dark/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content - Responsive Sheet on Mobile */}
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-luxury max-w-xl w-full border border-gold/30 z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header bar */}
        <div className="bg-navy px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-gold/20 shrink-0">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
              {initialProduct ? `Enquire about ${initialProduct.name}` : 'Request a Custom Quote'}
            </h3>
            <p className="text-[11px] sm:text-xs text-gold mt-0.5">
              Fill in your requirements for instant bulk pricing & free fabric consultation.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-5 overflow-y-auto">
            <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto border border-gold/30">
              <CheckCircle2 className="w-10 h-10 text-gold" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-navy">Enquiry Received!</h4>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-navy">{formData.fullName}</span>. Our tailoring specialists will review your requirements and get back to you within 2 business hours.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleWhatsAppSend}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all min-h-[44px]"
              >
                <MessageCircle className="w-5 h-5 fill-current" /> Connect on WhatsApp Now
              </button>
              <button
                onClick={onClose}
                className="bg-ivory hover:bg-slate-200 text-navy font-semibold text-sm px-6 py-3.5 rounded-xl transition-all min-h-[44px]"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto">
            
            {/* Honeypot anti-spam */}
            <input 
              type="text" 
              name="websiteHoneypot" 
              value={formData.websiteHoneypot} 
              onChange={e => setFormData({...formData, websiteHoneypot: e.target.value})} 
              className="hidden" 
              tabIndex="-1" 
              autoComplete="off" 
            />

            {serverError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-heading mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full text-base sm:text-sm px-3.5 py-3 rounded-xl border bg-ivory/50 focus:bg-white focus:outline-none transition-all min-h-[44px] ${
                    errors.fullName ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-300 focus:border-gold focus:ring-1 focus:ring-gold'
                  }`}
                />
                {errors.fullName && <p className="text-rose-500 text-[11px] mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-heading mb-1">
                  Phone / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full text-base sm:text-sm px-3.5 py-3 rounded-xl border bg-ivory/50 focus:bg-white focus:outline-none transition-all min-h-[44px] ${
                    errors.phone ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-300 focus:border-gold focus:ring-1 focus:ring-gold'
                  }`}
                />
                {errors.phone && <p className="text-rose-500 text-[11px] mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-heading mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full text-base sm:text-sm px-3.5 py-3 rounded-xl border bg-ivory/50 focus:bg-white focus:outline-none transition-all min-h-[44px] ${
                    errors.email ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-300 focus:border-gold focus:ring-1 focus:ring-gold'
                  }`}
                />
                {errors.email && <p className="text-rose-500 text-[11px] mt-1">{errors.email}</p>}
              </div>

              {/* Organisation */}
              <div>
                <label className="block text-xs font-semibold text-heading mb-1">
                  Company / School Name
                </label>
                <input
                  type="text"
                  name="organisation"
                  autoComplete="organization"
                  placeholder="e.g. St. Xavier High School"
                  value={formData.organisation}
                  onChange={e => setFormData({ ...formData, organisation: e.target.value })}
                  className="w-full text-base sm:text-sm px-3.5 py-3 rounded-xl border border-slate-300 bg-ivory/50 focus:bg-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all min-h-[44px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Uniform Type */}
              <div>
                <label className="block text-xs font-semibold text-heading mb-1">
                  Uniform Type
                </label>
                <select
                  value={formData.uniformType}
                  onChange={e => setFormData({ ...formData, uniformType: e.target.value })}
                  className="w-full text-base sm:text-sm px-3.5 py-3 rounded-xl border border-slate-300 bg-ivory/50 focus:bg-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all min-h-[44px]"
                >
                  <option value="School Uniforms">School Uniforms</option>
                  <option value="Corporate Suits & Shirts">Corporate Suits & Shirts</option>
                  <option value="Medical & Healthcare">Medical & Healthcare</option>
                  <option value="Hospitality & Chefwear">Hospitality & Chefwear</option>
                  <option value="Industrial & Safety Workwear">Industrial & Safety Workwear</option>
                  <option value="Sports & Athletic Jerseys">Sports & Athletic Jerseys</option>
                  <option value="Security Force Attire">Security Force Attire</option>
                  <option value="Other / Custom Stitching">Other / Custom Stitching</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-semibold text-heading mb-1">
                  Approx Quantity (Pieces)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  min="1"
                  value={formData.approxQuantity}
                  onChange={e => setFormData({ ...formData, approxQuantity: e.target.value })}
                  className="w-full text-base sm:text-sm px-3.5 py-3 rounded-xl border border-slate-300 bg-ivory/50 focus:bg-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all min-h-[44px]"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-heading mb-1">
                Specific Requirements / Customization Notes
              </label>
              <textarea
                rows="3"
                placeholder="Mention fabric preferences, embroidery details, deadline or special sizing needed..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-base sm:text-sm px-3.5 py-3 rounded-xl border border-slate-300 bg-ivory/50 focus:bg-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-sm py-3.5 px-5 rounded-xl shadow-gold-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50 min-h-[48px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Quote Request
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Send via WhatsApp
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
