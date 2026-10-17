import React, { useState, useEffect } from 'react';
import {
  Users,
  Eye,
  Globe2,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  X,
  Activity,
  Sparkles,
  ArrowUpRight,
  UserCheck,
  Radio
} from 'lucide-react';
import { VisitorStats, Language } from '../types';
import { getStoredVisitorStats } from '../utils/visitorTracker';

interface VisitorCounterProps {
  lang: Language;
  variant?: 'footer' | 'pill' | 'card';
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  lang,
  variant = 'footer',
}) => {
  const [stats, setStats] = useState<VisitorStats>(() => getStoredVisitorStats());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Listen for visitor updates
    const handleUpdate = (e: any) => {
      if (e.detail) {
        setStats(e.detail);
      } else {
        setStats(getStoredVisitorStats());
      }
    };

    window.addEventListener('orchafresh_visitor_update', handleUpdate);
    return () => window.removeEventListener('orchafresh_visitor_update', handleUpdate);
  }, []);

  // Format numbers for English or Bengali
  const formatNumber = (num: number): string => {
    if (lang === 'bn') {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return num
        .toLocaleString('en-US')
        .split('')
        .map((ch) => (ch >= '0' && ch <= '9' ? bnDigits[parseInt(ch, 10)] : ch))
        .join('');
    }
    return num.toLocaleString('en-US');
  };

  // Convert number to digit string tiles for odometer effect
  const getDigitTiles = (num: number): string[] => {
    const formatted = formatNumber(num);
    return formatted.split('');
  };

  // If public counter is disabled by admin in settings
  if (!stats.settings.showPublicCounter) {
    return null;
  }

  // Pill variant for top bar / hero / mobile menu
  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-[#113822] border border-emerald-300 dark:border-emerald-700/80 text-xs font-bold text-[#0E6032] dark:text-[#28BD64] hover:bg-emerald-100 dark:hover:bg-[#184a2e] transition-all cursor-pointer shadow-xs group"
        title={lang === 'bn' ? 'ইউনিক ভিজিটর পরিসংখ্যান দেখুন' : 'View unique visitor analytics'}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FA855] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FA855]"></span>
        </span>
        <UserCheck className="w-3.5 h-3.5 text-[#0E6032] dark:text-[#28BD64]" />
        <span>
          {lang === 'bn' ? 'ইউনিক ভিজিটর:' : 'Unique Visitors:'}{' '}
          <strong className="font-extrabold text-[#0B2A1A] dark:text-white">
            {formatNumber(stats.uniqueVisitors)}
          </strong>
        </span>
      </button>
    );
  }

  // Highly visible, high-impact Footer Component variant
  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#061A0F] via-[#0A2617] to-[#04140C] border-2 border-emerald-500/40 p-6 sm:p-8 shadow-2xl shadow-emerald-950/90 text-white transition-all hover:border-emerald-400/70">
        {/* Decorative background glow accents */}
        <div className="absolute top-0 right-1/4 w-72 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-48 h-24 bg-[#F27B20]/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Top Header Row with Live Telemetry Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-800/60 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0E6032] to-[#28BD64] flex items-center justify-center text-white shadow-lg shadow-emerald-900/60 shrink-0 border border-emerald-400/30">
              <UserCheck className="w-6 h-6 text-emerald-50" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#FFA25C]">
                  {lang === 'bn' ? 'লাইভ ট্রেড টেলিমেট্রি' : 'Live Trade Telemetry'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#28BD64] text-[10px] font-bold border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28BD64] animate-pulse"></span>
                  {lang === 'bn' ? 'সরাসরি রেকর্ডকৃত' : 'Active Tracking'}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                {lang === 'bn' ? 'অফিসিয়াল ওয়েবসাইট ইউনিক ভিজিটর কাউন্টার' : 'Official Website Unique Visitor Counter'}
              </h4>
            </div>
          </div>

          {/* Active Status Badge */}
          <div className="flex items-center gap-2.5 self-start sm:self-center">
            <div className="px-3 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-600/50 flex items-center gap-2 text-xs text-emerald-100 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28BD64] opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#28BD64]"></span>
              </span>
              <span className="text-emerald-300 font-medium">
                {lang === 'bn' ? 'লাইভ অনলাইন বায়ার:' : 'Live Buyers Online:'}
              </span>
              <strong className="text-white font-extrabold">{formatNumber(stats.activeNow)}</strong>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-[#0E6032] hover:bg-[#17894A] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md hover:scale-105 cursor-pointer border border-emerald-400/40"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'পূর্ণাঙ্গ ট্রাফিক রিপোর্ট' : 'View Insights'}</span>
            </button>
          </div>
        </div>

        {/* Main Unique Visitors Hero Row */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Huge Unique Visitors Odometer Display */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-[#F27B20]/20 text-[#FFA25C] text-xs font-black uppercase tracking-wider border border-[#F27B20]/30">
                {lang === 'bn' ? 'মোট ইউনিক বায়ার ও ভিজিটর' : 'Total Unique Visitors Recorded'}
              </span>
              <span className="text-xs text-emerald-300/80">
                {lang === 'bn' ? '(স্বতন্ত্র ডিভাইস ও সেশন)' : '(Distinct Importers & Devices)'}
              </span>
            </div>

            {/* Odometer Digit Flip Tiles */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 my-2 overflow-x-auto py-1">
              {getDigitTiles(stats.uniqueVisitors).map((digit, idx) => {
                const isComma = digit === ',' || digit === '،';
                if (isComma) {
                  return (
                    <span
                      key={idx}
                      className="text-2xl sm:text-4xl font-black text-emerald-400/80 self-end px-0.5"
                    >
                      {digit}
                    </span>
                  );
                }
                return (
                  <div
                    key={idx}
                    className="w-10 sm:w-14 h-14 sm:h-20 rounded-2xl bg-gradient-to-b from-[#0C321E] via-[#082214] to-[#04130A] border-2 border-emerald-400/60 shadow-lg shadow-black/60 flex items-center justify-center relative overflow-hidden group hover:border-[#28BD64] transition-colors"
                  >
                    {/* Subtle center reflection line */}
                    <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-950/80"></div>
                    <span className="text-3xl sm:text-5xl font-black font-mono text-[#F0FAF3] tracking-tighter drop-shadow-[0_2px_8px_rgba(40,189,100,0.5)]">
                      {digit}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-emerald-200/80 mt-2 max-w-lg leading-relaxed">
              {lang === 'bn'
                ? 'স্বতন্ত্র আন্তর্জাতিক ফল ও সবজি আমদানিকারক প্রতিষ্ঠান, ফ্রেইট বায়ার এবং রফতানি বাণিজ্য অংশীদারগণ এই ওয়েবসাইট পরিদর্শন করেছেন।'
                : 'Audited count of verified international fresh fruit and vegetable importers, produce brokers, and cargo buyers navigating OrchaFresh.'}
            </p>
          </div>

          {/* Right Column: 3 Complementary Metric Stat Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            {/* Total Pageviews Card */}
            <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-700/50 backdrop-blur-xs flex flex-col justify-between hover:bg-emerald-900/60 transition-colors">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 flex items-center justify-between">
                <span>{lang === 'bn' ? 'মোট পেজভিউ' : 'Total Pageviews'}</span>
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
              </span>
              <div className="mt-2">
                <span className="text-2xl font-black text-white font-mono">
                  {formatNumber(stats.totalVisitors)}
                </span>
                <span className="text-[10px] text-emerald-300/70 block mt-0.5">
                  {lang === 'bn' ? 'সামগ্রিক সাইট ভিজিট' : 'All-time site hits'}
                </span>
              </div>
            </div>

            {/* Today's Visitors Card */}
            <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-700/50 backdrop-blur-xs flex flex-col justify-between hover:bg-emerald-900/60 transition-colors">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 flex items-center justify-between">
                <span>{lang === 'bn' ? 'আজকের আগমন' : "Today's Visits"}</span>
                <TrendingUp className="w-3.5 h-3.5 text-[#FFA25C]" />
              </span>
              <div className="mt-2">
                <span className="text-2xl font-black text-[#FFA25C] font-mono">
                  +{formatNumber(stats.todayVisitors)}
                </span>
                <span className="text-[10px] text-emerald-300/70 block mt-0.5">
                  {lang === 'bn' ? 'আজকের নতুন সেশন' : 'New sessions today'}
                </span>
              </div>
            </div>

            {/* Top Market Destination Card */}
            <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-700/50 backdrop-blur-xs flex flex-col justify-between hover:bg-emerald-900/60 transition-colors">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 flex items-center justify-between">
                <span>{lang === 'bn' ? 'শীর্ষ বায়ার অঞ্চল' : 'Top Importer Hub'}</span>
                <Globe2 className="w-3.5 h-3.5 text-[#28BD64]" />
              </span>
              <div className="mt-2">
                <span className="text-base font-extrabold text-white truncate block">
                  UAE & GCC (32%)
                </span>
                <span className="text-[10px] text-emerald-300/70 block mt-0.5">
                  {lang === 'bn' ? 'মধ্যপ্রাচ্য ও গালফ' : 'Dubai, Jeddah, London'}
                </span>
              </div>
            </div>

            {/* Verification & Admin Telemetry Card */}
            <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-700/50 backdrop-blur-xs flex flex-col justify-between hover:bg-emerald-900/60 transition-colors">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 flex items-center justify-between">
                <span>{lang === 'bn' ? 'যাচাইকরণ' : 'Verification'}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#28BD64]" />
              </span>
              <div className="mt-2">
                <span className="text-xs font-black text-[#28BD64] block">
                  {lang === 'bn' ? 'যাচাইকৃত ট্রেকার' : 'Authenticated Log'}
                </span>
                <a
                  href="#admin"
                  className="text-[10px] text-emerald-200 underline font-semibold hover:text-white transition-colors block mt-0.5"
                >
                  {lang === 'bn' ? 'অ্যাডমিন পোর্টাল →' : 'Admin Telemetry →'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Insights Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#0C2618] text-[#132F20] dark:text-[#E0EFE6] rounded-3xl max-w-xl w-full p-6 sm:p-8 border-2 border-emerald-300 dark:border-[#18432A] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#113822] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#E4F2E1] dark:bg-[#113822] flex items-center justify-center text-[#0E6032] dark:text-[#28BD64]">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-black text-[#0B2A1A] dark:text-[#F0FAF3]">
                  {lang === 'bn' ? 'ওয়েবসাইট ট্রাফিক ও ইউনিক ভিজিটর বিশ্লেষণ' : 'Website Traffic & Unique Visitor Telemetry'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'bn'
                    ? 'OrchaFresh গ্লোবাল ট্রেড এর আন্তর্জাতিক বায়ার ও ট্রাফিক বিশ্লেষণ'
                    : 'Real-time trade visitor telemetry for OrchaFresh Global Trade'}
                </p>
              </div>
            </div>

            {/* Key 4 Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-[#113822]/60 border border-emerald-300 dark:border-emerald-700">
                <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300 block mb-0.5">
                  {lang === 'bn' ? 'ইউনিক ভিজিটর' : 'Unique Visitors'}
                </span>
                <span className="text-xl font-black text-[#0E6032] dark:text-[#28BD64]">
                  {formatNumber(stats.uniqueVisitors)}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#07190F] border border-slate-200 dark:border-[#18432A]">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                  {lang === 'bn' ? 'মোট পেজভিউ' : 'Total Visits'}
                </span>
                <span className="text-xl font-black text-[#F27B20]">
                  {formatNumber(stats.totalVisitors)}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#07190F] border border-slate-200 dark:border-[#18432A]">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                  {lang === 'bn' ? 'আজকের ট্রাফিক' : 'Today'}
                </span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                  +{formatNumber(stats.todayVisitors)}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#07190F] border border-slate-200 dark:border-[#18432A]">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                  {lang === 'bn' ? 'এই সপ্তাহে' : 'This Week'}
                </span>
                <span className="text-xl font-black text-slate-700 dark:text-slate-200">
                  {formatNumber(stats.thisWeekVisitors)}
                </span>
              </div>
            </div>

            {/* Top Regional Buyers */}
            <div className="mb-6">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
                <span>{lang === 'bn' ? 'শীর্ষ রফতানি বাজার ও বায়ার অঞ্চল' : 'Top International Buyer Regions'}</span>
                <span className="text-[10px] text-[#0E6032] dark:text-[#28BD64] font-semibold">
                  {lang === 'bn' ? 'সক্রিয় পরিদর্শন' : 'Active Traffic'}
                </span>
              </h5>
              <div className="space-y-2.5">
                {stats.countryBreakdown.slice(0, 5).map((item) => (
                  <div key={item.country} className="flex items-center gap-3 text-xs">
                    <span className="w-28 sm:w-36 font-semibold truncate text-[#0B2A1A] dark:text-[#E0EFE6]">
                      {item.country}
                    </span>
                    <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-[#113822] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0E6032] to-[#28BD64] rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="w-14 text-right font-bold text-slate-600 dark:text-slate-300">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Access Note */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-[#113822]/60 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-[#28BD64] shrink-0" />
                <span>
                  {lang === 'bn'
                    ? 'সম্পূর্ণ ট্রাফিক লগ ও নিয়ন্ত্রণ অ্যাডমিন প্যানেল (/admin) থেকে দেখুন।'
                    : 'Full visitor event logs, CSV export, and settings available in Admin Panel.'}
                </span>
              </div>

              <a
                href="#admin"
                onClick={() => setIsModalOpen(false)}
                className="px-3.5 py-1.5 rounded-xl bg-[#0E6032] hover:bg-[#17894A] text-white font-bold text-[11px] whitespace-nowrap transition-colors"
              >
                {lang === 'bn' ? 'অ্যাডমিন প্রবেশ' : 'Admin Panel'}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
