import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit, Trash2, Check, X, Upload, Loader2, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'school',
    shortDescription: '',
    fullDescription: '',
    fabric: '',
    colors: '',
    customization: '',
    featured: false,
    isActive: true,
    images: null
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchAdminProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProducts();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'school',
      shortDescription: '',
      fullDescription: '',
      fabric: '',
      colors: 'Deep Navy, Royal Blue',
      customization: 'Custom chest crest embroidery',
      featured: false,
      isActive: true,
      images: null
    });
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingId(p._id);
    setFormData({
      name: p.name,
      category: p.category,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription || p.shortDescription,
      fabric: p.fabric,
      colors: Array.isArray(p.colors) ? p.colors.join(', ') : p.colors,
      customization: p.customization || '',
      featured: p.featured,
      isActive: p.isActive,
      images: null
    });
    setError('');
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this uniform product?')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(prev => prev.filter(item => item._id !== id));
      }
    } catch (e) {
      alert('Failed to delete product');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('category', formData.category);

      const catObj = SITE_CONFIG.categories.find(c => c.id === formData.category);
      formPayload.append('categoryName', catObj ? catObj.name : formData.category);

      formPayload.append('shortDescription', formData.shortDescription);
      formPayload.append('fullDescription', formData.fullDescription);
      formPayload.append('fabric', formData.fabric);
      formPayload.append('colors', formData.colors);
      formPayload.append('customization', formData.customization);
      formPayload.append('featured', formData.featured);
      formPayload.append('isActive', formData.isActive);

      if (formData.images) {
        for (let i = 0; i < formData.images.length; i++) {
          formPayload.append('images', formData.images[i]);
        }
      }

      const url = editingId ? `/api/admin/products/${editingId}` : '/api/admin/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formPayload
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Operation failed');

      setModalOpen(false);
      fetchAdminProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Products | Admin Panel</title>
      </Helmet>

      <div className="space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-navy">Uniform Catalogue Management</h2>
            <p className="text-xs text-slate-500">Add, update, or edit uniform designs and multi-image uploads.</p>
          </div>
          <button
            onClick={openAddModal}
            className="btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-xs px-5 py-2.5 rounded-xl shadow-gold-glow flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Uniform Design
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Fabric</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p._id || p.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img 
                        src={Array.isArray(p.images) && p.images[0] ? p.images[0] : p.image} 
                        alt={p.name} 
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                      />
                      <div>
                        <strong className="text-navy block font-semibold">{p.name}</strong>
                        <span className="text-[10px] text-slate-400 truncate max-w-xs block">{p.shortDescription}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">{p.categoryName || p.category}</td>
                    <td className="py-3 px-4 text-slate-600">{p.fabric}</td>
                    <td className="py-3 px-4">
                      {p.featured ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Featured</span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                        {p.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 text-slate-600 hover:text-navy hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Product"
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

        {/* Modal Form */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gold/30 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <h3 className="font-serif text-lg font-bold text-navy">
                  {editingId ? 'Edit Uniform Product' : 'Add New Uniform Product'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {error && <div className="p-3 mb-4 bg-rose-50 text-rose-600 text-xs rounded-xl">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:border-gold focus:outline-none"
                    >
                      {SITE_CONFIG.categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Fabric Details *</label>
                    <input
                      type="text"
                      placeholder="e.g. Poly-Wool Blend (65/35)"
                      value={formData.fabric}
                      onChange={e => setFormData({ ...formData, fabric: e.target.value })}
                      className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description *</label>
                  <textarea
                    rows="2"
                    value={formData.shortDescription}
                    onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:border-gold focus:outline-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Available Colors (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={e => setFormData({ ...formData, colors: e.target.value })}
                    className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Customization Capabilities</label>
                  <input
                    type="text"
                    value={formData.customization}
                    onChange={e => setFormData({ ...formData, customization: e.target.value })}
                    className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Upload Product Images (Converted to WebP via Sharp)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={e => setFormData({ ...formData, images: e.target.files })}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-navy file:text-gold hover:file:bg-navy-light"
                  />
                </div>

                <div className="flex items-center space-x-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded text-gold focus:ring-gold"
                    />
                    <span>Featured on Home</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded text-gold focus:ring-gold"
                    />
                    <span>Active in Catalogue</span>
                  </label>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 btn-gold-sheen bg-gold text-navy font-bold text-xs py-3 rounded-xl shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Uniform Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-3 px-5 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
