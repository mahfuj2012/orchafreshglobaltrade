import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Plane, Ship, Sparkles, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data/orchafreshData';
import { Language } from '../types';

interface HeroProps {
  onExploreProducts: () => void;
  onRequestQuote: () => void;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onRequestQuote, lang }) => {
  const marqueeItems = [
    'Export-Grade Fresh Mangoes',
    'Vine-Ripened Field Tomatoes',
    'Green Chillies & Spices',
    'Sweet Red Lady Papayas',
    'Crisp Thai Guavas',
    'Air Freight from Dhaka (DAC)',
    'Sea Reefer from Chattogram (CGP)',
    'Fresh Okra & Gourds',
    '100% GAP & Phytosanitary Certified',
    'Farm-Direct Transparent Pricing',
    'Pineapples & Melons',
    'Direct Line to Founder Mahfuj Ahmed',
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-6 pb-14 lg:pt-12 lg:pb-20">
      {/* Background Soft Blobs */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full bg-[#9AD7A4]/25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-[-10%] w-[450px] h-[450px] rounded-full bg-[#FFC590]/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-[#CFEBC9]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#0C2618] border border-[#D6E5D3] dark:border-[#18432A] shadow-xs text-xs sm:text-sm font-semibold text-[#132F20] dark:text-[#E0EFE6] mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F27B20] animate-ping" />
              <span>
                {lang === 'bn'
                  ? 'বাংলাদেশ থেকে বিশ্ববাজারে তাজা ফল ও সবজি রফতানি'
                  : 'Fresh Fruit & Vegetable Exporter from Bangladesh'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B2A1A] dark:text-[#F0FAF3] leading-[1.12]">
              {lang === 'bn' ? (
                <>
                  আমাদের খামার থেকে তাজা পণ্য,{' '}
                  <span className="bg-gradient-to-r from-[#0E6032] via-[#17894A] to-[#F27B20] dark:from-[#28BD64] dark:via-[#1FA855] dark:to-[#FFA25C] bg-clip-text text-transparent">
                    সরাসরি আপনার বন্দরে।
                  </span>
                </>
              ) : (
                <>
                  Farm-fresh fruit and vegetables,{' '}
                  <span className="bg-gradient-to-r from-[#0E6032] via-[#17894A] to-[#F27B20] dark:from-[#28BD64] dark:via-[#1FA855] dark:to-[#FFA25C] bg-clip-text text-transparent">
                    from Bangladesh to your port.
                  </span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-[#4A6354] dark:text-[#8AAEA0] leading-relaxed max-w-2xl font-normal">
              {lang === 'bn'
                ? 'অর্চাফ্রেশ গ্লোবাল ট্রেড নিজস্ব খামারে উৎপাদিত সুস্বাদু আম ও টমেটো সহ বাংলাদেশের নির্বাচিত কৃষকদের কাছ থেকে মৌসুমী ও সারা বছরের তাজা ফলমূল ও শাকসবজি বিশ্বমানের প্যাকিংয়ে রফতানি করে।'
                : 'OrchaFresh Global Trade exports fresh produce with strict quality grading and origin control: own-farm mango and tomato plus seasonal and year-round produce sourced directly from trusted growers.'}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onRequestQuote}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0E6032] hover:bg-[#17894A] text-white font-bold text-base shadow-lg shadow-[#0E6032]/20 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>{lang === 'bn' ? 'কোটেশন অনুরোধ করুন' : 'Request a quotation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-[#0C2618] hover:bg-emerald-50 dark:hover:bg-[#113822] text-[#0E6032] dark:text-[#28BD64] border-2 border-[#0E6032] dark:border-[#28BD64] font-bold text-base hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>{lang === 'bn' ? 'পণ্য তালিকা দেখুন' : 'Explore produce'}</span>
              </button>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello OrchaFresh! I would like to get a quote for fresh produce export.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1FA855] hover:bg-[#188a45] text-white font-bold text-sm shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Trust Checklist */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-sm font-semibold text-[#132F20]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0E6032] shrink-0" />
                <span>Own-farm Mango & Tomato control</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0E6032] shrink-0" />
                <span>Air Cargo (DAC) & Sea Reefer (CGP)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0E6032] shrink-0" />
                <span>Phytosanitary & DAE certified</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0E6032] shrink-0" />
                <span>Custom OEM export packaging</span>
              </li>
            </ul>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-[460px] aspect-[4/4.5]">
              {/* Photo 1: Mango (Top Left) */}
              <div className="absolute top-2 left-0 w-[65%] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-[-3deg] hover:rotate-0 transition-transform duration-500 animate-float-slow z-10">
                <img
                  src="/images/mango.jpg"
                  alt="Export quality fresh mangoes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                  Own Orchard Mangoes
                </div>
              </div>

              {/* Photo 2: Tomatoes (Top Right) */}
              <div className="absolute top-[26%] right-0 w-[58%] aspect-[4/3.2] rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-[3.5deg] hover:rotate-0 transition-transform duration-500 animate-float-reverse z-20">
                <img
                  src="/images/tomato.jpg"
                  alt="Vine-ripened export tomatoes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                  Own Farm Tomatoes
                </div>
              </div>

              {/* Photo 3: Mixed Vegetables (Bottom Center) */}
              <div className="absolute bottom-4 left-[10%] w-[68%] aspect-[4/2.9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500 z-30">
                <img
                  src="/images/veg.jpg"
                  alt="Assorted Bangladeshi vegetables"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                  Fresh Farm Vegetables
                </div>
              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-3 right-2 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-emerald-900/10 flex items-center gap-2.5 z-40">
                <div className="p-2 rounded-xl bg-[#E4F2E1] text-[#0E6032]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#0B2A1A]">Own Farm Control</p>
                  <p className="text-[10px] font-medium text-[#4A6354]">Direct Origin Traceability</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="absolute bottom-12 -left-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-orange-900/10 flex items-center gap-2.5 z-40">
                <div className="p-2 rounded-xl bg-[#FFE9D6] text-[#B94F08]">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#0B2A1A]">Air & Sea Logistics</p>
                  <p className="text-[10px] font-medium text-[#4A6354]">Dhaka Airport & Chattogram Port</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Produce Ticker */}
      <div className="mt-12 bg-gradient-to-r from-[#0E6032] via-[#12703b] to-[#1b8247] text-white py-3 overflow-hidden border-y border-white/10 shadow-inner">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-bold tracking-wide">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFA25C]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
