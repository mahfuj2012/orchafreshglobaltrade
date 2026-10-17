import React from 'react';
import { CheckCircle2, ShoppingBag, X, ArrowRight, Info } from 'lucide-react';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info';
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white rounded-2xl shadow-xl border border-emerald-950/10 p-4 transition-all duration-300 animate-slide-in flex items-start gap-3 relative overflow-hidden"
          style={{
            boxShadow: '0 12px 32px -8px rgba(14, 96, 50, 0.22), 0 4px 12px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Subtle brand left accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#0E6032] via-[#17894A] to-[#F27B20]" />

          {/* Icon */}
          <div className="w-9 h-9 rounded-xl bg-[#E4F2E1] text-[#0E6032] flex items-center justify-center shrink-0 mt-0.5">
            {toast.type === 'info' ? (
              <Info className="w-5 h-5 text-[#0E6032]" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#0E6032]" />
            )}
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0 pr-4">
            <h4 className="text-sm font-extrabold text-[#0B2A1A] leading-tight">
              {toast.title}
            </h4>
            <p className="text-xs text-[#4A6354] mt-0.5 leading-snug">
              {toast.message}
            </p>

            {toast.actionLabel && toast.onAction && (
              <button
                onClick={() => {
                  toast.onAction?.();
                  onDismiss(toast.id);
                }}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0E6032] hover:text-[#17894A] bg-[#F6FAF4] hover:bg-[#E4F2E1] px-2.5 py-1 rounded-lg border border-[#D6E5D3] transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{toast.actionLabel}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
