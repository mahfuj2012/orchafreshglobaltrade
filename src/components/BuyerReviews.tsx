import React, { useState } from 'react';
import { Star, ShieldCheck, MapPin, PackageCheck, Quote, CheckCircle2 } from 'lucide-react';
import { BUYER_REVIEWS, BuyerReview } from '../data/orchafreshData';
import { Language } from '../types';

interface BuyerReviewsProps {
  lang: Language;
}

export const BuyerReviews: React.FC<BuyerReviewsProps> = ({ lang }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | '5' | '4'>('all');

  const filteredReviews = BUYER_REVIEWS.filter((rev) => {
    if (activeFilter === '5') return rev.rating === 5;
    if (activeFilter === '4') return rev.rating === 4;
    return true;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-amber-400 text-amber-400'
                : 'fill-slate-200 text-slate-200'
            }`}
          />
        ))}
        <span className="ml-1.5 text-xs font-bold text-slate-700">{rating}.0</span>
      </div>
    );
  };

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-white dark:bg-[#07190F] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E6032] dark:text-[#28BD64] mb-3">
              <span className="w-6 h-0.5 bg-[#F27B20] rounded-full" />
              <span>{lang === 'bn' ? 'আমদানিকারকদের মতামত' : 'Consignment Notes & Reviews'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A1A] dark:text-[#F0FAF3] leading-tight">
              {lang === 'bn'
                ? 'আন্তর্জাতিক ক্রেতাদের বাস্তব অভিজ্ঞতা ও পর্যালোচনা।'
                : 'Direct feedback from international importers.'}
            </h2>
          </div>
          <p className="text-base text-[#4A6354] dark:text-[#8AAEA0] max-w-md">
            {lang === 'bn'
              ? 'দুবাই, লন্ডন, সিঙ্গাপুর ও রটারডামের সুপারমার্কেট ও হোলসেল ট্রেডারদের বাস্তব কনসাইনমেন্ট রিপোর্ট।'
              : 'Authentic consignment feedback from wholesale distributors, procurement directors, and importers receiving our produce.'}
          </p>
        </div>

        {/* Rating Filter Tabs & Summary Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F6FAF4] dark:bg-[#0C2618] border border-[#D6E5D3] dark:border-[#18432A] mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1">
              Filter:
            </span>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#0E6032] dark:bg-[#1FA855] text-white shadow-xs'
                  : 'bg-white dark:bg-[#113822] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#184a2e] border border-slate-200 dark:border-[#1E4D34]'
              }`}
            >
              All Reviews ({BUYER_REVIEWS.length})
            </button>
            <button
              onClick={() => setActiveFilter('5')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeFilter === '5'
                  ? 'bg-[#0E6032] dark:bg-[#1FA855] text-white shadow-xs'
                  : 'bg-white dark:bg-[#113822] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#184a2e] border border-slate-200 dark:border-[#1E4D34]'
              }`}
            >
              5-Star (2)
            </button>
            <button
              onClick={() => setActiveFilter('4')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeFilter === '4'
                  ? 'bg-[#0E6032] dark:bg-[#1FA855] text-white shadow-xs'
                  : 'bg-white dark:bg-[#113822] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#184a2e] border border-slate-200 dark:border-[#1E4D34]'
              }`}
            >
              4-Star (2)
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#132F20] dark:text-[#DDEEE4]">
            <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-[#0E6032] dark:text-[#28BD64]" />
              <span>4.8 / 5.0 Average Rating</span>
            </span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400">Verified International Shipments</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#0C2618] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#18432A] hover:border-emerald-300 dark:hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header: Photo, Details & Stars */}
                <div className="flex items-start gap-4 mb-5">
                  <img
                    src={rev.photo}
                    alt={rev.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#D6E5D3] dark:border-[#18432A] shadow-sm shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className="text-base sm:text-lg font-black text-[#0B2A1A] dark:text-[#F0FAF3] leading-tight">
                        {rev.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400">
                        {rev.date}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-[#0E6032] dark:text-[#28BD64] mt-0.5 truncate">
                      {rev.title} • {rev.company}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#F27B20] shrink-0" />
                      <span className="truncate">{rev.country}</span>
                    </div>

                    <div className="mt-2.5">
                      {renderStars(rev.rating)}
                    </div>
                  </div>
                </div>

                {/* Consignment Specs Badge */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#113822]/60 border border-slate-200/80 dark:border-[#1E4D34] mb-4 flex items-start gap-2 text-xs">
                  <PackageCheck className="w-4 h-4 text-[#0E6032] dark:text-[#28BD64] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 block">Consignment Details:</span>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{rev.consignment}</span>
                  </div>
                </div>

                {/* Review Body */}
                <div className="relative pl-1">
                  <Quote className="w-6 h-6 text-emerald-900/10 dark:text-emerald-300/10 absolute -left-1 -top-2" />
                  <p className="text-sm text-[#4A6354] dark:text-[#A7C4B2] leading-relaxed relative z-10 pt-1">
                    "{rev.review}"
                  </p>
                </div>
              </div>

              {/* Bottom Verification Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#18432A] flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0E6032] dark:text-[#28BD64]" />
                  <span>{rev.verifiedTag}</span>
                </span>
                <span className="text-slate-400 text-[11px]">Inspection Passed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
