import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Package, HelpCircle, Image, ArrowRight, Plus, ExternalLink, Calendar, Check, CornerDownLeft } from 'lucide-react';
import { PRODUCTS, FAQS, GALLERY_ITEMS, Product, FaqItem, GalleryItem } from '../data/orchafreshData';
import { Language } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickAddProduct: (productName: string) => void;
  onSelectGallery: (galleryIndex: number) => void;
  lang: Language;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onQuickAddProduct,
  onSelectGallery,
  lang,
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'faq' | 'gallery'>('all');
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setActiveTab('all');
    }
  }, [isOpen]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered Results
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();

    const matchedProducts = !q
      ? []
      : PRODUCTS.filter((p) => {
          return (
            p.n.toLowerCase().includes(q) ||
            p.d.toLowerCase().includes(q) ||
            p.s.toLowerCase().includes(q) ||
            (p.varieties && p.varieties.some((v) => v.toLowerCase().includes(q))) ||
            (q === 'mango' && p.n.toLowerCase() === 'mango') ||
            (q === 'fruit' && p.t === 'fruit') ||
            (q === 'veg' && p.t === 'veg')
          );
        });

    const matchedFaqs = !q
      ? []
      : FAQS.map((f, index) => ({ faq: f, index })).filter(({ faq }) => {
          return (
            faq.q.toLowerCase().includes(q) ||
            faq.a.toLowerCase().includes(q)
          );
        });

    const matchedGallery = !q
      ? []
      : GALLERY_ITEMS.map((g, index) => ({ item: g, index })).filter(({ item }) => {
          return (
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.caption.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
          );
        });

    return {
      products: matchedProducts,
      faqs: matchedFaqs,
      gallery: matchedGallery,
      totalCount: matchedProducts.length + matchedFaqs.length + matchedGallery.length,
    };
  }, [query]);

  const handleQuickAdd = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAddProduct(name);
    setAddedItem(name);
    setTimeout(() => setAddedItem(null), 1200);
  };

  const scrollToFaq = (index: number) => {
    onClose();
    const el = document.getElementById('faq');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGalleryClick = (index: number) => {
    onClose();
    onSelectGallery(index);
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  const popularSearches = [
    'Mango',
    'Tomato',
    'Green Chilli',
    'Phytosanitary',
    'MOQ',
    'Dhaka Airport',
    'Reefer Container',
    'Packing',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-[#F6FAF4]/50">
          <Search className="w-5 h-5 text-[#0E6032] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'bn'
                ? 'পণ্য, সাধারণ জিজ্ঞাসা বা গ্যালারি খুঁজুন...'
                : 'Search products, FAQ answers, or gallery photos...'
            }
            className="flex-1 bg-transparent text-base sm:text-lg font-bold text-[#0B2A1A] placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-bold text-slate-500 bg-white border border-slate-200 rounded-lg shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Filter Category Tabs */}
        {query.trim() && (
          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-50 border-b border-slate-100 text-xs overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#0E6032] text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              All ({results.totalCount})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#0E6032] text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              Products ({results.products.length})
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-[#0E6032] text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              FAQs ({results.faqs.length})
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#0E6032] text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              Gallery ({results.gallery.length})
            </button>
          </div>
        )}

        {/* Search Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* When Empty Query: Suggest Popular Searches */}
          {!query.trim() && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {lang === 'bn' ? 'জনপ্রিয় অনুসন্ধান' : 'Popular Searches'}
                </span>
                <span className="text-xs text-slate-400">
                  Quick suggestions
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F6FAF4] hover:bg-[#E4F2E1] text-[#0E6032] border border-[#D6E5D3] transition-colors cursor-pointer"
                  >
                    <Search className="w-3 h-3 text-[#0E6032]" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>

              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-100">
                <div
                  onClick={() => {
                    onClose();
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-3.5 rounded-2xl bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-100 cursor-pointer transition-colors"
                >
                  <Package className="w-5 h-5 text-[#0E6032] mb-1.5" />
                  <p className="text-xs font-extrabold text-[#0B2A1A]">22+ Produce Items</p>
                  <p className="text-[11px] text-slate-500">View complete catalog</p>
                </div>

                <div
                  onClick={() => {
                    onClose();
                    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-3.5 rounded-2xl bg-orange-50/60 hover:bg-orange-50 border border-orange-100 cursor-pointer transition-colors"
                >
                  <Image className="w-5 h-5 text-[#F27B20] mb-1.5" />
                  <p className="text-xs font-extrabold text-[#0B2A1A]">17 Export Photos</p>
                  <p className="text-[11px] text-slate-500">From farm to dispatch</p>
                </div>

                <div
                  onClick={() => {
                    onClose();
                    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
                >
                  <HelpCircle className="w-5 h-5 text-slate-700 mb-1.5" />
                  <p className="text-xs font-extrabold text-[#0B2A1A]">Export FAQ</p>
                  <p className="text-[11px] text-slate-500">MOQ, ports & certificates</p>
                </div>
              </div>
            </div>
          )}

          {/* Results: Products Section */}
          {query.trim() && (activeTab === 'all' || activeTab === 'products') && results.products.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-[#0E6032]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0B2A1A]">
                  Products ({results.products.length})
                </h4>
              </div>
              <div className="space-y-2">
                {results.products.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="p-3.5 rounded-2xl bg-[#F6FAF4] hover:bg-[#E4F2E1]/60 border border-[#D6E5D3] transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                        style={{
                          background: `linear-gradient(135deg, ${p.c[0]}, ${p.c[1]})`,
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-[#0B2A1A] group-hover:text-[#0E6032] transition-colors">
                            {p.n}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              p.y === 1
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {p.s}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{p.d}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => handleQuickAdd(p.n, e)}
                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          addedItem === p.n
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white hover:bg-[#0E6032] text-[#0E6032] hover:text-white border border-[#D6E5D3]'
                        }`}
                      >
                        {addedItem === p.n ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results: FAQs Section */}
          {query.trim() && (activeTab === 'all' || activeTab === 'faq') && results.faqs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4 text-[#F27B20]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0B2A1A]">
                  FAQ Answers ({results.faqs.length})
                </h4>
              </div>
              <div className="space-y-2">
                {results.faqs.map(({ faq, index }) => (
                  <div
                    key={index}
                    onClick={() => scrollToFaq(index)}
                    className="p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs sm:text-sm text-[#0B2A1A] group-hover:text-[#0E6032] transition-colors">
                        {faq.q}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0E6032] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results: Gallery Photos Section */}
          {query.trim() && (activeTab === 'all' || activeTab === 'gallery') && results.gallery.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Image className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0B2A1A]">
                  Gallery Photos ({results.gallery.length})
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {results.gallery.map(({ item, index }) => (
                  <div
                    key={item.id}
                    onClick={() => handleGalleryClick(index)}
                    className="p-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#0E6032] block">
                        {item.category}
                      </span>
                      <h5 className="text-xs font-bold text-[#0B2A1A] group-hover:text-[#0E6032] truncate">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results Fallback */}
          {query.trim() && results.totalCount === 0 && (
            <div className="text-center py-10">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h4 className="text-base font-bold text-slate-700">No results found for "{query}"</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for general produce names (e.g. mango, chilli, guava), trade terms (e.g. MOQ, CIF, DAC), or contact our export team directly.
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation Tip */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 px-6">
          <span>Search produce catalog, FAQs & export gallery</span>
          <span className="flex items-center gap-1 font-semibold text-slate-500">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">ESC</kbd>
            <span>to close</span>
          </span>
        </div>
      </div>
    </div>
  );
};
