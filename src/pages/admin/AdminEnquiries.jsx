import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Download, Trash2, Eye, X, Phone, Mail, CheckCircle2, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const fetchEnquiries = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, search]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setEnquiries(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry record?')) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEnquiries(prev => prev.filter(item => item._id !== id));
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry(null);
        }
      }
    } catch (e) {
      alert('Failed to delete enquiry');
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Enquiries | Admin Panel</title>
      </Helmet>

      <div className="space-y-6">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-navy">Institutional Enquiries Management</h2>
            <p className="text-xs text-slate-500">Track and manage customer quote requests and phone follow-ups.</p>
          </div>

          <a
            href="/api/admin/enquiries/export"
            download
            className="btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-xs px-5 py-2.5 rounded-xl shadow-gold-glow flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download CSV Report
          </a>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {['all', 'new', 'contacted', 'closed'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  statusFilter === st
                    ? 'bg-navy text-gold font-bold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, or org..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:border-gold focus:outline-none"
            />
          </div>

        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Client Name & Org</th>
                  <th className="py-3.5 px-4">Contact Details</th>
                  <th className="py-3.5 px-4">Uniform Type</th>
                  <th className="py-3.5 px-4">Quantity</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <strong className="text-navy block font-semibold">{enq.fullName}</strong>
                      <span className="text-[10px] text-slate-400">{enq.organisation || 'Individual'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-700 font-mono text-[11px]">{enq.phone}</div>
                      <div className="text-slate-400 text-[10px]">{enq.email}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{enq.uniformType}</td>
                    <td className="py-3 px-4 text-slate-700 font-bold">{enq.approxQuantity || '-'}</td>
                    <td className="py-3 px-4">
                      <select
                        value={enq.status}
                        onChange={e => handleStatusChange(enq._id, e.target.value)}
                        className={`text-[10px] font-bold uppercase py-1 px-2 rounded-lg border focus:outline-none ${
                          enq.status === 'new' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                          enq.status === 'contacted' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                          'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="closed">CLOSED</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="p-1.5 text-navy hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(enq._id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gold/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-serif text-lg font-bold text-navy">Enquiry Full Details</h3>
                <button onClick={() => setSelectedEnquiry(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Client Name & Org</span>
                  <strong className="text-base text-navy font-serif">{selectedEnquiry.fullName}</strong>
                  {selectedEnquiry.organisation && <p className="text-slate-600 font-medium">{selectedEnquiry.organisation}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4 bg-ivory p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Phone / WhatsApp</span>
                    <a href={`tel:${selectedEnquiry.phone}`} className="text-navy font-bold hover:underline flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-gold" /> {selectedEnquiry.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Email</span>
                    <a href={`mailto:${selectedEnquiry.email}`} className="text-navy font-bold hover:underline flex items-center gap-1 mt-0.5 truncate">
                      <Mail className="w-3 h-3 text-gold" /> {selectedEnquiry.email}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Uniform Category</span>
                    <p className="font-semibold text-navy">{selectedEnquiry.uniformType}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Quantity</span>
                    <p className="font-semibold text-navy">{selectedEnquiry.approxQuantity || 'N/A'}</p>
                  </div>
                </div>

                {selectedEnquiry.productName && (
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Specific Product Interest</span>
                    <p className="font-semibold text-gold">{selectedEnquiry.productName}</p>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase mb-1">Message / Specifications</span>
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-700 leading-relaxed border border-slate-200">
                    {selectedEnquiry.message || 'No additional notes provided.'}
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedEnquiry.fullName}, this is Apex Craft Uniforms regarding your enquiry for ${selectedEnquiry.uniformType}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" /> Open WhatsApp Chat
                  </a>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
