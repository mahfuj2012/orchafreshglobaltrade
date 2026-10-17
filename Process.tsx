import React from 'react';
import { PROCESS_STEPS } from '../data/orchafreshData';
import { Language } from '../types';

interface ProcessProps {
  lang: Language;
}

export const Process: React.FC<ProcessProps> = ({ lang }) => {
  return (
    <section id="process" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E6032] mb-3">
            <span className="w-6 h-0.5 bg-[#F27B20] rounded-full" />
            <span>{lang === 'bn' ? 'ফার্ম থেকে বন্দর' : 'Farm to Port'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A1A] leading-tight">
            {lang === 'bn'
              ? 'আমাদের খামার থেকে আপনার বন্দর পর্যন্ত ৬টি ধাপে।'
              : 'From our farm to your port, in six steps.'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A6354]">
            {lang === 'bn'
              ? 'প্রতিটি চালান একই মান নিয়ন্ত্রণ ও স্বচ্ছ প্রক্রিয়ায় সম্পন্ন হয়, যাতে আপনি পণ্যের অবস্থান ও অগ্রগতি সর্বদা নিশ্চিত থাকতে পারেন।'
              : 'Every consignment follows the exact same transparent workflow, so international buyers always know where their produce is and how quality is secured.'}
          </p>
        </div>

        {/* 6 Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="group bg-[#F6FAF4] rounded-3xl overflow-hidden border border-[#D6E5D3] hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                  Export Stage
                </span>
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white shadow-md flex items-center justify-center font-black text-sm text-[#0E6032]">
                  {step.num}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#0B2A1A] mb-2 group-hover:text-[#0E6032] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#4A6354] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
