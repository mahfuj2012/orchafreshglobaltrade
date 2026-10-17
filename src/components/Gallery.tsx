import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, Eye } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/orchafreshData';
import { Language } from '../types';

interface GalleryProps {
  lang: Language;
  selectedPhotoIndex?: number | null;
  onSelectPhotoIndex?: (index: number | null) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  lang,
  selectedPhotoIndex: externalIndex,
  onSelectPhotoIndex: setExternalIndex,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [internalPhotoIndex, setInternalPhotoIndex] = useState<number | null>(null);

  const selectedPhotoIndex = externalIndex !== undefined ? externalIndex : internalPhotoIndex;
  const setSelectedPhotoIndex = setExternalIndex || setInternalPhotoIndex;

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const currentPhoto = selectedPhotoIndex !== null ? filteredItems[selectedPhotoIndex] : null;

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-[#F6FAF4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E6032] mb-3">
            <span className="w-6 h-0.5 bg-[#F27B20] rounded-full" />
            <span>{lang === 'bn' ? 'ফটো গ্যালারি' : 'Photo Gallery'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A1A] leading-tight">
            {lang === 'bn' ? 'খামার থেকে সরাসরি রফতানি।' : 'From farm to dispatch.'}
          </h2>
          <p className="mt-3 text-base text-[#4A6354]">
            {lang === 'bn'
              ? 'আমাদের বাগান, কৃষক সংগ্রহ পয়েন্ট, বাছাই কেন্দ্র এবং পোর্ট ডেসপ্যাচের বাস্তব চিত্রাবলী।'
              : 'Authentic photographic glimpses into our orchards, grower collections, packhouse grading lines, and port dispatch operations.'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'farm', label: 'Farm & Orchards' },
            { id: 'sourcing', label: 'Grower Sourcing' },
            { id: 'processing', label: 'Grading & QC' },
            { id: 'packaging', label: 'Export Packaging' },
            { id: 'logistics', label: 'Port Dispatch' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0E6032] text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhotoIndex(idx)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xs text-xs font-bold">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Photo</span>
                  </span>
                </div>
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-black uppercase tracking-wider text-[#0E6032]">
                  {item.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <h4 className="text-sm font-bold text-[#0B2A1A] group-hover:text-[#0E6032] transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {currentPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
                {/* Photo */}
                <div className="lg:col-span-8 bg-black flex items-center justify-center relative min-h-[300px] lg:min-h-[480px]">
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    className="max-h-[75vh] w-full object-contain"
                  />

                  {/* Nav Chevrons */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/30 hover:bg-white/70 text-white hover:text-black transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/30 hover:bg-white/70 text-white hover:text-black transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Details Sidebar */}
                <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-white">
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-[#0E6032] text-xs font-bold uppercase tracking-wider mb-3">
                      {currentPhoto.category} Stage
                    </span>
                    <h3 className="text-xl font-black text-[#0B2A1A] leading-snug">
                      {currentPhoto.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#F27B20] mt-1 mb-4">
                      {currentPhoto.caption}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {currentPhoto.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      Photo {selectedPhotoIndex! + 1} of {filteredItems.length}
                    </span>
                    <span className="text-emerald-700 font-semibold">OrchaFresh Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
