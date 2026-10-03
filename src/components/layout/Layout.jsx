import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import QuoteModal from '../common/QuoteModal';

export default function Layout({ children }) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenQuoteModal = (product = null) => {
    setSelectedProduct(product);
    setQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setQuoteModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-ivory text-body font-sans">
      <Header onOpenQuoteModal={() => handleOpenQuoteModal(null)} />
      
      <main className="flex-grow">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { onOpenQuoteModal: handleOpenQuoteModal });
          }
          return child;
        })}
      </main>

      <Footer />
      <FloatingButtons onOpenQuoteModal={() => handleOpenQuoteModal(null)} />

      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={handleCloseQuoteModal} 
        initialProduct={selectedProduct} 
      />
    </div>
  );
}
