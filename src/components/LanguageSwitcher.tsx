import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
  variant?: 'compact' | 'full';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange,
  className = '',
  variant = 'compact',
}) => {
  return (
    <div
      role="radiogroup"
      aria-label="Language selection"
      className={`inline-flex items-center p-1 rounded-full bg-[#E4F2E1]/70 border border-[#D6E5D3] shadow-2xs ${className}`}
    >
      <div className="flex items-center px-1.5 text-[#0E6032]">
        <Globe className="w-3.5 h-3.5" />
      </div>

      {/* English Option */}
      <button
        type="button"
        role="radio"
        aria-checked={currentLang === 'en'}
        onClick={() => onLanguageChange('en')}
        className={`relative px-2.5 py-1 text-xs font-black rounded-full transition-all duration-200 cursor-pointer ${
          currentLang === 'en'
            ? 'bg-[#0E6032] text-white shadow-xs'
            : 'text-[#132F20] hover:text-[#0E6032] hover:bg-white/60'
        }`}
      >
        <span>{variant === 'full' ? 'English' : 'EN'}</span>
      </button>

      {/* Bengali Option */}
      <button
        type="button"
        role="radio"
        aria-checked={currentLang === 'bn'}
        onClick={() => onLanguageChange('bn')}
        className={`relative px-2.5 py-1 text-xs font-black rounded-full transition-all duration-200 cursor-pointer ${
          currentLang === 'bn'
            ? 'bg-[#0E6032] text-white shadow-xs'
            : 'text-[#132F20] hover:text-[#0E6032] hover:bg-white/60'
        }`}
      >
        <span>{variant === 'full' ? 'বাংলা' : 'বাংলা'}</span>
      </button>
    </div>
  );
};
