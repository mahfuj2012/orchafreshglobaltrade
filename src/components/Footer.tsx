import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ArrowUp } from 'lucide-react';
import { CONTACT_INFO } from '../data/orchafreshData';
import { Language } from '../types';
import { VisitorCounter } from './VisitorCounter';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B2A1A] text-white pt-16 pb-12 border-t border-emerald-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/mark.png"
                alt="OrchaFresh logo"
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white">
                  ORCHA<span className="text-[#F27B20]">FRESH</span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#FFA25C] uppercase">
                  GLOBAL TRADE
                </span>
              </div>
            </div>

            <p className="text-sm font-semibold text-[#FFA25C] mb-3">
              {CONTACT_INFO.tagline}
            </p>
            <p className="text-sm text-emerald-100/70 max-w-sm leading-relaxed mb-6">
              OrchaFresh Global Trade exports high-grade fresh fruit and vegetables from Bangladesh. Sourced with care, delivered with trust.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={CONTACT_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href={CONTACT_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h5 className="text-sm font-extrabold uppercase tracking-wider text-emerald-300 mb-4">
              Explore
            </h5>
            <ul className="space-y-2.5 text-sm text-emerald-100/80">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Our Operations
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Produce Catalog (22+ Items)
                </a>
              </li>
              <li>
                <a href="#calendar" className="hover:text-white transition-colors text-[#FFA25C] font-semibold">
                  {lang === 'bn' ? 'মৌসুমভিত্তিক রফতানি ক্যালেন্ডার' : 'Harvest & Export Calendar'}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Farm to Port (6 Steps)
                </a>
              </li>
              <li>
                <a href="#documentation" className="hover:text-white transition-colors text-[#FFA25C] font-semibold">
                  {lang === 'bn' ? 'রফতানি ডকুমেন্টস ও সনদপত্র' : 'Export Documentation'}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Field & Packhouse Gallery
                </a>
              </li>
              <li>
                <a href="#why" className="hover:text-white transition-colors">
                  Why OrchaFresh
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Importer Reviews & Notes
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Executive Leadership
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Export FAQ
                </a>
              </li>
              <li>
                <a href="#visitor-counter" className="hover:text-white transition-colors text-emerald-300 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28BD64] animate-pulse"></span>
                  <span>{lang === 'bn' ? 'ভিজিটর কাউন্টার' : 'Visitor Counter'}</span>
                </a>
              </li>
              <li>
                <a href="#admin" className="hover:text-white transition-colors text-emerald-400 font-semibold">
                  {lang === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Portal (/admin)'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h5 className="text-sm font-extrabold uppercase tracking-wider text-[#FFA25C] mb-4">
              Direct Contact
            </h5>
            <ul className="space-y-3 text-sm text-emerald-100/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F27B20] shrink-0 mt-1" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#1FA855] shrink-0" />
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                  className="hover:text-white font-semibold transition-colors"
                >
                  WhatsApp: {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FFA25C] shrink-0" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>

            <div className="mt-6 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-xs text-emerald-200">
              <p className="font-bold text-white mb-0.5">Export Ports Hubs:</p>
              <p>• Air: Hazrat Shahjalal Int'l Airport (DAC)</p>
              <p>• Sea: Chattogram Seaport (CGP)</p>
            </div>
          </div>
        </div>

        {/* Live Website Unique Visitor Counter Section */}
        <div id="visitor-counter" className="py-10 border-b border-emerald-900/60">
          <VisitorCounter lang={lang} variant="footer" />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <div className="flex items-center gap-3">
            <p>© 2026 OrchaFresh Global Trade. All rights reserved.</p>
            <span className="text-emerald-700">•</span>
            <a href="#admin" className="text-[11px] text-emerald-400/90 hover:text-white underline font-semibold transition-colors">
              Admin Access
            </a>
          </div>
          <p>Fresh fruit and vegetable exporter from Bangladesh. Sourced with care, delivered with trust.</p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
