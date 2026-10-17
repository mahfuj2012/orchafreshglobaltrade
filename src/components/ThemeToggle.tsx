import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggleTheme,
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
        isDark
          ? 'bg-[#0E291B] border-[#18432A] text-amber-400 hover:bg-[#143B27] hover:border-amber-400/40 shadow-xs'
          : 'bg-white border-[#D6E5D3] text-[#0E6032] hover:bg-emerald-50 hover:border-[#0E6032] shadow-2xs'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
};
