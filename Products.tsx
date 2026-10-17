import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Info, Sparkles, Filter, Leaf, ArrowRight } from 'lucide-react';
import { FEATURED_PRODUCE, PRODUCTS, Product } from '../data/orchafreshData';
import { Language } from '../types';

interface ProductsProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (productName: string) => void;
  lang: Language;
  products?: Product[];
}

export const Products: React.FC<ProductsProps> = ({
  onSelectProduct,
  onQuickAdd,
  lang,
  products,
}) => {
  const activeProducts = products && products.length > 0 ? products : PRODUCTS;
  const [activeFilter, setActiveFilter] = useState<'all' | 'fruit' | 'veg' | 'year' | 'seasonal'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  const handleQuickAdd = (name: string) => {
    onQuickAdd(name);
    setAddedItems((prev) => ({ ...prev, [name]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [name]: false }));
    }, 1200);
  };

  const filteredProducts = useMemo(() => {
    return activeProducts.filter((p) => {
      // Filter tab
      if (activeFilter === 'fruit' && p.t !== 'fruit') return false;
      if (activeFilter === 'veg' && p.t !== 'veg') return false;
      if (activeFilter === 'year' && p.y !== 1) return false;
      if (activeFilter === 'seasonal' && p.y !== 0) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          p.n.toLowerCase().includes(query) ||
          p.d.toLowerCase().includes(query) ||
          p.s.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="products" className="py-16 lg:py-24 bg-[#F6FAF4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E6032] mb-3">
              <span className="w-6 h-0.5 bg-[#F27B20] rounded-full" />
              <span>{lang === 'bn' ? 'রফতানি পণ্য সম্ভার' : 'Export Catalog'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A1A] leading-tight">
              {lang === 'bn'
                ? 'আপনার চাহিদামাফিক সব ধরণের তাজা ফল ও সবজি।'
                : 'Every fruit and vegetable your market asks for.'}
            </h2>
          </div>
          <p className="text-base text-[#4A6354] max-w-md">
            {lang === 'bn'
              ? 'আমাদের নিজস্ব খামারের বিশেষায়িত আম ও টমেটোর পাশাপাশি সম্পূর্ণ মৌসুমী ও সারা বছরের তাজা পণ্য সম্ভার।'
              : 'Two specialties from our own farm, plus a full range of seasonal and year-round produce, packed to international export specifications.'}
          </p>
        </div>

        {/* 3 Featured Signature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {FEATURED_PRODUCE.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-950/5 flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-md ${item.badgeColor}`}
                >
                  {item.tag}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-2xl font-black">{item.name}</h3>
                  <span className="text-xs text-emerald-200 font-medium">{item.season}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-sm text-[#4A6354] leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Specs list */}
                <ul className="space-y-2 text-xs border-t border-slate-100 pt-4 mb-6 text-slate-700">
                  {item.spec.slice(0, 3).map((s, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span className="font-semibold text-slate-500">{s.label}:</span>
                      <span className="font-medium text-slate-900 text-right">{s.val}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleQuickAdd(item.name)}
                  className={`w-full py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedItems[item.name]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0E6032] hover:bg-[#17894A] text-white shadow-sm hover:shadow'
                  }`}
                >
                  {addedItems[item.name] ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Inquiry!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add {item.name} to inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Catalog Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-full shadow-xs border border-[#D6E5D3] mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#0E6032] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {lang === 'bn' ? `সকল পণ্য (${PRODUCTS.length})` : `All Produce (${PRODUCTS.length})`}
            </button>
            <button
              onClick={() => setActiveFilter('fruit')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === 'fruit'
                  ? 'bg-[#0E6032] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {lang === 'bn' ? 'ফলমূল' : 'Fruits'}
            </button>
            <button
              onClick={() => setActiveFilter('veg')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === 'veg'
                  ? 'bg-[#0E6032] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {lang === 'bn' ? 'শাকসবজি' : 'Vegetables'}
            </button>
            <button
              onClick={() => setActiveFilter('year')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === 'year'
                  ? 'bg-[#0E6032] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {lang === 'bn' ? 'সারা বছর' : 'Year-Round'}
            </button>
            <button
              onClick={() => setActiveFilter('seasonal')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === 'seasonal'
                  ? 'bg-[#0E6032] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {lang === 'bn' ? 'মৌসুমী' : 'Seasonal'}
            </button>
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'bn' ? 'পণ্য খুঁজুন, যেমন: পেঁপে, আম, মরিচ...' : 'Search produce, e.g. papaya, okra...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E6032] text-slate-800"
            />
          </div>
        </div>

        {/* 22+ Produce Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((p) => {
            const isAdded = addedItems[p.n];
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Color Indicator and Season */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                      style={{
                        background: `linear-gradient(135deg, ${p.c[0]}, ${p.c[1]})`,
                      }}
                    />
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        p.y === 1
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                          : 'bg-orange-50 text-orange-800 border border-orange-100'
                      }`}
                    >
                      {p.s}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-[#0B2A1A] group-hover:text-[#0E6032] transition-colors">
                    {p.n}
                  </h4>
                  {p.priceRange && (
                    <span className="text-xs font-black text-[#0E6032] dark:text-[#28BD64] block mt-0.5">
                      {p.priceRange}
                    </span>
                  )}
                  <p className="mt-1.5 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {p.d}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProduct(p)}
                    className="text-xs font-bold text-[#0E6032] hover:text-[#17894A] flex items-center gap-1 cursor-pointer py-1 px-2 rounded-lg hover:bg-emerald-50"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'রফতানি বিবরণ' : 'Export Specs'}</span>
                  </button>

                  <button
                    onClick={() => handleQuickAdd(p.n)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#F6FAF4] hover:bg-[#0E6032] text-[#0E6032] hover:text-white border border-[#D6E5D3]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'যুক্ত' : 'Added'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'যোগ করুন' : 'Add'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 mt-4">
            <p className="text-slate-500 text-sm">No produce found matching your search. Contact us for custom sourcing.</p>
          </div>
        )}

        <p className="text-center text-xs text-[#4A6354] mt-10">
          * Harvesting seasons are typical for Bangladesh climate conditions. Caliber grading, packaging specs, and FOB/CIF quotes are furnished upon inquiry.
        </p>
      </div>
    </section>
  );
};
