import React from 'react';
import { MessageCircle, Phone, ShieldCheck, Award, Briefcase, UserCheck } from 'lucide-react';
import { TEAM, CONTACT_INFO } from '../data/orchafreshData';
import { Language } from '../types';

interface TeamProps {
  lang: Language;
}

export const Team: React.FC<TeamProps> = ({ lang }) => {
  return (
    <section id="team" className="py-16 lg:py-24 bg-[#F6FAF4] dark:bg-[#07190F] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E6032] dark:text-[#28BD64] mb-3">
            <span className="w-6 h-0.5 bg-[#F27B20] rounded-full" />
            <span>{lang === 'bn' ? 'নেতৃত্ব ও ব্যবস্থাপনা' : 'Leadership & Executive Management'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A1A] dark:text-[#F0FAF3] leading-tight">
            {lang === 'bn'
              ? 'আপনার সফল রফতানি চালানের দায়িত্বপ্রাপ্ত ব্যক্তিবর্গ।'
              : 'The leadership team behind your shipment.'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A6354] dark:text-[#8AAEA0]">
            {lang === 'bn'
              ? 'খামার উৎপাদন, কোয়ালিটি গ্রেডিং এবং আন্তর্জাতিক রফতানি কার্যক্রমে সার্বক্ষণিক তদারকিতে আছেন আমাদের নেতৃবৃন্দ।'
              : 'Direct oversight and accountability from our executive leadership, ensuring high standards across farm production, sorting, and worldwide delivery.'}
          </p>
        </div>

        {/* Team Cards Grid - Clean White Board Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, idx) => {
            const isFounder = idx === 0;

            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0C2618] rounded-3xl overflow-hidden border border-[#D6E5D3] dark:border-[#18432A] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Clean Photo Container - 100% unobstructed, no dark overlays */}
                <div className="relative aspect-[4/4.3] overflow-hidden bg-slate-50 dark:bg-[#113822] border-b border-slate-100 dark:border-[#18432A]">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                  />
                  {/* Subtle top badge for verified leadership */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-[#0C2618]/95 backdrop-blur-md text-[11px] font-black text-[#0E6032] dark:text-[#28BD64] shadow-sm border border-emerald-950/10 dark:border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0E6032] dark:text-[#28BD64]" />
                      <span>{isFounder ? 'Core Leadership' : 'Executive Board'}</span>
                    </span>
                  </div>
                </div>

                {/* Clean White Board Content Area */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-white dark:bg-[#0C2618]">
                  <div>
                    {/* Role / Designation Badge */}
                    <div className="mb-2.5">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                          isFounder
                            ? 'bg-[#E4F2E1] dark:bg-[#113822] text-[#0E6032] dark:text-[#28BD64] border border-[#D6E5D3] dark:border-[#1E4D34]'
                            : 'bg-orange-50 dark:bg-orange-950/40 text-[#B94F08] dark:text-[#FFA25C] border border-orange-200 dark:border-orange-800'
                        }`}
                      >
                        {member.title}
                      </span>
                    </div>

                    {/* Prominent High-Contrast Name */}
                    <h3 className="text-2xl font-black text-[#0B2A1A] dark:text-[#F0FAF3] tracking-tight mb-2 group-hover:text-[#0E6032] dark:group-hover:text-[#28BD64] transition-colors">
                      {member.name}
                    </h3>

                    {/* Bio & Responsibilities */}
                    <p className="text-sm text-[#4A6354] dark:text-[#A7C4B2] leading-relaxed mt-2.5">
                      {member.bio}
                    </p>
                  </div>

                  {/* Bottom Action / Direct Contact Line */}
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-[#18432A] flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-[#0E6032] dark:text-[#28BD64]" />
                      <span>{isFounder ? 'OrchaFresh Founder' : 'Executive Director'}</span>
                    </span>

                    {isFounder ? (
                      <a
                        href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                          'Hello Mahfuj Ahmed! I am inquiring about fresh produce export from OrchaFresh.'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1FA855] hover:bg-[#188a45] text-white font-bold text-xs shadow-xs transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Direct Chat</span>
                      </a>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                        Dhaka Operations Desk
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
