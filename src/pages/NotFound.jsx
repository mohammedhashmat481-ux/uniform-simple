import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { NeedleThreadIcon } from '../components/common/CustomIcons';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Apex Craft Uniforms</title>
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-ivory">
        <div className="w-20 h-20 rounded-full bg-navy/10 text-gold flex items-center justify-center mb-6 border border-gold/30 shadow-gold-glow">
          <NeedleThreadIcon className="w-10 h-10 text-gold" />
        </div>
        <h1 className="font-serif text-6xl font-bold text-navy">404</h1>
        <h2 className="font-serif text-2xl font-bold text-heading mt-2">Pattern Not Found</h2>
        <p className="text-body text-sm max-w-md mt-3">
          The page or uniform design you are looking for doesn't exist or may have been moved.
        </p>
        <Link
          to="/"
          className="mt-8 btn-gold-sheen bg-gold hover:bg-gold-light text-navy font-bold text-sm px-8 py-3.5 rounded-xl shadow-gold-glow transition-all"
        >
          Return to Homepage
        </Link>
      </div>
    </>
  );
}
