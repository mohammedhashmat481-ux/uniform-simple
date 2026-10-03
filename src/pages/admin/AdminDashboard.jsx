import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Inbox, ShoppingBag, HelpCircle, Download, Plus, ArrowRight, Clock } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    newEnquiries: 0,
    totalProducts: 16,
    totalFaqs: 16
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success) {
          setStats(data.stats);
        }
      })
      .catch(() => {});

    fetch('/api/admin/enquiries')
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success) {
          setRecentEnquiries(data.enquiries.slice(0, 5));
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | {SITE_CONFIG.name}</title>
      </Helmet>

      <div className="space-y-8">
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enquiries</span>
              <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
                <Inbox className="w-5 h-5" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-navy">{stats.totalEnquiries}</div>
            <p className="text-xs text-slate-400">All-time bulk uniform requests</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gold/40 shadow-sm space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gold uppercase tracking-wider">New Enquiries</span>
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center font-bold">
                {stats.newEnquiries}
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-navy">{stats.newEnquiries}</div>
            <p className="text-xs text-gold font-medium">Pending initial phone / email contact</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Catalog Products</span>
              <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-navy">{stats.totalProducts}</div>
            <p className="text-xs text-slate-400">Active uniform designs</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Published FAQs</span>
              <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-navy">{stats.totalFaqs}</div>
            <p className="text-xs text-slate-400">Published answer entries</p>
          </div>

        </div>

        {/* Quick Actions & Recent Enquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Enquiries Table (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-navy">Recent Inbound Enquiries</h2>
              <Link to="/admin/enquiries" className="text-xs font-bold text-gold hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentEnquiries.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No enquiries received yet. Form submissions will appear here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Client / Organisation</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentEnquiries.map((enq) => (
                      <tr key={enq._id} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <strong className="text-navy block">{enq.fullName}</strong>
                          <span className="text-[10px] text-slate-400">{enq.organisation || 'N/A'}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-mono">{enq.phone}</td>
                        <td className="py-3 px-4 text-slate-600">{enq.uniformType}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            enq.status === 'new' ? 'bg-amber-100 text-amber-800' :
                            enq.status === 'contacted' ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {enq.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-slate-400">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Tools Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-navy text-white p-6 rounded-2xl shadow-luxury border border-gold/30 space-y-4">
              <h3 className="font-serif text-lg font-bold text-white">Management Actions</h3>
              
              <div className="space-y-3">
                <Link
                  to="/admin/products"
                  className="w-full btn-gold-sheen bg-gold text-navy font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-gold-glow"
                >
                  <Plus className="w-4 h-4" /> Add New Uniform Product
                </Link>

                <a
                  href="/api/admin/enquiries/export"
                  download
                  className="w-full bg-navy-surface hover:bg-white/10 text-white font-semibold text-xs py-3 px-4 rounded-xl border border-white/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4 text-gold" /> Export Enquiries (CSV)
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <h4 className="font-serif font-bold text-navy text-sm">Need Assistance?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                All changes made in the admin panel automatically purge the 5-minute public API cache, ensuring immediate updates on the live website.
              </p>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
