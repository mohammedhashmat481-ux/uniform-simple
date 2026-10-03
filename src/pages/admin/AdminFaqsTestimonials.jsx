import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit, Trash2, HelpCircle, Star, X, Loader2 } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export default function AdminFaqsTestimonials() {
  const [faqs, setFaqs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeTab, setActiveTab] = useState('faqs');

  // FAQ Modal
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', category: 'Ordering & Bulk Orders', order: 1 });

  // Testimonial Modal
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [editingTestId, setEditingTestId] = useState(null);
  const [testForm, setTestForm] = useState({ quote: '', name: '', title: '', organization: '', rating: 5, avatar: '' });

  const [saving, setSaving] = useState(false);

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/admin/faqs');
      const data = await res.json();
      if (data.success) setFaqs(data.faqs);
    } catch (e) {}
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      if (data.success) setTestimonials(data.testimonials);
    } catch (e) {}
  };

  useEffect(() => {
    fetchFaqs();
    fetchTestimonials();
  }, []);

  // FAQ Handlers
  const handleSaveFaq = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingFaqId ? `/api/admin/faqs/${editingFaqId}` : '/api/admin/faqs';
      const method = editingFaqId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqForm)
      });
      if (res.ok) {
        setFaqModalOpen(false);
        fetchFaqs();
      }
    } catch (e) {
      alert('Error saving FAQ');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm('Delete FAQ item?')) return;
    await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
    setFaqs(prev => prev.filter(f => f._id !== id));
  };

  // Testimonial Handlers
  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingTestId ? `/api/admin/testimonials/${editingTestId}` : '/api/admin/testimonials';
      const method = editingTestId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testForm)
      });
      if (res.ok) {
        setTestModalOpen(false);
        fetchTestimonials();
      }
    } catch (e) {
      alert('Error saving testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete testimonial?')) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    setTestimonials(prev => prev.filter(t => t._id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Manage FAQs & Reviews | Admin Panel</title>
      </Helmet>

      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-slate-200 w-fit">
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'faqs' ? 'bg-navy text-gold shadow-sm' : 'text-slate-600 hover:text-navy'
              }`}
            >
              Frequently Asked Questions ({faqs.length})
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'testimonials' ? 'bg-navy text-gold shadow-sm' : 'text-slate-600 hover:text-navy'
              }`}
            >
              Client Reviews ({testimonials.length})
            </button>
          </div>

          {activeTab === 'faqs' ? (
            <button
              onClick={() => {
                setEditingFaqId(null);
                setFaqForm({ question: '', answer: '', category: 'Ordering & Bulk Orders', order: faqs.length + 1 });
                setFaqModalOpen(true);
              }}
              className="btn-gold-sheen bg-gold text-navy font-bold text-xs px-5 py-2.5 rounded-xl shadow-gold-glow flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add FAQ Entry
            </button>
          ) : (
            <button
              onClick={() => {
                setEditingTestId(null);
                setTestForm({ quote: '', name: '', title: '', organization: '', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' });
                setTestModalOpen(true);
              }}
              className="btn-gold-sheen bg-gold text-navy font-bold text-xs px-5 py-2.5 rounded-xl shadow-gold-glow flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          )}
        </div>

        {/* FAQS TAB */}
        {activeTab === 'faqs' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            {faqs.map((faq) => (
              <div key={faq._id || faq.id} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gold uppercase tracking-wider">{faq.category}</span>
                  <h4 className="font-serif font-bold text-navy text-sm">{faq.question}</h4>
                  <p className="text-xs text-slate-600">{faq.answer}</p>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditingFaqId(faq._id);
                      setFaqForm({ question: faq.question, answer: faq.answer, category: faq.category, order: faq.order || 1 });
                      setFaqModalOpen(true);
                    }}
                    className="p-1.5 text-slate-500 hover:text-navy hover:bg-slate-100 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(faq._id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t._id || t.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        setEditingTestId(t._id);
                        setTestForm({ quote: t.quote, name: t.name, title: t.title, organization: t.organization, rating: t.rating, avatar: t.avatar });
                        setTestModalOpen(true);
                      }}
                      className="p-1 text-slate-500 hover:text-navy"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteTestimonial(t._id)} className="p-1 text-rose-500 hover:text-rose-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-700 italic">"{t.quote}"</p>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-gold" />
                  <div>
                    <h5 className="font-serif font-bold text-navy text-xs">{t.name}</h5>
                    <p className="text-[10px] text-slate-400">{t.title}, {t.organization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FAQ Modal */}
        {faqModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gold/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-serif font-bold text-navy text-base">{editingFaqId ? 'Edit FAQ' : 'Add FAQ'}</h3>
                <button onClick={() => setFaqModalOpen(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSaveFaq} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Question *</label>
                  <input
                    type="text"
                    value={faqForm.question}
                    onChange={e => setFaqForm({ ...faqForm, question: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Category *</label>
                  <select
                    value={faqForm.category}
                    onChange={e => setFaqForm({ ...faqForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    <option value="Ordering & Bulk Orders">Ordering & Bulk Orders</option>
                    <option value="Customisation & Fabric">Customisation & Fabric</option>
                    <option value="Pricing & Payment">Pricing & Payment</option>
                    <option value="Delivery & Timelines">Delivery & Timelines</option>
                    <option value="Sizing / Returns / Alterations">Sizing / Returns / Alterations</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Answer *</label>
                  <textarea
                    rows="4"
                    value={faqForm.answer}
                    onChange={e => setFaqForm({ ...faqForm, answer: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    required
                  ></textarea>
                </div>

                <div className="pt-2 flex gap-3">
                  <button type="submit" disabled={saving} className="flex-1 bg-gold text-navy font-bold py-2.5 rounded-xl shadow-gold-glow">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Save FAQ'}
                  </button>
                  <button type="button" onClick={() => setFaqModalOpen(false)} className="bg-slate-100 px-4 rounded-xl">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Testimonial Modal */}
        {testModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gold/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-serif font-bold text-navy text-base">{editingTestId ? 'Edit Review' : 'Add Review'}</h3>
                <button onClick={() => setTestModalOpen(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSaveTestimonial} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Client Quote *</label>
                  <textarea
                    rows="3"
                    value={testForm.quote}
                    onChange={e => setTestForm({ ...testForm, quote: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={testForm.name}
                      onChange={e => setTestForm({ ...testForm, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Title / Designation *</label>
                    <input
                      type="text"
                      value={testForm.title}
                      onChange={e => setTestForm({ ...testForm, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Organization *</label>
                  <input
                    type="text"
                    value={testForm.organization}
                    onChange={e => setTestForm({ ...testForm, organization: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    required
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button type="submit" disabled={saving} className="flex-1 bg-gold text-navy font-bold py-2.5 rounded-xl shadow-gold-glow">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Save Review'}
                  </button>
                  <button type="button" onClick={() => setTestModalOpen(false)} className="bg-slate-100 px-4 rounded-xl">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
