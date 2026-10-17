import React from 'react';
import { Leaf, Package, BadgePercent, Settings, FileCheck, PhoneCall, ArrowRight } from 'lucide-react';
import { WHY_CHOOSE_US, HOW_ORDERING_WORKS, CONTACT_INFO } from '../data/orchafreshData';
import { Language } from '../types';

interface WhyChooseUsProps {
  onRequestQuote: () => void;
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onRequestQuote, lang }) => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Leaf className="w-6 h-6 text-[#0E6032]" />;
      case 1:
        return <Package className="w-6 h-6 text-[#F27B20]" />;
      case 2:
        return <BadgePercent className="w-6 h-6 text-[#0E6032]" />;
      case 3:
        return <Settings className="w-6 h-6 text-[#F27B20]" />;
      case 4:
        return <FileCheck className="w-6 h-6 text-[#0E6032]" />;
      default:
        return <PhoneCall className="w-6 h-6 text-[#F27B20]" />;
    }
  };

  return (
    <section id="why" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E6032] mb-3">
            <span className="w-6 h-0.5 bg-[#F27B20] rounded-full" />
            <span>{lang === 'bn' ? 'কেন অর্চাফ্রেশ' : 'Why OrchaFresh'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A1A] leading-tight">
            {lang === 'bn'
              ? 'একটি নির্ভরযোগ্য ও সরাসরি যোগাযোগযোগ্য সরবরাহকারী প্রতিষ্ঠান।'
              : 'A supplier you can reach, check and rely on.'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A6354]">
            {lang === 'bn'
              ? 'মধ্যস্বত্বভোগীহীন সরাসরি নিজস্ব খামার, কঠোর মান নিয়ন্ত্রণ ও আন্তর্জাতিক রফতানি নথিপত্রের নিখুঁত ব্যবস্থাপনা।'
              : 'Direct farm ownership, transparent grower sourcing, and complete export compliance give our global partners competitive peace of mind.'}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {WHY_CHOOSE_US.map((item, idx) => {
            const isBig = idx === 0;
            const isWide = idx === 1;

            return (
              <div
                key={idx}
                className={`p-8 rounded-3xl border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  isBig
                    ? 'bg-gradient-to-br from-[#E4F2E1]/60 via-[#F6FAF4] to-white md:col-span-2 lg:col-span-1'
                    : isWide
                    ? 'bg-white lg:col-span-2'
                    : 'bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#E4F2E1] flex items-center justify-center">
                      {getIcon(idx)}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2A1A] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#4A6354] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {idx === 5 && (
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0E6032]">Direct WhatsApp / Call:</span>
                    <a
                      href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                      className="font-bold text-[#F27B20] hover:underline"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* How Ordering Works Timeline */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F6FAF4] border border-[#D6E5D3]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#0E6032] block mb-2">
              Step-by-Step Order Workflow
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A1A]">
              How ordering works with OrchaFresh
            </h3>
            <p className="text-sm text-[#4A6354] mt-2">
              From your initial inquiry to container arrival at your port.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {HOW_ORDERING_WORKS.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-full bg-[#0E6032] text-white flex items-center justify-center font-black text-sm mb-4">
                    {step.step}
                  </div>
                  <h4 className="text-base font-bold text-[#0B2A1A] mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#4A6354] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < HOW_ORDERING_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-300 text-slate-400 flex items-center justify-center text-[10px]">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F27B20] hover:bg-[#FFA25C] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Start Your First Order Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
