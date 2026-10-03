import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import AdminLayout from './pages/admin/AdminLayout';
import { Loader2 } from 'lucide-react';

// Route level lazy loading for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Catalogue = lazy(() => import('./pages/Catalogue'));
const Faqs = lazy(() => import('./pages/Faqs'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'));
const AdminFaqsTestimonials = lazy(() => import('./pages/admin/AdminFaqsTestimonials'));

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-ivory">
      <Loader2 className="w-10 h-10 text-gold animate-spin" />
      <span className="font-serif text-sm text-navy mt-4 font-semibold tracking-wider uppercase">
        Loading Apex Craft...
      </span>
    </div>
  );
}

// Protected Route Component for Admin Panel
function ProtectedAdminRoute({ user, children }) {
  if (!user && !localStorage.getItem('adminToken')) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminLayout user={user}>{children}</AdminLayout>;
}

export default function App() {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('adminUser');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Pages wrapped in main Layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/catalogue" element={<Layout><Catalogue /></Layout>} />
            <Route path="/faqs" element={<Layout><Faqs /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />

            {/* Admin Authentication & Management Routes */}
            <Route 
              path="/admin/login" 
              element={<AdminLogin onLoginSuccess={(u) => setAdminUser(u)} />} 
            />
            <Route 
              path="/admin" 
              element={<Navigate to="/admin/dashboard" replace />} 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedAdminRoute user={adminUser}>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } 
            />
            <Route 
              path="/admin/products" 
              element={
                <ProtectedAdminRoute user={adminUser}>
                  <AdminProducts />
                </ProtectedAdminRoute>
              } 
            />
            <Route 
              path="/admin/enquiries" 
              element={
                <ProtectedAdminRoute user={adminUser}>
                  <AdminEnquiries />
                </ProtectedAdminRoute>
              } 
            />
            <Route 
              path="/admin/faqs" 
              element={
                <ProtectedAdminRoute user={adminUser}>
                  <AdminFaqsTestimonials />
                </ProtectedAdminRoute>
              } 
            />

            {/* 404 Custom Fallback */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}
