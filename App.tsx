import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { ProductModal } from './components/ProductModal';
import { Process } from './components/Process';
import { ExportDocumentation } from './components/ExportDocumentation';
import { Gallery } from './components/Gallery';
import { AskAssistant } from './components/AskAssistant';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BuyerReviews } from './components/BuyerReviews';
import { Team } from './components/Team';
import { Faq } from './components/Faq';
import { HarvestCalendar } from './components/HarvestCalendar';
import { InquirySection } from './components/InquirySection';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';
import { ToastContainer, ToastItem } from './components/Toast';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CONTACT_INFO, Product, PRODUCTS } from './data/orchafreshData';
import { InquiryItem, Language } from './types';
import { recordWebsiteVisit } from './utils/visitorTracker';

const STORAGE_KEY_CART = 'orchafresh_inquiry_cart';
const STORAGE_KEY_LANG = 'orchafresh_language';
const STORAGE_KEY_THEME = 'orchafresh_theme';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    // Default initial items
    return [
      { id: 'mango-default', name: 'Mango (Own Farm)', quantity: 500, unit: 'kg' },
      { id: 'tomato-default', name: 'Tomato (Own Farm)', quantity: 1000, unit: 'kg' }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch (e) {}
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY_LANG) as Language;
      if (savedLang === 'bn' || savedLang === 'en') {
        setLang(savedLang);
      }
    } catch (e) {}
  }, []);

  // Record visitor analytics telemetry
  useEffect(() => {
    recordWebsiteVisit();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(inquiryItems));
    } catch (e) {}
  }, [inquiryItems]);

  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return (
      typeof window !== 'undefined' &&
      (window.location.pathname === '/admin' || window.location.hash === '#admin')
    );
  });

  const [managedProducts, setManagedProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('orchafresh_managed_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return PRODUCTS;
  });

  useEffect(() => {
    const handlePopState = () => {
      setIsAdminRoute(
        window.location.pathname === '/admin' || window.location.hash === '#admin'
      );
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, newLang);
    } catch (e) {}
  };

  const handleToggleLang = () => {
    const nextLang = lang === 'en' ? 'bn' : 'en';
    handleSetLang(nextLang);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'info' = 'success',
    actionLabel?: string,
    onAction?: () => void
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastItem = {
      id,
      title,
      message,
      type,
      actionLabel,
      onAction,
    };
    setToasts((prev) => [...prev.slice(-3), newToast]); // Keep max 4 toasts at once

    // Auto-dismiss after 3.8s
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const handleQuickAdd = (productName: string) => {
    setInquiryItems((prev) => {
      const existing = prev.find((i) => i.name.toLowerCase() === productName.toLowerCase());
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + 250 } : i
        );
      }
      return [
        ...prev,
        {
          id: `${productName}-${Date.now()}`,
          name: productName,
          quantity: 500,
          unit: 'kg',
        },
      ];
    });

    showToast(
      lang === 'bn' ? 'কোটেশন তালিকায় যোগ করা হয়েছে' : 'Added to Inquiry',
      lang === 'bn'
        ? `${productName} (৫০০ কেজি) সফলভাবে ইনকোয়ারি বাস্কেটে যুক্ত হয়েছে।`
        : `${productName} (500 kg) has been added to your quotation list.`,
      'success',
      lang === 'bn' ? 'বাস্কেট দেখুন' : 'View Basket',
      () => scrollToSection('inquiry')
    );
  };

  const handleModalAdd = (
    product: Product,
    quantity: number,
    unit: 'kg' | 'metric_ton' | 'cartons'
  ) => {
    setInquiryItems((prev) => {
      const existing = prev.find((i) => i.name.toLowerCase() === product.n.toLowerCase());
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + quantity, unit } : i
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          name: product.n,
          quantity,
          unit,
        },
      ];
    });

    showToast(
      lang === 'bn' ? 'কোটেশন তালিকায় যোগ করা হয়েছে' : 'Added to Inquiry',
      lang === 'bn'
        ? `${product.n} (${quantity} ${unit}) সফলভাবে ইনকোয়ারি বাস্কেটে যুক্ত হয়েছে।`
        : `${product.n} (${quantity} ${unit}) has been added to your quotation list.`,
      'success',
      lang === 'bn' ? 'বাস্কেট দেখুন' : 'View Basket',
      () => scrollToSection('inquiry')
    );
  };

  const handleRemoveItem = (id: string) => {
    const itemToRemove = inquiryItems.find((i) => i.id === id);
    setInquiryItems((prev) => prev.filter((i) => i.id !== id));

    if (itemToRemove) {
      showToast(
        lang === 'bn' ? 'পণ্য মুছে ফেলা হয়েছে' : 'Item Removed',
        lang === 'bn'
          ? `${itemToRemove.name} ইনকোয়ারি তালিকা থেকে সরানো হয়েছে।`
          : `${itemToRemove.name} was removed from your inquiry list.`,
        'info'
      );
    }
  };

  const handleUpdateQuantity = (
    id: string,
    quantity: number,
    unit: InquiryItem['unit']
  ) => {
    setInquiryItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity, unit } : i))
    );
  };

  const handleAddCustomItem = (name: string) => {
    setInquiryItems((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name,
        quantity: 500,
        unit: 'kg',
      },
    ]);

    showToast(
      lang === 'bn' ? 'কাস্টম পণ্য যোগ করা হয়েছে' : 'Custom Item Added',
      lang === 'bn'
        ? `${name} (৫০০ কেজি) ইনকোয়ারি তালিকায় যুক্ত হয়েছে।`
        : `${name} (500 kg) has been added to your quotation list.`,
      'success',
      lang === 'bn' ? 'বাস্কেট দেখুন' : 'View Basket',
      () => scrollToSection('inquiry')
    );
  };

  const handleClearInquiry = () => {
    setInquiryItems([]);
    showToast(
      lang === 'bn' ? 'বাস্কেট খালি করা হয়েছে' : 'Basket Cleared',
      lang === 'bn' ? 'আপনার ইনকোয়ারি তালিকা খালি করা হয়েছে।' : 'All produce items have been cleared.',
      'info'
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAdminRoute) {
    return (
      <div className={theme === 'dark' ? 'dark' : ''}>
        <AdminPanel
          onBackToSite={() => {
            if (window.history.pushState) {
              window.history.pushState(null, '', '/');
            } else {
              window.location.hash = '';
            }
            setIsAdminRoute(false);
          }}
          onProductsUpdated={(updated) => setManagedProducts(updated)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F6FAF4] dark:bg-[#07190F] text-[#132F20] dark:text-[#E0EFE6] selection:bg-[#E4F2E1] dark:selection:bg-[#113822] selection:text-[#0E6032] dark:selection:text-[#28BD64]">
      {/* Toast Notification System */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Sticky Navigation */}
      <Navbar
        inquiryItems={inquiryItems}
        onOpenInquiry={() => scrollToSection('inquiry')}
        onOpenSearch={() => setIsSearchOpen(true)}
        lang={lang}
        onSetLang={handleSetLang}
        onToggleLang={handleToggleLang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Hero Section */}
      <Hero
        onExploreProducts={() => scrollToSection('products')}
        onRequestQuote={() => scrollToSection('inquiry')}
        lang={lang}
      />

      {/* About Section */}
      <About lang={lang} />

      {/* Produce Products Section */}
      <Products
        products={managedProducts}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onQuickAdd={handleQuickAdd}
        lang={lang}
      />

      {/* Seasonal Harvest & Export Availability Calendar */}
      <HarvestCalendar
        lang={lang}
        onQuickAdd={handleQuickAdd}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Farm to Port Process Section */}
      <Process lang={lang} />

      {/* Export Documentation & Compliance Paperwork Section */}
      <ExportDocumentation lang={lang} />

      {/* Authentic Photo Gallery & Lightbox */}
      <Gallery
        lang={lang}
        selectedPhotoIndex={selectedGalleryIndex}
        onSelectPhotoIndex={setSelectedGalleryIndex}
      />

      {/* Produce & Export AI Assistant */}
      <div className="py-4 bg-[#F6FAF4] px-4 sm:px-6 lg:px-8">
        <AskAssistant lang={lang} />
      </div>

      {/* Why Choose Us & Order Process */}
      <WhyChooseUs
        onRequestQuote={() => scrollToSection('inquiry')}
        lang={lang}
      />

      {/* Buyer Testimonials & Consignment Notes */}
      <BuyerReviews lang={lang} />

      {/* Executive Leadership Team */}
      <Team lang={lang} />

      {/* Export FAQ Accordion */}
      <Faq lang={lang} />

      {/* Live Inquiry & Quotation Builder */}
      <InquirySection
        items={inquiryItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onAddItem={handleAddCustomItem}
        onClearAll={handleClearInquiry}
        lang={lang}
      />

      {/* Footer */}
      <Footer lang={lang} />

      {/* Detailed Product Specifications Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToInquiry={handleModalAdd}
        lang={lang}
      />

      {/* Global Multi-Category Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
        }}
        onQuickAddProduct={handleQuickAdd}
        onSelectGallery={(index) => {
          setSelectedGalleryIndex(index);
        }}
        lang={lang}
      />

      {/* Floating Action Button for WhatsApp on Mobile/Desktop */}
      <aside aria-label="Quick export contacts" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
            'Hello Mahfuj Ahmed! I am inquiring regarding fresh produce export from OrchaFresh Global Trade.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1FA855] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs sm:text-sm font-bold max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300">
            Chat on WhatsApp
          </span>
        </a>
      </aside>
    </div>
  );
}
