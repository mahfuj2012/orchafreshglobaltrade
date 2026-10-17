import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/orchafreshData';
import { Language } from '../types';

interface FaqProps {
  lang: Language;
}

export const Faq: React.FC<FaqProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E6032] mb-3">
            <span className="w-6 h-0.5 bg-[#F27B20] rounded-full" />
            <span>{lang === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'FAQ'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A1A] leading-tight">
            {lang === 'bn' ? 'আপনার জিজ্ঞাসার সার্বিক উত্তর।' : 'Answers before you ask.'}
          </h2>
          <p className="mt-3 text-base text-[#4A6354]">
            {lang === 'bn'
              ? 'আন্তর্জাতিক ক্রেতাদের সাধারণ প্রশ্ন ও রফতানি সংক্রান্ত জরুরি তথ্যাবলী।'
              : 'Clear, direct answers regarding export procedures, documentation, shipment hubs, and minimum volumes.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-[#F6FAF4]/50 hover:bg-[#F6FAF4] transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-[#0B2A1A]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#0E6032] text-white' : 'text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 sm:p-6 pt-0 bg-[#F6FAF4]/50 text-sm sm:text-base text-[#4A6354] leading-relaxed border-t border-slate-100 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
