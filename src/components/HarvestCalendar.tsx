import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Plane,
  Ship,
  Thermometer,
  Package,
  Plus,
  Check,
  Sparkles,
  Info,
  Clock,
  Printer,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PRODUCTS, FEATURED_PRODUCE, Product } from '../data/orchafreshData';
import { Language } from '../types';

interface HarvestCalendarProps {
  lang: Language;
  onQuickAdd: (productName: string) => void;
  onSelectProduct?: (product: Product) => void;
}

interface CropCalendarItem {
  id: string;
  nameEn: string;
  nameBn: string;
  type: 'fruit' | 'veg';
  ownFarm?: boolean;
  seasonEn: string;
  seasonBn: string;
  months: number[]; // 1 = Jan, 12 = Dec
  peakMonths: number[];
  transit: 'Air' | 'Sea Reefer' | 'Both';
  temp: string;
  packing: string;
  moq: string;
  varieties?: string[];
  productRef?: Product;
}

// Complete seasonal calendar database for Bangladeshi export produce
const CROP_CALENDAR: CropCalendarItem[] = [
  {
    id: 'mango-farm',
    nameEn: 'Mango (Own Farm)',
    nameBn: 'আম (নিজস্ব খামার)',
    type: 'fruit',
    ownFarm: true,
    seasonEn: 'May – Aug (Peak Jun-Jul)',
    seasonBn: 'মে – আগস্ট (পিক জুন-জুলাই)',
    months: [5, 6, 7, 8],
    peakMonths: [6, 7],
    transit: 'Both',
    temp: '+10°C to +13°C',
    packing: '2kg, 4kg, 5kg export cartons',
    moq: '500 kg air / 1 FCL sea',
    varieties: ['Amrapali', 'Himsagar', 'Haribhanga', 'Fazli', 'Langra'],
  },
  {
    id: 'tomato-farm',
    nameEn: 'Tomato (Own Farm)',
    nameBn: 'টমেটো (নিজস্ব খামার)',
    type: 'veg',
    ownFarm: true,
    seasonEn: 'Nov – Apr (Peak Dec-Mar)',
    seasonBn: 'নভেম্বর – এপ্রিল (পিক ডিসে-মার্চ)',
    months: [11, 12, 1, 2, 3, 4],
    peakMonths: [12, 1, 2, 3],
    transit: 'Both',
    temp: '+12°C to +15°C',
    packing: 'Perforated plastic crates / cartons',
    moq: '1,000 kg air / Reefer',
    varieties: ['Ratan', 'Roma', 'Hybrid Red'],
  },
  {
    id: 'litchi-crop',
    nameEn: 'Litchi (Lychee)',
    nameBn: 'লিচু (রফতানি মান)',
    type: 'fruit',
    seasonEn: 'May – Jun (Short Season)',
    seasonBn: 'মে – জুন (স্বল্পমেয়াদী মৌসুম)',
    months: [5, 6],
    peakMonths: [5, 6],
    transit: 'Air',
    temp: '+2°C to +4°C',
    packing: '2kg / 5kg cartons with ice packs',
    moq: '300 kg air freight',
    varieties: ['Bedana', 'Bombay', 'China-3'],
  },
  {
    id: 'jackfruit-crop',
    nameEn: 'Jackfruit',
    nameBn: 'কাঁঠাল',
    type: 'fruit',
    seasonEn: 'May – Aug (Peak Jun-Jul)',
    seasonBn: 'মে – আগস্ট (পিক জুন-জুলাই)',
    months: [5, 6, 7, 8],
    peakMonths: [6, 7],
    transit: 'Both',
    temp: '+11°C to +13°C',
    packing: 'Individual heavy cartons / pre-cut',
    moq: '500 kg air / sea',
  },
  {
    id: 'guava-crop',
    nameEn: 'Guava',
    nameBn: 'পেয়ারা',
    type: 'fruit',
    seasonEn: 'Peak Jul – Dec',
    seasonBn: 'পিক জুলাই – ডিসেম্বর',
    months: [7, 8, 9, 10, 11, 12],
    peakMonths: [8, 9, 10],
    transit: 'Air',
    temp: '+8°C to +10°C',
    packing: '4kg / 5kg foam-net wrapped cartons',
    moq: '300 kg air',
    varieties: ['Thai 7', 'Kazi Guava'],
  },
  {
    id: 'pineapple-crop',
    nameEn: 'Pineapple',
    nameBn: 'আনারস',
    type: 'fruit',
    seasonEn: 'Jun – Sep',
    seasonBn: 'জুন – সেপ্টেম্বর',
    months: [6, 7, 8, 9],
    peakMonths: [7, 8],
    transit: 'Both',
    temp: '+8°C to +10°C',
    packing: '10kg / 12kg cartons with dividers',
    moq: '500 kg air / Reefer',
    varieties: ['Giant Kew', 'Honey Queen'],
  },
  {
    id: 'pomelo-crop',
    nameEn: 'Pomelo (Jambura)',
    nameBn: 'বাতাবি লেবু (জাম্বুরা)',
    type: 'fruit',
    seasonEn: 'Sep – Jan',
    seasonBn: 'সেপ্টেম্বর – জানুয়ারি',
    months: [9, 10, 11, 12, 1],
    peakMonths: [10, 11, 12],
    transit: 'Both',
    temp: '+10°C to +12°C',
    packing: '10kg / 12kg cartons',
    moq: '500 kg',
  },
  {
    id: 'watermelon-crop',
    nameEn: 'Watermelon',
    nameBn: 'তরমুজ',
    type: 'fruit',
    seasonEn: 'Feb – Jun',
    seasonBn: 'ফেব্রুয়ারি – জুন',
    months: [2, 3, 4, 5, 6],
    peakMonths: [3, 4, 5],
    transit: 'Sea Reefer',
    temp: '+10°C to +12°C',
    packing: 'Heavy corrugated bins / cartons',
    moq: '1 ton / container',
  },
  {
    id: 'banana-crop',
    nameEn: 'Banana',
    nameBn: 'কলা',
    type: 'fruit',
    seasonEn: 'Year-round Steady Supply',
    seasonBn: 'সারা বছর নিয়মিত সরবরাহ',
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    transit: 'Both',
    temp: '+13°C to +14°C',
    packing: '13.5kg / 18kg telescopic cartons',
    moq: '500 kg air / 1 FCL sea',
    varieties: ['Sagor', 'Sabri', 'Champa'],
  },
  {
    id: 'papaya-crop',
    nameEn: 'Ripe & Green Papaya',
    nameBn: 'পাকা ও কাঁচা পেঁপে',
    type: 'fruit',
    seasonEn: 'Year-round',
    seasonBn: 'সারা বছর',
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    transit: 'Air',
    temp: '+10°C to +12°C',
    packing: '5kg / 6kg cartons',
    moq: '400 kg air',
  },
  {
    id: 'green-chilli-crop',
    nameEn: 'Green Chilli (Bullet / Premium)',
    nameBn: 'কাঁচা মরিচ',
    type: 'veg',
    seasonEn: 'Year-round (High Demand)',
    seasonBn: 'সারা বছর (উচ্চ চাহিদা)',
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakMonths: [1, 2, 3, 4, 10, 11, 12],
    transit: 'Air',
    temp: '+7°C to +10°C',
    packing: '5kg / 7kg ventilated master cartons',
    moq: '300 kg air freight',
  },
  {
    id: 'pointed-gourd-crop',
    nameEn: 'Pointed Gourd (Potol)',
    nameBn: 'পটল',
    type: 'veg',
    seasonEn: 'Mar – Nov (Peak Apr-Sep)',
    seasonBn: 'মার্চ – নভেম্বর (পিক এপ্রিল-সেপ্টে)',
    months: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    peakMonths: [4, 5, 6, 7, 8, 9],
    transit: 'Air',
    temp: '+10°C to +12°C',
    packing: '5kg cartons',
    moq: '300 kg air',
  },
  {
    id: 'okra-crop',
    nameEn: 'Okra / Lady Finger (Dherosh)',
    nameBn: 'ঢেঁড়শ',
    type: 'veg',
    seasonEn: 'Mar – Oct',
    seasonBn: 'মার্চ – অক্টোবর',
    months: [3, 4, 5, 6, 7, 8, 9, 10],
    peakMonths: [4, 5, 6, 7, 8],
    transit: 'Air',
    temp: '+8°C to +10°C',
    packing: '4kg / 5kg export cartons',
    moq: '300 kg air',
  },
  {
    id: 'bitter-gourd-crop',
    nameEn: 'Bitter Gourd (Karela / Korola)',
    nameBn: 'করলা / উচ্ছে',
    type: 'veg',
    seasonEn: 'Mar – Oct',
    seasonBn: 'মার্চ – অক্টোবর',
    months: [3, 4, 5, 6, 7, 8, 9, 10],
    peakMonths: [4, 5, 6, 7, 8],
    transit: 'Air',
    temp: '+10°C to +12°C',
    packing: '5kg cartons',
    moq: '300 kg air',
  },
  {
    id: 'yardlong-bean-crop',
    nameEn: 'Yardlong Bean (Borboti)',
    nameBn: 'বরবটি',
    type: 'veg',
    seasonEn: 'Apr – Nov',
    seasonBn: 'এপ্রিল – নভেম্বর',
    months: [4, 5, 6, 7, 8, 9, 10, 11],
    peakMonths: [5, 6, 7, 8, 9],
    transit: 'Air',
    temp: '+7°C to +9°C',
    packing: '5kg cartons with perforation',
    moq: '300 kg air',
  },
  {
    id: 'eggplant-crop',
    nameEn: 'Eggplant / Brinjal (Begun)',
    nameBn: 'বেগুন (গোল ও লম্বা)',
    type: 'veg',
    seasonEn: 'Oct – Apr',
    seasonBn: 'অক্টোবর – এপ্রিল',
    months: [10, 11, 12, 1, 2, 3, 4],
    peakMonths: [11, 12, 1, 2],
    transit: 'Both',
    temp: '+10°C to +12°C',
    packing: '7kg / 10kg cartons',
    moq: '400 kg air',
  },
  {
    id: 'bottle-gourd-crop',
    nameEn: 'Bottle Gourd (Lau)',
    nameBn: 'লাউ',
    type: 'veg',
    seasonEn: 'Oct – Mar',
    seasonBn: 'অক্টোবর – মার্চ',
    months: [10, 11, 12, 1, 2, 3],
    peakMonths: [11, 12, 1, 2],
    transit: 'Both',
    temp: '+10°C to +12°C',
    packing: 'Individual protective sleeves, 10kg cartons',
    moq: '500 kg air / sea',
  },
  {
    id: 'lemon-crop',
    nameEn: 'Lemon (Elachi / Kagzi Lebu)',
    nameBn: 'লেবু (এলাচি ও কাগজি)',
    type: 'veg',
    seasonEn: 'Year-round Steady Supply',
    seasonBn: 'সারা বছর নিয়মিত সরবরাহ',
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peakMonths: [4, 5, 6, 7, 8, 9],
    transit: 'Both',
    temp: '+8°C to +10°C',
    packing: '6kg / 10kg cartons with mesh bags',
    moq: '300 kg air',
  },
];

