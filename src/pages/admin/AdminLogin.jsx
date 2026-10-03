import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { NeedleThreadIcon } from '../../components/common/CustomIcons';
import { SITE_CONFIG } from '../../config/siteConfig';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid admin credentials');
      }

      // Store in localStorage as fallback session indicator
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));

      if (onLoginSuccess) onLoginSuccess(data.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Portal Login | {SITE_CONFIG.name}</title>
      </Helmet>

      <div className="min-h-screen bg-navy-dark flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-fabric-pattern opacity-40"></div>

        <div className="relative z-10 w-full max-w-md bg-navy text-white rounded-3xl p-8 shadow-2xl border border-gold/30">
          
          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 rounded-full border-2 border-gold/40 flex items-center justify-center bg-navy-surface mx-auto shadow-gold-glow">
              <NeedleThreadIcon className="w-7 h-7 text-gold" />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-white">
              Apex Craft Admin Portal
            </h1>
            <p className="text-xs text-gold tracking-widest uppercase font-sans">
              Management Portal Access
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-rose-950/80 border border-rose-500/50 rounded-xl text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-navy-surface text-white focus:border-gold focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-navy-surface text-white focus:border-gold focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-sm py-3.5 rounded-xl shadow-gold-glow flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-white/10 text-center text-[11px] text-slate-400">
            <p>Protected System • Authorized Staff Only</p>
            <p className="mt-1 text-slate-500">Default Credentials: admin@gmail.com / admin@123</p>
          </div>

        </div>
      </div>
    </>
  );
}
