import React, { useState } from 'react';
import { X, Calendar, PackageCheck, Thermometer, ShieldAlert, Plus, Check } from 'lucide-react';
import { Product } from '../data/orchafreshData';
import { Language } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToInquiry: (product: Product, quantity: number, unit: 'kg' | 'metric_ton' | 'cartons') => void;
  lang: Language;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToInquiry,
  lang,
}) => {
  const [qty, setQty] = useState<number>(500);
  const [unit, setUnit] = useState<'kg' | 'metric_ton' | 'cartons'>('kg');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToInquiry(product, qty, unit);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header gradient banner */}
        <div
          className="h-28 relative flex items-end p-6"
          style={{
            background: `linear-gradient(135deg, ${product.c[0]}, ${product.c[1]})`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-white">
            <span className="inline-block text-[11px] font-black tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded-md mb-1">
              {product.t === 'fruit' ? 'Fruit Export' : 'Vegetable Export'}
            </span>
            <h3 className="text-2xl font-black">{product.n}</h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-slate-600 leading-relaxed">{product.d}</p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-[#0E6032] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-500 block">Seasonality</span>
                <span className="font-semibold text-slate-800">{product.s}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <Thermometer className="w-4 h-4 text-[#F27B20] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-500 block">Storage Temp</span>
                <span className="font-semibold text-slate-800">{product.temp || '+10°C to +13°C'}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <PackageCheck className="w-4 h-4 text-[#0E6032] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-500 block">Packing</span>
                <span className="font-semibold text-slate-800">{product.packing || 'Export cartons'}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-[#F27B20] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-500 block">Typical MOQ</span>
                <span className="font-semibold text-slate-800">{product.moq || '300 kg / Air'}</span>
              </div>
            </div>
          </div>

          {product.varieties && product.varieties.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-500 block mb-1.5">Varieties available:</span>
              <div className="flex flex-wrap gap-1.5">
                {product.varieties.map((v, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-900 border border-emerald-100"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Target Quantity Selector for Quotation */}
          <div className="p-4 rounded-2xl bg-[#F6FAF4] border border-[#D6E5D3] space-y-3">
            <label className="text-xs font-extrabold text-[#0B2A1A] block">
              Add to inquiry basket with target volume:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="10"
                step="50"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className="w-1/2 px-3 py-2 text-sm font-bold bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-1/2 px-3 py-2 text-sm font-bold bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
              >
                <option value="kg">Kilograms (KG)</option>
                <option value="metric_ton">Metric Tons (MT)</option>
                <option value="cartons">Cartons / Boxes</option>
              </select>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={handleAdd}
            disabled={added}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0E6032] hover:bg-[#17894A] text-white shadow-md'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Inquiry Basket!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add {product.n} to Inquiry Basket</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