const MONTHS = [
  { num: 1, en: 'Jan', bn: 'জানুয়ারি', fullEn: 'January' },
  { num: 2, en: 'Feb', bn: 'ফেব্রুয়ারি', fullEn: 'February' },
  { num: 3, en: 'Mar', bn: 'মার্চ', fullEn: 'March' },
  { num: 4, en: 'Apr', bn: 'এপ্রিল', fullEn: 'April' },
  { num: 5, en: 'May', bn: 'মে', fullEn: 'May' },
  { num: 6, en: 'Jun', bn: 'জুন', fullEn: 'June' },
  { num: 7, en: 'Jul', bn: 'জুলাই', fullEn: 'July' },
  { num: 8, en: 'Aug', bn: 'আগস্ট', fullEn: 'August' },
  { num: 9, en: 'Sep', bn: 'সেপ্টেম্বর', fullEn: 'September' },
  { num: 10, en: 'Oct', bn: 'অক্টোবর', fullEn: 'October' },
  { num: 11, en: 'Nov', bn: 'নভেম্বর', fullEn: 'November' },
  { num: 12, en: 'Dec', bn: 'ডিসেম্বর', fullEn: 'December' },
];

export const HarvestCalendar: React.FC<HarvestCalendarProps> = ({
  lang,
  onQuickAdd,
  onSelectProduct,
}) => {
  // Current month (1-12)
  const currentMonthNum = new Date().getMonth() + 1; // 1 to 12
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>(currentMonthNum);
  const [typeFilter, setTypeFilter] = useState<'all' | 'fruit' | 'veg' | 'ownFarm'>('all');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  // Link products from PRODUCTS database where available
  const calendarItemsWithRef = useMemo(() => {
    return CROP_CALENDAR.map((item) => {
      const match = PRODUCTS.find(
        (p) =>
          p.n.toLowerCase().includes(item.nameEn.split(' ')[0].toLowerCase()) ||
          p.id.toLowerCase() === item.id.replace('-crop', '').replace('-farm', '')
      );
      return {
        ...item,
        productRef: match,
      };
    });
  }, []);

  // Filtered items based on selected month and category
  const filteredCrops = useMemo(() => {
    return calendarItemsWithRef.filter((item) => {
      // Category filter
      if (typeFilter === 'fruit' && item.type !== 'fruit') return false;
      if (typeFilter === 'veg' && item.type !== 'veg') return false;
      if (typeFilter === 'ownFarm' && !item.ownFarm) return false;

      // Month filter
      if (selectedMonth !== 'all') {
        return item.months.includes(selectedMonth);
      }

      return true;
    });
  }, [calendarItemsWithRef, selectedMonth, typeFilter]);

  const handleAddInquiry = (name: string) => {
    onQuickAdd(name);
    setAddedItem(name);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const currentMonthName = useMemo(() => {
    if (selectedMonth === 'all') return lang === 'bn' ? 'সকল মাস' : 'All Months';
    const m = MONTHS.find((m) => m.num === selectedMonth);
    return lang === 'bn' ? m?.bn : m?.fullEn;
  }, [selectedMonth, lang]);

  return (
    <section id="calendar" className="py-16 lg:py-24 bg-[#F6FAF4] dark:bg-[#07190F] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E6032] dark:text-[#28BD64] mb-3">
              <span className="w-6 h-0.5 bg-[#F27B20] rounded-full" />
              <span>{lang === 'bn' ? 'মৌসুমভিত্তিক রফতানি ক্যালেন্ডার' : 'Harvest & Export Availability Calendar'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A1A] dark:text-[#F0FAF3] leading-tight">
              {lang === 'bn'
                ? 'মাসভিত্তিক ফসল উত্তোলন ও রফতানি সময়সূচি।'
                : 'Month-by-month harvest seasons & cargo guide.'}
            </h2>
          </div>
          <p className="text-base text-[#4A6354] dark:text-[#8AAEA0] max-w-md leading-relaxed">
            {lang === 'bn'
              ? 'আন্তর্জাতিক আমদানিকারকদের জন্য বাংলাদেশের নিজস্ব খামারের আম, টমেটো ও শাকসবজির সঠিক সিজনাল উইন্ডো, স্টোরেজ টেম্পারেচার এবং এয়ার/সি ফ্রেইট বিস্তারিত।'
              : 'Reliable shipment windows, cold-chain temperature limits, and freight specifications designed for procurement directors worldwide.'}
          </p>
        </div>

        {/* Month Selector Bar with Live Harvesting Badge */}
        <div className="bg-white dark:bg-[#0C2618] rounded-3xl p-4 sm:p-6 border border-[#D6E5D3] dark:border-[#18432A] shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100 dark:border-[#18432A]">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#0E6032] dark:text-[#28BD64]" />
              <span className="text-sm font-extrabold text-[#0B2A1A] dark:text-[#F0FAF3]">
                {lang === 'bn' ? 'মাস অনুযায়ী দেখুন:' : 'Select Shipment Month:'}
              </span>
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-black">
                {currentMonthName} ({filteredCrops.length} {lang === 'bn' ? 'টি পণ্য' : 'Crops'})
              </span>
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedMonth(currentMonthNum)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedMonth === currentMonthNum
                    ? 'bg-[#0E6032] text-white shadow-xs'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-[#0E6032] dark:text-[#28BD64] hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'চলতি মাস (Active Now)' : 'In Season Now'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMonth('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedMonth === 'all'
                    ? 'bg-[#0E6032] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-emerald-950/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-emerald-900/60'
                }`}
              >
                {lang === 'bn' ? 'সকল ১২ মাস' : 'Full 12 Months'}
              </button>
            </div>
          </div>

          {/* 12 Months Pills Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {MONTHS.map((m) => {
              const isSelected = selectedMonth === m.num;
              const isCurrent = currentMonthNum === m.num;
              // Count crops available in this month
              const count = calendarItemsWithRef.filter((c) => c.months.includes(m.num)).length;

              return (
                <button
                  key={m.num}
                  type="button"
                  onClick={() => setSelectedMonth(m.num)}
                  className={`py-2 px-1.5 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#0E6032] text-white border-[#0E6032] shadow-md scale-102 font-black'
                      : isCurrent
                      ? 'bg-amber-50 dark:bg-amber-950/30 text-[#B94F08] dark:text-[#FFA25C] border-amber-300 dark:border-amber-800/60 font-bold hover:bg-amber-100'
                      : 'bg-slate-50 dark:bg-[#113822]/40 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-[#1E4D34] hover:bg-slate-100 dark:hover:bg-[#184a2e]'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider font-extrabold">
                    {lang === 'bn' ? m.bn : m.en}
                  </span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
                    {count} {lang === 'bn' ? 'ফসল' : 'crops'}
                  </span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F27B20] mt-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Secondary Filter: Category Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-[#18432A]">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Filter className="w-3.5 h-3.5 text-[#0E6032] dark:text-[#28BD64]" />
              <span className="font-bold">{lang === 'bn' ? 'ক্যাটাগরি ফিল্টার:' : 'Category:'}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  typeFilter === 'all'
                    ? 'bg-[#0E6032] text-white'
                    : 'bg-slate-100 dark:bg-[#113822] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {lang === 'bn' ? 'সকল পণ্য' : 'All Crops'}
              </button>

              <button
                type="button"
                onClick={() => setTypeFilter('ownFarm')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  typeFilter === 'ownFarm'
                    ? 'bg-[#0E6032] text-white'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-[#0E6032] dark:text-[#28BD64] hover:bg-emerald-100'
                }`}
              >
                ★ {lang === 'bn' ? 'নিজস্ব খামার (আম ও টমেটো)' : 'Own Farm (Mango & Tomato)'}
              </button>

              <button
                type="button"
                onClick={() => setTypeFilter('fruit')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  typeFilter === 'fruit'
                    ? 'bg-[#0E6032] text-white'
                    : 'bg-slate-100 dark:bg-[#113822] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {lang === 'bn' ? 'ফলমূল (Fruits)' : 'Fresh Fruits'}
              </button>

              <button
                type="button"
                onClick={() => setTypeFilter('veg')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  typeFilter === 'veg'
                    ? 'bg-[#0E6032] text-white'
                    : 'bg-slate-100 dark:bg-[#113822] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {lang === 'bn' ? 'শাকসবজি (Vegetables)' : 'Vegetables'}
              </button>
            </div>
          </div>
        </div>

        {/* Crops Availability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => {
            const isPeak =
              selectedMonth !== 'all' && crop.peakMonths.includes(selectedMonth);
            const isAdded = addedItem === (lang === 'bn' ? crop.nameBn : crop.nameEn);

            return (
              <div
                key={crop.id}
                className={`bg-white dark:bg-[#0C2618] rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl relative group ${
                  crop.ownFarm
                    ? 'border-[#0E6032]/40 dark:border-[#28BD64]/30 ring-1 ring-[#0E6032]/10 dark:ring-[#28BD64]/10'
                    : 'border-slate-200/90 dark:border-[#18432A]'
                }`}
              >
                <div>
                  {/* Top Header: Name & Badges */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            crop.type === 'fruit'
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-[#B94F08] dark:text-[#FFA25C]'
                              : 'bg-emerald-100 dark:bg-emerald-950/60 text-[#0E6032] dark:text-[#28BD64]'
                          }`}
                        >
                          {crop.type === 'fruit' ? (lang === 'bn' ? 'ফল' : 'Fruit') : (lang === 'bn' ? 'সবজি' : 'Vegetable')}
                        </span>

                        {crop.ownFarm && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0E6032] text-white">
                            {lang === 'bn' ? 'নিজস্ব খামার' : 'Own Farm'}
                          </span>
                        )}

                        {isPeak && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F27B20] text-white flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>{lang === 'bn' ? 'পিক মৌসুম' : 'Peak Harvest'}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-black text-[#0B2A1A] dark:text-[#F0FAF3] group-hover:text-[#0E6032] dark:group-hover:text-[#28BD64] transition-colors">
                        {lang === 'bn' ? crop.nameBn : crop.nameEn}
                      </h3>
                    </div>
                  </div>

                  {/* Season Label */}
                  <p className="text-xs font-bold text-[#0E6032] dark:text-[#28BD64] mb-3 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{lang === 'bn' ? crop.seasonBn : crop.seasonEn}</span>
                  </p>

                  {/* 12-Month Visual Mini Bar */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
                      {lang === 'bn' ? 'বার্ষিক ক্যালেন্ডার সূচক:' : 'Harvest Availability Window:'}
                    </span>
                    <div className="grid grid-cols-12 gap-0.5 bg-slate-100 dark:bg-[#113822] p-1 rounded-lg">
                      {MONTHS.map((m) => {
                        const isAvailable = crop.months.includes(m.num);
                        const isPeakMonth = crop.peakMonths.includes(m.num);
                        const isThisSelected = selectedMonth === m.num;

                        return (
                          <div
                            key={m.num}
                            title={`${m.fullEn}: ${isPeakMonth ? 'Peak Harvest' : isAvailable ? 'Available' : 'Off Season'}`}
                            className={`h-4 rounded-xs flex items-center justify-center text-[8px] font-bold transition-all ${
                              isThisSelected
                                ? 'ring-1.5 ring-[#0B2A1A] dark:ring-white scale-110 z-10'
                                : ''
                            } ${
                              isPeakMonth
                                ? 'bg-[#0E6032] text-white'
                                : isAvailable
                                ? 'bg-emerald-300 dark:bg-emerald-600 text-[#0B2A1A] dark:text-white'
                                : 'bg-slate-200/60 dark:bg-slate-800/40 text-transparent'
                            }`}
                          >
                            {m.en[0]}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Specs Matrix */}
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#113822]/40 p-3 rounded-2xl border border-slate-100 dark:border-[#1E4D34] mb-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Thermometer className="w-3.5 h-3.5 text-[#0E6032] dark:text-[#28BD64]" />
                        <span>{lang === 'bn' ? 'সংরক্ষণ তাপমাত্রা:' : 'Cold Storage:'}</span>
                      </span>
                      <span className="font-bold text-[#0B2A1A] dark:text-[#F0FAF3]">{crop.temp}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        {crop.transit === 'Air' ? (
                          <Plane className="w-3.5 h-3.5 text-[#F27B20]" />
                        ) : (
                          <Ship className="w-3.5 h-3.5 text-[#0E6032] dark:text-[#28BD64]" />
                        )}
                        <span>{lang === 'bn' ? 'শিপিং মাধ্যম:' : 'Freight Mode:'}</span>
                      </span>
                      <span className="font-bold text-[#0B2A1A] dark:text-[#F0FAF3]">
                        {crop.transit === 'Both'
                          ? (lang === 'bn' ? 'এয়ার ও সি রীফার' : 'Air & Sea Reefer')
                          : crop.transit === 'Air'
                          ? (lang === 'bn' ? 'এয়ার ফ্রেইট' : 'Air Freight')
                          : (lang === 'bn' ? 'সি রীফার কনটেইনার' : 'Sea Reefer')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Package className="w-3.5 h-3.5 text-[#0E6032] dark:text-[#28BD64]" />
                        <span>{lang === 'bn' ? 'প্যাকিং ও এমওকিউ:' : 'Packing & MOQ:'}</span>
                      </span>
                      <span className="font-bold text-[#0B2A1A] dark:text-[#F0FAF3] text-right truncate max-w-[140px]">
                        {crop.moq}
                      </span>
                    </div>

                    {crop.varieties && crop.varieties.length > 0 && (
                      <div className="pt-1 border-t border-slate-200/60 dark:border-[#1E4D34] text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          {lang === 'bn' ? 'জাতসমূহ: ' : 'Varieties: '}
                        </span>
                        <span>{crop.varieties.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action: Add to Quotation */}
                <button
                  type="button"
                  onClick={() => handleAddInquiry(lang === 'bn' ? crop.nameBn : crop.nameEn)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    isAdded
                      ? 'bg-[#1FA855] text-white shadow-md'
                      : 'bg-[#0E6032] hover:bg-[#17894A] text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'তালিকায় যোগ হয়েছে' : 'Added to Inquiry Basket'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'কোটেশন তালিকায় যোগ করুন' : 'Add to Inquiry Basket'}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Procurement Advice Note for International Buyers */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 to-[#0B2A1A] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#FFA25C]" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-white">
                {lang === 'bn'
                  ? 'অগ্রিম বুকিং ও কাস্টম কনসাইনমেন্ট শিডিউল'
                  : 'Advance Crop Reservation & Custom Flight Charters'}
              </h4>
              <p className="text-sm text-emerald-100/80 mt-1 max-w-2xl leading-relaxed">
                {lang === 'bn'
                  ? 'পিক মৌসুমে আম (আম্রপালি/হিমসাগর) ও শাকসবজির বিমান কার্গো স্পেস সীমিত থাকে। কাঙ্ক্ষিত তারিখে ফ্রেইট স্লট নিশ্চিত করতে মৌসুম শুরুর ২-৩ সপ্তাহ পূর্বে যোগাযোগ করুন।'
                  : 'Air cargo capacity fills rapidly during peak mango and winter vegetable windows. For bulk commercial shipments or weekly chartered pallet schedules, lock in your allocations 2-3 weeks in advance.'}
              </p>
            </div>
          </div>

          <a
            href="#inquiry"
            className="px-6 py-3 rounded-full bg-[#F27B20] hover:bg-[#d96614] text-white font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-lg cursor-pointer"
          >
            {lang === 'bn' ? 'কাস্টম কোটেশন চান?' : 'Build Quotation'}
          </a>
        </div>
      </div>
    </section>
  );
};
