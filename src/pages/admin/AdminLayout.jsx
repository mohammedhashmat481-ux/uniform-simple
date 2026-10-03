import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Inbox, 
  HelpCircle, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';
import { NeedleThreadIcon } from '../../components/common/CustomIcons';
import { SITE_CONFIG } from '../../config/siteConfig';

export default function AdminLayout({ children, user, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries', path: '/admin/enquiries', icon: Inbox },
    { name: 'Products Catalogue', path: '/admin/products', icon: ShoppingBag },
    { name: 'FAQs & Testimonials', path: '/admin/faqs', icon: HelpCircle }
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    if (onLogout) onLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-navy text-white shrink-0 border-r border-gold/20 flex flex-col justify-between p-4 sm:p-6">
        <div>
          {/* Logo */}
          <Link to="/admin/dashboard" className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6">
            <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center bg-navy-surface shadow-gold-glow">
              <NeedleThreadIcon className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-white block leading-none">APEX CRAFT</span>
              <span className="text-[10px] tracking-widest text-gold uppercase block mt-0.5 font-medium">ADMIN PANEL</span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-gold text-navy shadow-gold-glow font-bold' 
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-gold hover:underline font-semibold"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Website
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-navy-surface hover:bg-rose-950/50 text-rose-300 hover:text-rose-200 py-2.5 rounded-xl text-xs font-semibold border border-white/10 transition-all"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
              Control Center
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Logged in as <span className="font-bold text-navy">{user?.email || 'admin@gmail.com'}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Server Live
            </span>
          </div>
        </header>

        {children}
      </main>

    </div>
  );
}
