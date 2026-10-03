import { FEATURED_PRODUCTS, TESTIMONIALS } from '../data/dummyData';
import { ALL_CATALOGUE_PRODUCTS } from '../data/catalogueProducts';
import { FAQS_DATA } from '../data/faqsData';

const API_BASE_URL = '/api';

export const fetchProducts = async (category = 'all', search = '', featured = false) => {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    if (featured) params.append('featured', 'true');

    const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.warn('Backend API offline or unreachable, using local products cache:', error.message);
    let items = ALL_CATALOGUE_PRODUCTS;
    if (category && category !== 'all') {
      items = items.filter(p => p.category === category);
    }
    if (featured) {
      items = items.filter(p => p.featured);
    }
    if (search) {
      items = items.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.shortDescription.toLowerCase().includes(search.toLowerCase()));
    }
    return items;
  }
};

export const fetchFaqs = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/faqs`);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return data.faqs;
  } catch (error) {
    console.warn('Backend API offline, using local FAQs fallback');
    return FAQS_DATA.map((f, idx) => ({ _id: `faq-${idx}`, ...f }));
  }
};

export const fetchTestimonials = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials`);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return data.testimonials;
  } catch (error) {
    console.warn('Backend API offline, using local testimonials fallback');
    return TESTIMONIALS;
  }
};

export const submitEnquiry = async (enquiryData) => {
  const res = await fetch(`${API_BASE_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiryData)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to submit enquiry');
  }
  return data;
};
