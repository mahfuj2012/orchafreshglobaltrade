import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Stamp,
  Award,
  Globe2,
  Plane,
  Ship,
  Building,
  ScrollText,
  Search,
  ExternalLink,
  ChevronRight,
  Info,
  Check,
  Download,
  AlertCircle
} from 'lucide-react';
import { Language } from '../types';

interface DocumentItem {
  id: string;
  nameEn: string;
  nameBn: string;
  category: 'customs' | 'safety' | 'shipping';
  authorityEn: string;
  authorityBn: string;
  leadTimeEn: string;
  leadTimeBn: string;
  requiredForEn: string;
  requiredForBn: string;
  purposeEn: string;
  purposeBn: string;
  mandatory: boolean;
  keyFieldsEn: string[];
  keyFieldsBn: string[];
}

const DOCUMENTS_DATA: DocumentItem[] = [
  {
    id: 'phytosanitary',
    nameEn: 'Phytosanitary Certificate (Plant Quarantine)',
    nameBn: 'উদ্ভিদ সঙ্গনিরোধ সনদপত্র (Phytosanitary)',
    category: 'safety',
    authorityEn: 'Plant Quarantine Wing, Department of Agricultural Extension (DAE), Bangladesh',
    authorityBn: 'উদ্ভিদ সঙ্গনিরোধ উইং, কৃষি সম্প্রসারণ অধিদপ্তর (DAE), বাংলাদেশ',
    leadTimeEn: '24 – 48 Hours prior to flight/vessel departure',
    leadTimeBn: 'ফ্লাইট বা জাহাজের ছাড়ার ২৪ – ৪৮ ঘণ্টা পূর্বে',
    requiredForEn: 'Mandatory for 100% of fresh fruit and vegetable shipments worldwide',
    requiredForBn: 'বিশ্বের যেকোনো দেশে তাজা ফল ও সবজি রফতানির জন্য শতভাগ বাধ্যতামূলক',
    purposeEn: 'Certifies that mangoes, tomatoes, or fresh vegetables are thoroughly inspected, fumigated/hot-water treated if required, and certified free from quarantine agricultural pests, fruit flies, and infectious plant pathogens.',
    purposeBn: 'প্রত্যয়ন করে যে রফতানি পণ্যগুলো সরকারি ল্যাবে সম্পূর্ণভাবে পরীক্ষিত, রোগ-বালাই ও কোয়ারেন্টাইন ক্ষতিকর পোকা-মাকড় মুক্ত এবং আন্তর্জাতিক খাদ্য সুরক্ষা মান পূরণ করে।',
    mandatory: true,
    keyFieldsEn: [
      'Official Botanical & Cultivar Name',
      'Port of Origin (DAC / CGP)',
      'Disinfestation / Hot Water Treatment Record',
      'Consignee Name & Port of Entry',
      'Inspection Seal & Official Quarantine Officer Signature',
    ],
    keyFieldsBn: [
      'পণ্যের বৈজ্ঞানিক ও জাতের নাম',
      'উৎপাদন ও রফতানি বন্দর (DAC / CGP)',
      'হট-ওয়াটার ট্রিটমেন্ট বা জীবাণুমুক্তকরণ তথ্য',
      'আমদানিকারকের নাম ও প্রবেশ বন্দর',
      'কোয়ারেন্টাইন অফিসারের স্বাক্ষর ও সরকারি সিল',
    ],
  },
  {
    id: 'air-waybill',
    nameEn: 'Air Waybill (AWB) / Ocean Bill of Lading (B/L)',
    nameBn: 'এয়ার ওয়েবিল (AWB) / বিল অব লেডিং (B/L)',
    category: 'shipping',
    authorityEn: 'Carrier Airline (Emirates SkyCargo, Saudia, Qatar, Biman) / Ocean Shipping Line (Maersk, MSC)',
    authorityBn: 'আন্তর্জাতিক এয়ারলাইন্স বা শিপিং লাইন',
    leadTimeEn: 'Issued immediately upon cargo hand-over at airport/seaport',
    leadTimeBn: 'পণ্য বিমানবন্দর বা সমুদ্রবন্দরে হস্তান্তর করার সাথে সাথে ইস্যু করা হয়',
    requiredForEn: 'Mandatory proof of carriage & title for cargo release',
    requiredForBn: 'পণ্য রিলিজ ও কাস্টমস ক্লিয়ারেন্সের জন্য মালিকানা চুক্তিপত্র',
    purposeEn: 'Acts as the official carriage receipt, confirming flight number, tracking Master AWB / House AWB, cargo gross weight, tare weight, cold-storage instructions (+10°C to +13°C), and airport-to-airport transit terms.',
    purposeBn: 'বিমানের ফ্লাইট নম্বর, ট্র্যাকিং AWB কোড, মোট ওজন, কোল্ড-চেইন তাপমাত্রা নির্দেশাবলী এবং পণ্যের গন্তব্য নিশ্চিত করার অফিশিয়াল ট্রান্সপোর্ট ডকুমেন্ট।',
    mandatory: true,
    keyFieldsEn: [
      'Master Air Waybill (MAWB) Number',
      'Flight No. & Estimated Arrival Time (ETA)',
      'Gross Weight (kg) & Net Weight (kg)',
      'Cold-Chain Temperature Warning (+10°C / +12°C)',
      'Airport of Departure (DAC) & Discharge Airport',
    ],
    keyFieldsBn: [
      'মাস্টার এয়ার ওয়েবিল (MAWB) নম্বর',
      'ফ্লাইট নম্বর ও পৌঁছানোর আনুমানিক সময় (ETA)',
      'গ্রস ওজন ও নেট ওজন (কেজি)',
      'তাপমাত্রা বজায় রাখার সতর্কবার্তা (+১০°সে / +১২°সে)',
      'উড্ডয়ন ও অবতরণ বিমানবন্দর',
    ],
  },
  {
    id: 'commercial-invoice',
    nameEn: 'Commercial Invoice (CI)',
    nameBn: 'বাণিজ্যিক চালানপত্র (Commercial Invoice)',
    category: 'customs',
    authorityEn: 'OrchaFresh Global Trade (Official Corporate Seal)',
    authorityBn: 'অর্চাফ্রেশ গ্লোবাল ট্রেড (কর্পোরেট সিল ও স্বাক্ষর)',
    leadTimeEn: 'Generated upon shipment booking and finalized at final packhouse weighing',
    leadTimeBn: 'প্যাকিং ও চূড়ান্ত ওজন নিশ্চিতের পর ইস্যু করা হয়',
    requiredForEn: 'Mandatory customs duty assessment and banking settlement',
    requiredForBn: 'আমদানি শুল্ক মূল্যায়ন ও ব্যাংকিং এলসি নিষ্পত্তির জন্য আবশ্যক',
    purposeEn: 'Formal transaction statement detailing agreed trade terms (FOB Dhaka / CIF / CFR), HS tariff codes (e.g., 0804.50 for fresh mangoes, 0702.00 for tomatoes), unit prices, quantity per carton, and buyer billing details.',
    purposeBn: 'বাণিজ্যিক ইনকোটর্ম (FOB/CIF), পণ্যের এইচএস কোড (HS Code), কার্টন প্রতি ইউনিট প্রাইস এবং বায়ারের পেমেন্ট তথ্য সংবলিত আইনি বিল।',
    mandatory: true,
    keyFieldsEn: [
      'Invoice No. & Date',
      'HS Tariff Harmonized Codes',
      'Agreed IncoTerm (FOB DAC, CIF Dubai, etc.)',
      'Unit Price (USD/EUR) & Total Value',
      'Bank Account & Swift Routing Details',
    ],
    keyFieldsBn: [
      'চালান নম্বর ও তারিখ',
      'আন্তর্জাতিক এইচএস ট্যারিফ কোড',
      'সম্মিলিত ইনকোটর্ম (FOB DAC, CIF Dubai ইত্যাদি)',
      'ইউনিট প্রাইস এবং মোট মূল্য',
      'ব্যাংক সুইফট ও পেমেন্ট বিবরণ',
    ],
  },
  {
    id: 'packing-list',
    nameEn: 'Export Packing List (PL)',
    nameBn: 'রফতানি প্যাকিং তালিকা (Packing List)',
    category: 'customs',
    authorityEn: 'OrchaFresh Global Trade Quality & Packaging Division',
    authorityBn: 'অর্চাফ্রেশ গ্লোবাল ট্রেড কোয়ালিটি ও প্যাকিং শাখা',
    leadTimeEn: 'Prepared during packhouse sorting & palletizing',
    leadTimeBn: 'প্যাকহাউসে গ্রেডিং ও প্যালেটাইজিং চলাকালে প্রস্তুতকৃত',
    requiredForEn: 'Mandatory for port inspection, tare weight verification & offloading',
    requiredForBn: 'কার্গো খালাস ও ওজন পরিদর্শনের জন্য আবশ্যক',
    purposeEn: 'Specifies exact carton-by-carton breakdown, individual box dimensions (e.g. 5kg ventilated cartons), pallet configuration, fruit size counts (e.g. 8–10 mangoes per carton), net weight, and total volumetric weight.',
    purposeBn: 'প্রতিটি কার্টনের সঠিক পরিমাপ, ফলের আকার ও সংখ্যা (যেমন কার্টন প্রতি ৮-১০টি আম), নেট ওজন ও প্যালেটের বিন্যাস বিস্তারিত উল্লেখ থাকে।',
    mandatory: true,
    keyFieldsEn: [
      'Total Number of Master Cartons',
      'Carton Dimension & Material (Corrugated / Vented)',
      'Individual Tare & Gross Weight per Unit',
      'Pallet Numbers & Loading Manifest',
      'Batch Lot ID & Packing Date',
    ],
    keyFieldsBn: [
      'মোট কার্টন সংখ্যা',
      'কার্টনের সাইজ ও উপাদান',
      'কার্টন প্রতি মোট ও নেট ওজন',
      'প্যালেট নম্বর ও লোডিং মেনিফেস্ট',
      'ব্যাচ নম্বর ও প্যাকিং তারিখ',
    ],
  },
  {
    id: 'certificate-origin',
    nameEn: 'Certificate of Origin (COO)',
    nameBn: 'উৎপাদন দেশের মূল সনদপত্র (Certificate of Origin)',
    category: 'customs',
    authorityEn: 'Dhaka Chamber of Commerce & Industry (DCCI) / Export Promotion Bureau (EPB)',
    authorityBn: 'ঢাকা চেম্বার অব কমার্স (DCCI) / রফতানি উন্নয়ন ব্যুরো (EPB)',
    leadTimeEn: '24 Hours after packhouse customs inspection',
    leadTimeBn: 'কাস্টমস ইন্সপেকশনের ২৪ ঘণ্টার মধ্যে',
    requiredForEn: 'Tariff concessions, duty-free quotas, and trade treaty benefits',
    requiredForBn: 'আমদানি শুল্ক ছাড় ও আন্তর্জাতিক বাণিজ্য চুক্তির সুবিধার জন্য',
    purposeEn: 'Certifies that the agricultural produce is 100% grown, harvested, and packed in Bangladesh, granting preferential customs entry into GCC nations, the UK, Europe, and Asian bilateral partners.',
    purposeBn: 'প্রমাণ করে যে ফল ও সবজি সম্পূর্ণরূপে বাংলাদেশের মাটিতে উৎপাদিত ও প্রক্রিয়াজাত, যা মধ্যপ্রাচ্য, ইউরোপ ও যুক্তরাজ্যে শুল্কমুক্ত বা কম শুল্ক সুবিধা পেতে সাহায্য করে।',
    mandatory: true,
    keyFieldsEn: [
      'Country of Origin: Bangladesh',
      'Chamber Seal & Chamber Secretary Endorsement',
      'Consignee Name & Destination Country',
      'Harmonized System (HS) Produce Classifications',
      'Direct Flight / Vessel Routing Confirmation',
    ],
    keyFieldsBn: [
      'উৎপাদন দেশ: বাংলাদেশ',
      'চেম্বার সিল ও অনুমোদিত কর্মকর্তার স্বাক্ষর',
      'আমদানিকারকের নাম ও গন্তব্য দেশ',
      'এইচএস কোড ক্লাসিফিকেশন',
      'রুট ও ফ্লাইট ট্রানজিট নিশ্চিতকরণ',
    ],
  },
  {
    id: 'lab-test-mrl',
    nameEn: 'Pesticide MRL & Microbiological Lab Report',
    nameBn: 'কীটনাশক অবশিষ্টাংশ ও মাইক্রোবায়োলজি ল্যাব রিপোর্ট',
    category: 'safety',
    authorityEn: 'Bangladesh Council of Scientific & Industrial Research (BCSIR) / Accredited ISO-17025 Labs',
    authorityBn: 'বিসিএসআইআর (BCSIR) ও অ্যাক্রিডিটেড সরকারি ল্যাব',
    leadTimeEn: 'Conducted before seasonal harvest launch & periodic consignment testing',
    leadTimeBn: 'মৌসুম শুরুর পূর্বে এবং প্রতিটি নিয়মিত চালানের জন্য সংরক্ষিত',
    requiredForEn: 'Mandatory for EU, UK, and premium supermarket chains in the Gulf',
    requiredForBn: 'ইউরোপ, যুক্তরাজ্য এবং মধ্যপ্রাচ্যের শীর্ষ সুপারমার্কেট চেইনের জন্য আবশ্যক',
    purposeEn: 'Verifies Maximum Residue Limits (MRL) for chemical sprays, confirming zero banned agro-chemicals, undetectable heavy metals, and complete microbiological safety (Salmonella, E. coli free).',
    purposeBn: 'নিশ্চিত করে যে ফসলে কোনো ক্ষতিকর রাসায়নিক বা কীটনাশকের সহনীয় মাত্রার বেশি অবশিষ্ট নেই এবং পণ্যটি সম্পূর্ণ নিরাপদ ও ব্যাকটেরিয়া মুক্ত।',
    mandatory: false,
    keyFieldsEn: [
      'MRL Parts-Per-Million (PPM) Values',
      'Zero Banned Organophosphates / Carbaryl Guarantee',
      'Microbiological Safety (Salmonella/Listeria Negative)',
      'ISO/IEC 17025 Lab Seal & Signature',
    ],
    keyFieldsBn: [
      'কীটনাশক পিপিএম (PPM) মাত্রা',
      'নিষিদ্ধ রাসায়নিক মুক্ততার নিশ্চয়তা',
      'স্যালমোনেলা ও ব্যাকটেরিয়ামুক্ত সার্টিফিকেট',
      'আন্তর্জাতিক মানসম্পন্ন ল্যাব টেস্ট রেজাল্ট',
    ],
  },
];

