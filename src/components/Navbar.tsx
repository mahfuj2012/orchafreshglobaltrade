import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, PhoneCall, Search } from 'lucide-react';
import { CONTACT_INFO } from '../data/orchafreshData';
import { InquiryItem, Language } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { VisitorCounter } from './VisitorCounter';

interface NavbarProps {
  inquiryItems: InquiryItem[];
  onOpenInquiry: () => void;
  onOpenSearch: () => void;
  lang: Language;
  onSetLang: (lang: Language) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onToggleLang?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  inquiryItems,
  onOpenInquiry,
  onOpenSearch,
  lang,
  onSetLang,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItemCount = inquiryItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About', href: '#about' },
    { name: lang === 'bn' ? 'পণ্যসমূহ' : 'Products', href: '#products' },
    { name: lang === 'bn' ? 'ক্যালেন্ডার' : 'Calendar', href: '#calendar' },
    { name: lang === 'bn' ? 'প্রক্রিয়া' : 'Farm to Port', href: '#process' },
    { name: lang === 'bn' ? 'ডকুমেন্টস' : 'Documents', href: '#documentation' },
    { name: lang === 'bn' ? 'গ্যালারি' : 'Gallery', href: '#gallery' },
    { name: lang === 'bn' ? 'কেন আমরা' : 'Why Us', href: '#why' },
    { name: lang === 'bn' ? 'রিভিউ' : 'Reviews', href: '#reviews' },
    { name: lang === 'bn' ? 'টিম' : 'Team', href: '#team' },
    { name: lang === 'bn' ? 'প্রশ্নোত্তর' : 'FAQ', href: '#faq' },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#07190F]/95 backdrop-blur-md shadow-md border-b border-[#18432A] py-2.5'
            : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-950/10 py-2.5'
          : isDark
          ? 'bg-[#07190F]/90 backdrop-blur-sm border-b border-[#18432A]/60 py-3.5'
          : 'bg-[#F6FAF4]/90 backdrop-blur-sm border-b border-emerald-900/5 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#home');
            }}
          >
            <img
              src="/images/mark.png"
              alt="OrchaFresh Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-[#0E6032] dark:text-[#28BD64] group-hover:text-[#17894A] transition-colors">
                ORCHA<span className="text-[#F27B20]">FRESH</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#132F20] dark:text-[#A1C5B3] uppercase mt-0.5">
                GLOBAL TRADE
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 rounded-full text-sm font-semibold text-[#132F20] dark:text-[#DDEEE4] hover:text-[#0E6032] dark:hover:text-[#28BD64] hover:bg-[#E4F2E1]/70 dark:hover:bg-[#113822] transition-all cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Action Buttons, Visual Language Switcher & Dark Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Global Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="inline-flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-bold rounded-full bg-white dark:bg-[#0E291B] hover:bg-emerald-50 dark:hover:bg-[#143B27] text-[#132F20] dark:text-[#E0EFE6] border border-[#D6E5D3] dark:border-[#18432A] shadow-2xs hover:border-[#0E6032] transition-all cursor-pointer group"
              title={lang === 'bn' ? 'সার্চ করুন (Ctrl+K)' : 'Search products, FAQs, gallery (Ctrl+K)'}
              aria-label="Open search"
            >
              <Search className="w-3.5 h-3.5 text-[#0E6032] dark:text-[#28BD64] group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'bn' ? 'অনুসন্ধান...' : 'Search...'}
              </span>
              <kbd className="hidden lg:inline-flex items-center text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#07190F] px-1.5 py-0.5 rounded font-mono border border-slate-200 dark:border-slate-800">
                ⌘K
              </kbd>
            </button>

            {/* Live Website Visitors Pill Indicator */}
            <div className="hidden xl:flex items-center">
              <VisitorCounter lang={lang} variant="pill" />
            </div>

            {/* Visual Language Switcher (Visible on desktop & tablet) */}
            <div className="hidden sm:flex items-center">
              <LanguageSwitcher
                currentLang={lang}
                onLanguageChange={onSetLang}
                variant="compact"
              />
            </div>

            {/* Dark Theme Toggle */}
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

            {/* Direct WhatsApp link */}
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello OrchaFresh! I would like to inquire about exporting fresh produce from Bangladesh.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-[#1FA855] hover:bg-[#188a45] text-white shadow-xs hover:shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Inquiry Basket Button */}
            <button
              onClick={onOpenInquiry}
              className="relative inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#0E6032] hover:bg-[#17894A] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">
                {lang === 'bn' ? 'কোটেশন' : 'Inquiry'}
              </span>
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-black rounded-full bg-[#F27B20] text-white">
                {totalItemCount}
              </span>
            </button>

            {/* Mobile View Language Indicator Pill */}
            <div className="sm:hidden flex items-center">
              <LanguageSwitcher
                currentLang={lang}
                onLanguageChange={onSetLang}
                variant="compact"
              />
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#0B2A1A] dark:text-[#E0EFE6] hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#0E6032] dark:text-[#28BD64]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0C2618] border-b border-emerald-950/10 dark:border-[#18432A] px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#07190F] border border-slate-200 dark:border-[#18432A] text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold mb-3 hover:bg-emerald-50 dark:hover:bg-[#113822] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#0E6032] dark:text-[#28BD64]" />
              <span>{lang === 'bn' ? 'পণ্য, FAQ বা ছবি অনুসন্ধান...' : 'Search produce, FAQs, gallery...'}</span>
            </span>
            <span className="text-[11px] font-bold text-[#0E6032] dark:text-[#28BD64] bg-emerald-100/70 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
              Search
            </span>
          </button>

          <div className="flex flex-col gap-1.5 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-left px-4 py-2.5 rounded-xl text-base font-semibold text-[#132F20] dark:text-[#DDEEE4] hover:bg-[#E4F2E1] dark:hover:bg-[#113822] hover:text-[#0E6032] dark:hover:text-[#28BD64] transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-[#18432A] flex flex-col gap-3">
            {/* Prominent Visual Language Selector inside Drawer */}
            <div className="flex items-center justify-between px-2 bg-slate-50 dark:bg-[#07190F] p-2.5 rounded-2xl border border-slate-200 dark:border-[#18432A]">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {lang === 'bn' ? 'ভাষা পরিবর্তন করুন:' : 'Select Language:'}
              </span>
              <LanguageSwitcher
                currentLang={lang}
                onLanguageChange={(newLang) => {
                  onSetLang(newLang);
                }}
                variant="full"
              />
            </div>

            {/* Theme Toggle Row inside Drawer */}
            <div className="flex items-center justify-between px-2 bg-slate-50 dark:bg-[#07190F] p-2.5 rounded-2xl border border-slate-200 dark:border-[#18432A]">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {lang === 'bn'
                  ? isDark
                    ? 'ডার্ক মোড সক্রিয়'
                    : 'লাইট মোড সক্রিয়'
                  : isDark
                  ? 'Dark Mode Active'
                  : 'Light Mode Active'}
              </span>
              <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
            </div>

            {/* Visitor Counter pill inside Mobile Menu */}
            <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 dark:bg-[#113822]/60 rounded-2xl border border-emerald-200 dark:border-[#18432A]">
              <span className="text-xs font-bold text-[#0E6032] dark:text-[#28BD64]">
                {lang === 'bn' ? 'দর্শক সংখ্যা:' : 'Website Visits:'}
              </span>
              <VisitorCounter lang={lang} variant="pill" />
            </div>

            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#1FA855] text-white font-semibold text-sm shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp ({CONTACT_INFO.phone})</span>
            </a>

            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 dark:border-[#18432A] text-[#132F20] dark:text-[#DDEEE4] font-semibold text-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#0E6032] dark:text-[#28BD64]" />
              <span>Call Founder Directly</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
