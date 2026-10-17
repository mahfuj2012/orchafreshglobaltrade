import React from 'react';
import { ShieldCheck, Leaf, Truck, Check, Award, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../data/orchafreshData';
import { Language } from '../types';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white dark:bg-[#07190F] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Story Text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E6032] dark:text-[#28BD64] mb-3">
              <span className="w-6 h-0.5 bg-[#F27B20] rounded-full" />
              <span>{lang === 'bn' ? 'আমাদের পরিচয়' : 'Who we are'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A1A] dark:text-[#F0FAF3] leading-tight">
              {lang === 'bn'
                ? 'আমরা উৎপাদন করি। আমরা সংগ্রহ করি। আমরা রফতানি করি।'
                : 'We grow it. We source it. We ship it.'}
            </h2>

            <div className="mt-6 space-y-4 text-base sm:text-lg text-[#4A6354] dark:text-[#8AAEA0] leading-relaxed">
              <p>
                {lang === 'bn'
                  ? 'অর্চাফ্রেশ গ্লোবাল ট্রেড বাংলাদেশ থেকে আন্তর্জাতিক মানসম্পন্ন তাজা ফল ও সবজি রফতানিকারক প্রতিষ্ঠান। আমাদের নিজস্ব বাগানে উৎপাদিত আম এবং নিজস্ব খামারের টমেটো উৎপাদন থেকে শুরু করে বাছাই ও প্যাকিং পর্যন্ত আমাদের সার্বক্ষণিক তত্ত্বাবধানে পরিচালিত হয়।'
                  : 'OrchaFresh Global Trade is a Bangladesh-based exporter of premium fresh fruit and vegetables. Our own farm produces export-grade mango and tomato, which means we oversee every stage from orchard flowering to harvest, grading, and cold packing.'}
              </p>
              <p>
                {lang === 'bn'
                  ? 'অন্যান্য ফল ও শাকসবজির ক্ষেত্রে আমরা স্থানীয় চুক্তিভিত্তিক পরীক্ষিত কৃষকদের কাছ থেকে সরাসরি তাজা পণ্য সংগ্রহ করি। ফলে আমদানিকারক প্রতিষ্ঠানগুলো একক বিশ্বস্ত সরবরাহকারীর মাধ্যমেই পুরো কনটেইনার বা এয়ার কনসাইনমেন্ট বুক করতে পারেন।'
                  : 'For all other produce, we buy directly from growers we know and trust across agricultural hubs in Bangladesh. Importers can consolidate a full reefer container or air consignment through a single dependable partner with guaranteed quality.'}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-100 dark:border-[#18432A]">
              <div className="p-4 rounded-2xl bg-[#F6FAF4] dark:bg-[#0C2618] border border-[#D6E5D3] dark:border-[#18432A]">
                <p className="text-2xl sm:text-3xl font-black text-[#0E6032] dark:text-[#28BD64]">Own</p>
                <p className="text-xs font-semibold text-[#4A6354] dark:text-[#8AAEA0] mt-1">Mango & Tomato Farms</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6FAF4] dark:bg-[#0C2618] border border-[#D6E5D3] dark:border-[#18432A]">
                <p className="text-2xl sm:text-3xl font-black text-[#F27B20] dark:text-[#FFA25C]">22+</p>
                <p className="text-xs font-semibold text-[#4A6354] dark:text-[#8AAEA0] mt-1">Fresh Produce Lines</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6FAF4] dark:bg-[#0C2618] border border-[#D6E5D3] dark:border-[#18432A]">
                <p className="text-2xl sm:text-3xl font-black text-[#0E6032] dark:text-[#28BD64]">2</p>
                <p className="text-xs font-semibold text-[#4A6354] dark:text-[#8AAEA0] mt-1">Ports: DAC & CGP</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6FAF4] dark:bg-[#0C2618] border border-[#D6E5D3] dark:border-[#18432A]">
                <p className="text-2xl sm:text-3xl font-black text-[#F27B20] dark:text-[#FFA25C]">100%</p>
                <p className="text-xs font-semibold text-[#4A6354] dark:text-[#8AAEA0] mt-1">Quarantine Certified</p>
              </div>
            </div>
          </div>

          {/* Aside Brand Card */}
          <div className="lg:col-span-5">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[#0E6032] to-[#0B2A1A] text-white shadow-2xl overflow-hidden border border-emerald-700/30">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F27B20]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 p-2.5 backdrop-blur-md flex items-center justify-center">
                  <img
                    src="/images/mark.png"
                    alt="OrchaFresh globe and leaf mark"
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-white">
                    OrchaFresh Global Trade
                  </h3>
                  <p className="text-xs text-[#FFA25C] font-semibold tracking-wide uppercase">
                    {CONTACT_INFO.tagline}
                  </p>
                </div>
              </div>

              <h4 className="text-lg font-bold text-[#E4F2E1] mb-5">
                {CONTACT_INFO.subtext}
              </h4>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#17894A] text-white mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Direct Farm Stewardship</strong>
                    <span className="text-emerald-100/80 text-xs">
                      We control harvest maturity, avoiding premature picking or artificial ripening chemicals.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#17894A] text-white mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Traceable Contract Growers</strong>
                    <span className="text-emerald-100/80 text-xs">
                      Sourced under fair trade terms directly from experienced regional farmers with batch tracking.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#17894A] text-white mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Cold-Chain & Port Staging</strong>
                    <span className="text-emerald-100/80 text-xs">
                      Fast transit to Hazrat Shahjalal International Airport (DAC) & Chattogram Port (CGP).
                    </span>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-5 border-t border-white/15 flex items-center justify-between text-xs text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FFA25C]" />
                  <span>Dhaka, Bangladesh</span>
                </span>
                <span className="font-semibold text-[#FFA25C]">Export License Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