interface ExportDocumentationProps {
  lang: Language;
}

export const ExportDocumentation: React.FC<ExportDocumentationProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'customs' | 'safety' | 'shipping'>('all');
  const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(DOCUMENTS_DATA[0]);

  const filteredDocs = DOCUMENTS_DATA.filter((doc) => {
    if (selectedCategory === 'all') return true;
    return doc.category === selectedCategory;
  });

  return (
    <section id="documentation" className="py-16 lg:py-24 bg-white dark:bg-[#07190F] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E6032] dark:text-[#28BD64] mb-3">
              <span className="w-6 h-0.5 bg-[#F27B20] rounded-full" />
              <span>{lang === 'bn' ? 'রফতানি ডকুমেন্টস ও সনদপত্র' : 'Export Documentation & Compliance'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A1A] dark:text-[#F0FAF3] leading-tight">
              {lang === 'bn'
                ? 'আইনসম্মত রফতানি ও নির্বিঘ্ন বন্দর ছাড়পত্রের কাগজপত্র।'
                : 'Complete legal paperwork for seamless customs clearance.'}
            </h2>
          </div>
          <p className="text-base text-[#4A6354] dark:text-[#8AAEA0] max-w-md leading-relaxed">
            {lang === 'bn'
              ? 'বাংলাদেশ কৃষি সম্প্রসারণ অধিদপ্তর (DAE) ও আন্তর্জাতিক উদ্ভিদ সঙ্গনিরোধ মানদণ্ড মেনে প্রতিটি চালানের সাথে প্রয়োজনীয় সব মূল কাগজপত্র সরবরাহ করা হয়।'
              : 'Every consignment leaves Dhaka with certified phytosanitary clearance, chamber of commerce origin certs, and international carrier airway bills for zero customs delays.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-[#F6FAF4] dark:bg-[#0C2618] border border-[#D6E5D3] dark:border-[#18432A] mb-10">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#0E6032] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-[#113822]'
              }`}
            >
              {lang === 'bn' ? 'সকল ডকুমেন্টস (৬টি)' : 'All Export Papers (6)'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('safety')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'safety'
                  ? 'bg-[#0E6032] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-[#113822]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'উদ্ভিদ সঙ্গনিরোধ ও খাদ্য সুরক্ষা' : 'Phytosanitary & Plant Health'}</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('shipping')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'shipping'
                  ? 'bg-[#0E6032] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-[#113822]'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'শিপিং ও এয়ার ওয়েবিল' : 'Air / Sea Freight Title'}</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('customs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'customs'
                  ? 'bg-[#0E6032] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-[#113822]'
              }`}
            >
              <Stamp className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'কাস্টমস চালান ও সিওও' : 'Customs Invoice & COO'}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0E6032] dark:text-[#28BD64]">
            <CheckCircle2 className="w-4 h-4" />
            <span>{lang === 'bn' ? '১০০% ভেরিফাইড এক্সপোর্ট ডিরেক্টরি' : '100% Export Compliant'}</span>
          </div>
        </div>

        {/* Master-Detail Document Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Document List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredDocs.map((doc) => {
              const isSelected = activeDoc?.id === doc.id;

              return (
                <div
                  key={doc.id}
                  onClick={() => setActiveDoc(doc)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-emerald-50/80 dark:bg-[#113822] border-[#0E6032] dark:border-[#28BD64] shadow-md scale-101'
                      : 'bg-white dark:bg-[#0C2618] border-slate-200/80 dark:border-[#18432A] hover:border-emerald-300 dark:hover:border-emerald-700'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#0E6032] text-white'
                          : 'bg-slate-100 dark:bg-[#07190F] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {doc.category === 'safety' ? (
                        <ShieldCheck className="w-5 h-5" />
                      ) : doc.category === 'shipping' ? (
                        <Plane className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            doc.mandatory
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-[#0E6032] dark:text-[#28BD64]'
                              : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          }`}
                        >
                          {doc.mandatory ? (lang === 'bn' ? 'বাধ্যতামূলক' : 'Mandatory') : (lang === 'bn' ? 'দেশভিত্তিক আবশ্যক' : 'On Request / Specific Ports')}
                        </span>
                      </div>

                      <h4
                        className={`text-sm sm:text-base font-extrabold leading-snug ${
                          isSelected
                            ? 'text-[#0E6032] dark:text-[#28BD64]'
                            : 'text-[#0B2A1A] dark:text-[#F0FAF3]'
                        }`}
                      >
                        {lang === 'bn' ? doc.nameBn : doc.nameEn}
                      </h4>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {lang === 'bn' ? doc.authorityBn : doc.authorityEn}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 shrink-0 mt-2 transition-transform ${
                      isSelected
                        ? 'text-[#0E6032] dark:text-[#28BD64] translate-x-1'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Paperwork Spec Sheet */}
          <div className="lg:col-span-7">
            {activeDoc && (
              <div className="bg-[#F6FAF4] dark:bg-[#0C2618] rounded-3xl p-6 sm:p-8 border border-[#D6E5D3] dark:border-[#18432A] shadow-lg sticky top-24">
                {/* Header with Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200/80 dark:border-[#18432A] mb-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-[#F27B20]">
                      {lang === 'bn' ? 'ডকুমেন্ট স্পেসিফিকেশন' : 'Official Document Specification'}
                    </span>
                    <h3 className="text-2xl font-black text-[#0B2A1A] dark:text-[#F0FAF3] mt-0.5">
                      {lang === 'bn' ? activeDoc.nameBn : activeDoc.nameEn}
                    </h3>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      activeDoc.mandatory
                        ? 'bg-[#0E6032] text-white shadow-xs'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {activeDoc.mandatory
                      ? (lang === 'bn' ? '✓ শতভাগ প্রযোজ্য' : '✓ Standard Clearance')
                      : (lang === 'bn' ? 'বাজারভেদে প্রস্তুত' : 'Target Market Protocol')}
                  </span>
                </div>

                {/* Purpose Paragraph */}
                <div className="mb-6">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    {lang === 'bn' ? 'ডকুমেন্টের উদ্দেশ্য ও বিবরণ:' : 'Purpose & Customs Role:'}
                  </h5>
                  <p className="text-sm sm:text-base text-[#132F20] dark:text-[#DDEEE4] leading-relaxed bg-white dark:bg-[#07190F] p-4 rounded-2xl border border-slate-200/60 dark:border-[#1E4D34]">
                    {lang === 'bn' ? activeDoc.purposeBn : activeDoc.purposeEn}
                  </p>
                </div>

                {/* Authority & Lead Time Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#07190F] border border-slate-200/60 dark:border-[#1E4D34]">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                      {lang === 'bn' ? 'ইস্যুকৃত কর্তৃপক্ষ (Authority):' : 'Issuing Government Body / Carrier:'}
                    </span>
                    <p className="text-xs font-bold text-[#0B2A1A] dark:text-[#F0FAF3]">
                      {lang === 'bn' ? activeDoc.authorityBn : activeDoc.authorityEn}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-[#07190F] border border-slate-200/60 dark:border-[#1E4D34]">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                      {lang === 'bn' ? 'প্রস্তুতির সময়কাল (Lead Time):' : 'Turnaround & Handover Time:'}
                    </span>
                    <p className="text-xs font-bold text-[#0E6032] dark:text-[#28BD64]">
                      {lang === 'bn' ? activeDoc.leadTimeBn : activeDoc.leadTimeEn}
                    </p>
                  </div>
                </div>

                {/* Mandatory Checkbox / Requirement Scope */}
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-[#113822]/60 border border-emerald-200/80 dark:border-emerald-800/60 mb-6 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0E6032] dark:text-[#28BD64] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-extrabold text-[#0E6032] dark:text-[#28BD64] block">
                      {lang === 'bn' ? 'প্রযোজ্য গন্তব্য বন্দর:' : 'Clearance Scope:'}
                    </span>
                    <span className="text-xs text-[#132F20] dark:text-[#E0EFE6] font-medium">
                      {lang === 'bn' ? activeDoc.requiredForBn : activeDoc.requiredForEn}
                    </span>
                  </div>
                </div>

                {/* Critical Clauses / Key Fields Included */}
                <div className="mb-6">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                    {lang === 'bn' ? 'ডকুমেন্টে অন্তর্ভুক্ত প্রধান তথ্যাবলী:' : 'Mandatory Fields Verified on Paperwork:'}
                  </h5>
                  <div className="space-y-2">
                    {(lang === 'bn' ? activeDoc.keyFieldsBn : activeDoc.keyFieldsEn).map((field, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0E6032] dark:bg-[#28BD64] shrink-0" />
                        <span>{field}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Call to Action for Custom Import Permits */}
                <div className="pt-5 border-t border-slate-200/80 dark:border-[#18432A] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                    {lang === 'bn'
                      ? 'আপনার দেশের কোনো বিশেষ আমদানি অনুমতি (Import Permit) প্রয়োজন থাকলে জানান।'
                      : 'Need specific consular attestation or country import permits?'}
                  </span>

                  <a
                    href="#inquiry"
                    className="px-5 py-2.5 rounded-full bg-[#0E6032] hover:bg-[#17894A] text-white text-xs font-bold transition-all shadow-xs whitespace-nowrap cursor-pointer"
                  >
                    {lang === 'bn' ? 'ডকুমেন্টস সহ কোটেশন চান' : 'Request Quotation with Docs'}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Compliance Summary Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B2A1A] via-[#0E4726] to-[#0A2617] text-white shadow-xl border border-emerald-800/40 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 mx-auto md:mx-0">
              <Stamp className="w-5 h-5 text-[#FFA25C]" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-white">
                {lang === 'bn' ? 'সরকারি উদ্ভিদ সঙ্গনিরোধ' : '100% Plant Quarantine Inspected'}
              </h5>
              <p className="text-xs text-emerald-100/70 mt-1">
                {lang === 'bn'
                  ? 'ঢাকা বিমানবন্দর সেন্ট্রাল ল্যাব দ্বারা প্রতিটি কার্গো প্যাকিংয়ের পর সিলগালা করা হয়।'
                  : 'Every lot is sealed and stamped by Dhaka Plant Quarantine Wing prior to aircraft loading.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 mx-auto md:mx-0">
              <Globe2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-white">
                {lang === 'bn' ? 'আন্তর্জাতিক শুল্ক ছাড়পত্র' : 'GCC, UK & EU Customs Formats'}
              </h5>
              <p className="text-xs text-emerald-100/70 mt-1">
                {lang === 'bn'
                  ? 'ইউএই, সৌদি আরব, কাতার, লন্ডন ও ইউরোপীয় ইউনিয়নের কাস্টমস স্পেসিফিকেশন অনুযায়ী তৈরি।'
                  : 'Tailored for rapid customs clearance in Dubai, Jeddah, London LHR, and Rotterdam.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 mx-auto md:mx-0">
              <ScrollText className="w-5 h-5 text-[#FFA25C]" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-white">
                {lang === 'bn' ? 'ডিজিটাল ও অরিজিনাল কুরিয়ার' : 'Digital Pre-Alert & Air Courier'}
              </h5>
              <p className="text-xs text-emerald-100/70 mt-1">
                {lang === 'bn'
                  ? 'ফ্লাইট ছাড়ার সাথে সাথেই স্ক্যান কপি ইমেইল ও অরিজিনাল ডকুমেন্ট এয়ারওয়েবিলে সংযুক্ত থাকে।'
                  : 'High-res scan pre-alerts sent upon flight take-off; original set travels inside airway bill pouch.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
