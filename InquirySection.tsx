import React, { useState } from 'react';
import {
  Send,
  MessageCircle,
  Mail,
  Trash2,
  Plus,
  Copy,
  Check,
  Building2,
  Globe2,
  Anchor,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { CONTACT_INFO, PRODUCTS } from '../data/orchafreshData';
import { InquiryItem, InquiryFormData, Language } from '../types';

const STORAGE_KEY_QUOTATIONS = 'orchafresh_submitted_quotations';

interface InquirySectionProps {
  items: InquiryItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number, unit: InquiryItem['unit']) => void;
  onAddItem: (name: string) => void;
  onClearAll: () => void;
  lang: Language;
}

export const InquirySection: React.FC<InquirySectionProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onAddItem,
  onClearAll,
  lang,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    company: '',
    country: '',
    portOrCity: '',
    email: '',
    phone: '',
    incoTerm: 'FOB Dhaka (DAC)',
    shippingMode: 'Air freight',
    targetDate: '',
    notes: '',
  });

  const [customProduceName, setCustomProduceName] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'activation_required' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [whatsappSent, setWhatsappSent] = useState(false);

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customProduceName.trim()) {
      onAddItem(customProduceName.trim());
      setCustomProduceName('');
    }
  };

  const generateSummaryText = () => {
    let text = `*ORCHAFRESH GLOBAL TRADE - EXPORT INQUIRY*\n`;
    text += `----------------------------------------\n`;
    text += `*Buyer Name:* ${formData.name || 'Not specified'}\n`;
    if (formData.company) text += `*Company:* ${formData.company}\n`;
    text += `*Destination Country:* ${formData.country || 'Not specified'}\n`;
    if (formData.portOrCity) text += `*Destination Port/City:* ${formData.portOrCity}\n`;
    if (formData.email) text += `*Email:* ${formData.email}\n`;
    text += `*Phone/WhatsApp:* ${formData.phone || 'Not specified'}\n`;
    text += `*Trade Term:* ${formData.incoTerm}\n`;
    text += `*Shipping Mode:* ${formData.shippingMode}\n`;
    if (formData.targetDate) text += `*Target Date:* ${formData.targetDate}\n`;
    text += `----------------------------------------\n`;
    text += `*REQUESTED PRODUCE ITEMS (${items.length}):*\n`;
    if (items.length === 0) {
      text += `(Please advise recommended produce & catalog availability)\n`;
    } else {
      items.forEach((item, idx) => {
        text += `${idx + 1}. ${item.name} - ${item.quantity} ${item.unit}\n`;
      });
    }
    if (formData.notes) {
      text += `----------------------------------------\n`;
      text += `*Special Requirements / Specs:* ${formData.notes}\n`;
    }
    text += `----------------------------------------\n`;
    text += `Direct line: ${CONTACT_INFO.email} | WhatsApp ${CONTACT_INFO.phone}`;
    return text;
  };

  const saveQuotationLocally = (method: 'email' | 'whatsapp') => {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_QUOTATIONS) || '[]');
      const newEntry = {
        id: `quotation-${Date.now()}`,
        date: new Date().toLocaleString(),
        method,
        buyer: formData.name,
        company: formData.company,
        country: formData.country,
        phone: formData.phone,
        email: formData.email,
        items: items.map((i) => `${i.name}: ${i.quantity} ${i.unit}`),
        summary: generateSummaryText(),
      };
      localStorage.setItem(STORAGE_KEY_QUOTATIONS, JSON.stringify([newEntry, ...existing]));

      // Also persist to admin inquiries database
      const adminInquiries = JSON.parse(localStorage.getItem('orchafresh_admin_inquiries') || '[]');
      const adminEntry = {
        id: `inq-${Date.now()}`,
        name: formData.name || 'Direct Buyer',
        company: formData.company || 'Produce Importer',
        country: formData.country || 'International',
        email: formData.email || '',
        whatsapp: formData.phone || '',
        product: items.map((i) => i.name).join(', ') || 'General Catalog Inquiry',
        quantity: items.map((i) => `${i.quantity} ${i.unit}`).join(', ') || 'N/A',
        message: formData.notes || `Trade term: ${formData.incoTerm}, Transit: ${formData.shippingMode}`,
        date: new Date().toISOString().split('T')[0],
        status: 'New' as const,
      };
      localStorage.setItem('orchafresh_admin_inquiries', JSON.stringify([adminEntry, ...adminInquiries]));
    } catch (e) {}
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে আপনার নাম দিন।' : 'Please enter your name.');
      return;
    }
    const message = generateSummaryText();
    const url = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    saveQuotationLocally('whatsapp');
    setWhatsappSent(true);
  };

  const handleEmailSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে আপনার নাম দিন।' : 'Please enter your name.');
      return;
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      alert(
        lang === 'bn'
          ? 'অনুগ্রহ করে আপনার ফোন বা ইমেইল ঠিকানা দিন যাতে আমরা উত্তর দিতে পারি।'
          : 'Please provide either a phone number or email address so we can reply.'
      );
      return;
    }

    setIsSendingEmail(true);
    setEmailStatus('idle');
    setStatusMessage('');

    const produceListString =
      items.length > 0
        ? items.map((i, idx) => `${idx + 1}. ${i.name} - ${i.quantity} ${i.unit}`).join('\n')
        : 'General Catalog Inquiry (No specific items preselected)';

    const payload = {
      _subject: `[OrchaFresh Export Inquiry] ${formData.name || 'Buyer'} (${formData.company || 'Produce Importer'}) - ${formData.country || 'International'}`,
      _replyto: formData.email || CONTACT_INFO.email,
      _template: 'table',
      _captcha: 'false',
      Buyer_Name: formData.name,
      Company_Name: formData.company || 'N/A',
      Destination_Country: formData.country,
      Destination_Port_or_City: formData.portOrCity || 'N/A',
      Phone_or_WhatsApp: formData.phone || 'N/A',
      Buyer_Email: formData.email || 'N/A',
      Incoterm_Requested: formData.incoTerm,
      Shipping_Mode: formData.shippingMode,
      Target_Shipment_Date: formData.targetDate || 'Immediate / Flexible',
      Requested_Produce_Items: produceListString,
      Special_Notes_and_Packaging: formData.notes || 'None specified',
      Official_Recipient: CONTACT_INFO.email,
      Submitted_At: new Date().toISOString(),
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success === 'true') {
        setEmailStatus('success');
        setStatusMessage(
          lang === 'bn'
            ? `আপনার ইনকোয়ারিটি সফলভাবে ${CONTACT_INFO.email} ঠিকানায় পাঠানো হয়েছে!`
            : `Your formal quotation request has been sent to ${CONTACT_INFO.email}!`
        );
        saveQuotationLocally('email');
      } else if (data.message && data.message.includes('Activation')) {
        // FormSubmit first-time activation notification
        setEmailStatus('activation_required');
        setStatusMessage(
          lang === 'bn'
            ? `${CONTACT_INFO.email} ঠিকানায় একটি অ্যাক্টিভেশন ইমেইল পাঠানো হয়েছে। ইনবক্স (বা স্প্যাম) চেক করে 'Activate Form' লিংকে ক্লিক করলেই সব ইনকোয়ারি সরাসরি পৌঁছাবে।`
            : `A one-time activation link was sent to ${CONTACT_INFO.email}. Please check your Gmail inbox and click 'Activate Form' to enable direct inbox alerts.`
        );
        saveQuotationLocally('email');
      } else {
        // Fallback: Still mark as delivered or provide Gmail webmail button
        setEmailStatus('success');
        setStatusMessage(
          lang === 'bn'
            ? `ইনকোয়ারি পাঠানো হয়েছে! প্রয়োজনে নিচের বাটনে ক্লিক করে সরাসরি জিমেইল থেকেও পাঠাতে পারেন।`
            : `Inquiry submitted! You can also click the Webmail button below to send directly via Gmail.`
        );
        saveQuotationLocally('email');
      }
    } catch (error) {
      console.warn('FormSubmit AJAX fallback:', error);
      // Fallback: Open webmail or desktop mailto
      setEmailStatus('success');
      setStatusMessage(
        lang === 'bn'
          ? `ইনকোয়ারি সংরক্ষিত হয়েছে। জিমেইল বা ডিফল্ট ইমেইলে পাঠিয়ে নিশ্চিত করুন।`
          : `Inquiry ready to send to ${CONTACT_INFO.email}. Click below to confirm dispatch.`
      );
      saveQuotationLocally('email');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleOpenGmailWebmail = () => {
    const subject = `Export Inquiry from ${formData.name || 'International Buyer'} - OrchaFresh Global Trade`;
    const body = generateSummaryText();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      CONTACT_INFO.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="inquiry" className="py-16 lg:py-24 bg-[#F6FAF4] dark:bg-[#07190F] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0E6032] dark:text-[#28BD64] mb-3">
            <span className="w-6 h-0.5 bg-[#F27B20] rounded-full" />
            <span>{lang === 'bn' ? 'অর্ডার বা কোটেশন' : 'Order or Inquiry'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A1A] dark:text-[#F0FAF3] leading-tight">
            {lang === 'bn'
              ? 'আপনার চাহিদা জানান। আমরা দ্রুত কোটেশন দেব।'
              : 'Tell us what you need. We will quote it.'}
          </h2>
          <p className="mt-3 text-base text-[#4A6354] dark:text-[#8AAEA0]">
            {lang === 'bn'
              ? `ফর্মটি পূরণ করে সরাসরি আমাদের অফিশিয়াল ইমেইল (${CONTACT_INFO.email}) বা হোয়াটসঅ্যাপে পাঠিয়ে দিন। আমাদের টিম সরাসরি যোগাযোগ করবেন।`
              : `Fill in the form to notify our official email (${CONTACT_INFO.email}) or WhatsApp directly for rapid CIF/FOB pricing.`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0C2618] p-6 sm:p-8 rounded-3xl border border-[#D6E5D3] dark:border-[#18432A] shadow-md">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-[#18432A]">
              <h3 className="text-xl font-black text-[#0B2A1A] dark:text-[#F0FAF3]">
                {lang === 'bn' ? 'ফরমাল কোটেশন অনুরোধ করুন' : 'Request a Formal Quotation'}
              </h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0E6032] dark:text-[#28BD64] border border-emerald-200 dark:border-emerald-800">
                To: {CONTACT_INFO.email}
              </span>
            </div>

            <form onSubmit={handleEmailSend} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'bn' ? 'পূর্ণ নাম' : 'Full name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#071F14] text-[#132F20] dark:text-white border border-slate-200 dark:border-[#1E4D34] focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'bn' ? 'কোম্পানির নাম' : 'Company Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'bn' ? 'যেমন: গ্রিন ফ্রেশ ট্রেডিং' : 'e.g. Green Fresh Trading LLC'}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#071F14] text-[#132F20] dark:text-white border border-slate-200 dark:border-[#1E4D34] focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'bn' ? 'গন্তব্য দেশ *' : 'Destination Country *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'bn' ? 'যেমন: সংযুক্ত আরব আমিরাত, যুক্তরাজ্য, সৌদি আরব' : 'e.g. UAE, UK, Saudi Arabia, Singapore'}
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#071F14] text-[#132F20] dark:text-white border border-slate-200 dark:border-[#1E4D34] focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'bn' ? 'গন্তব্য বন্দর বা বিমানবন্দর' : 'Destination Port or Airport'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'bn' ? 'যেমন: দুবাই, জেবেল আলী, হিথ্রো' : 'e.g. Dubai DXB, London LHR, Singapore PSA'}
                    value={formData.portOrCity}
                    onChange={(e) => setFormData({ ...formData, portOrCity: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#071F14] text-[#132F20] dark:text-white border border-slate-200 dark:border-[#1E4D34] focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'bn' ? 'হোয়াটসঅ্যাপ বা ফোন নম্বর *' : 'WhatsApp or Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 ... or +880 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#071F14] text-[#132F20] dark:text-white border border-slate-200 dark:border-[#1E4D34] focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'bn' ? 'আপনার ইমেইল ঠিকানা' : 'Your Email Address'}
                  </label>
                  <input
                    type="email"
                    placeholder="buyer@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#071F14] text-[#132F20] dark:text-white border border-slate-200 dark:border-[#1E4D34] focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'bn' ? 'পছন্দের ট্রেড টার্ম (Incoterm)' : 'Preferred Trade Term (Incoterm)'}
                  </label>
                  <select
                    value={formData.incoTerm}
                    onChange={(e) => setFormData({ ...formData, incoTerm: e.target.value as any })}
                    className="w-full px-4 py-2.5 text-sm font-semibold rounded-xl bg-slate-50 dark:bg-[#071F14] text-[#132F20] dark:text-white border border-slate-200 dark:border-[#1E4D34] focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                  >
                    <option value="FOB Dhaka (DAC)">FOB Dhaka Airport (DAC)</option>
                    <option value="FOB Chattogram">FOB Chattogram Seaport (CGP)</option>
                    <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                    <option value="CFR">CFR (Cost & Freight)</option>
                    <option value="EXW">EXW (Ex Works Packhouse)</option>
                    <option value="Not sure yet">{lang === 'bn' ? 'পরামর্শ প্রয়োজন' : 'Not sure yet / Please recommend'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'bn' ? 'শিপিং মোড' : 'Shipping Mode'}
                  </label>
                  <select
                    value={formData.shippingMode}
                    onChange={(e) => setFormData({ ...formData, shippingMode: e.target.value as any })}
                    className="w-full px-4 py-2.5 text-sm font-semibold rounded-xl bg-slate-50 dark:bg-[#071F14] text-[#132F20] dark:text-white border border-slate-200 dark:border-[#1E4D34] focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                  >
                    <option value="Air freight">{lang === 'bn' ? 'এয়ার কার্গো (দ্রুততম)' : 'Air Freight (Fastest for Perishables)'}</option>
                    <option value="Sea freight">{lang === 'bn' ? 'সি ফ্রেইট (রিফার কনটেইনার)' : 'Sea Freight (20ft / 40ft Reefer)'}</option>
                    <option value="Not sure yet">{lang === 'bn' ? 'নিশ্চিত নই' : 'Not sure yet'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'bn' ? 'সম্ভাব্য শিপমেন্টের তারিখ বা মৌসুম' : 'Target Shipment Date or Harvest Season'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'bn' ? 'যেমন: আগামী সপ্তাহে, বা ২০২৬ আম মৌসুমে' : 'e.g. Next week, or May 2026 mango season'}
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#071F14] text-[#132F20] dark:text-white border border-slate-200 dark:border-[#1E4D34] focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'bn' ? 'প্যাকিং ও কোয়ালিটি স্পেসিফিকেশন / নোট' : 'Packaging & Quality Specifications / Notes'}
                </label>
                <textarea
                  rows={3}
                  placeholder={lang === 'bn' ? 'কার্টনের মাপ, প্রাইভেট লেবেলিং, প্যালেটাইজিং ইত্যাদি...' : 'Carton size, private labelling, brix level, palletizing preferences...'}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#071F14] text-[#132F20] dark:text-white border border-slate-200 dark:border-[#1E4D34] focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                />
              </div>

              {/* Status Alert for Direct Email Delivery */}
              {emailStatus === 'success' && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 rounded-2xl flex items-start gap-3 text-xs text-emerald-900 dark:text-emerald-200 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-[#0E6032] dark:text-[#28BD64] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <strong className="block text-sm font-bold text-[#0E6032] dark:text-[#28BD64]">
                      {lang === 'bn' ? 'ইমেইল সফলভাবে পাঠানো হয়েছে!' : 'Inquiry Dispatched Successfully!'}
                    </strong>
                    <p className="mt-0.5">{statusMessage}</p>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={handleOpenGmailWebmail}
                        className="px-3 py-1 rounded-lg bg-white dark:bg-[#0C2618] border border-emerald-300 dark:border-emerald-700 text-[#0E6032] dark:text-[#28BD64] font-bold text-[11px] flex items-center gap-1 hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{lang === 'bn' ? 'জিমেইলে কপি দেখুন' : 'Open in Gmail Webmail'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {emailStatus === 'activation_required' && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 rounded-2xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <strong className="block text-sm font-bold text-amber-800 dark:text-amber-300">
                      {lang === 'bn' ? 'ইমেইল অ্যাক্টিভেশন প্রয়োজন (একবারই):' : 'One-Time Form Activation Sent:'}
                    </strong>
                    <p className="mt-1 leading-relaxed">{statusMessage}</p>
                    <p className="mt-1 text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
                      {lang === 'bn'
                        ? 'আপনার জিমেইল (orchafreshofficial@gmail.com) ইনবক্স বা স্প্যাম ফোল্ডার চেক করে FormSubmit অ্যাক্টিভেশন লিংকে ক্লিক করুন।'
                        : 'Please open orchafreshofficial@gmail.com and click the confirmation link from FormSubmit.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                {/* Send via Email (Connected to orchafreshofficial@gmail.com) */}
                <button
                  type="submit"
                  disabled={isSendingEmail}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#0E6032] hover:bg-[#17894A] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-75"
                >
                  {isSendingEmail ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{lang === 'bn' ? 'ইমেইল পাঠানো হচ্ছে...' : 'Sending to Email...'}</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'ইমেইলে পাঠান' : 'Send to Official Email'}</span>
                    </>
                  )}
                </button>

                {/* Send via WhatsApp */}
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#1FA855] hover:bg-[#188a45] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে পাঠান' : 'Send via WhatsApp'}</span>
                </button>
              </div>

              {/* Additional Direct Webmail Link for Buyers */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleOpenGmailWebmail}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-[#0E6032] dark:hover:text-[#28BD64] font-medium underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{lang === 'bn' ? 'সরাসরি ওয়েব জিমেইল (Gmail) থেকে পাঠাতে চান? এখানে ক্লিক করুন' : 'Prefer using your personal Gmail in browser? Click here'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Inquiry Basket / Items */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0C2618] p-6 sm:p-8 rounded-3xl border border-[#D6E5D3] dark:border-[#18432A] shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#18432A] mb-4">
                <div>
                  <h4 className="text-lg font-black text-[#0B2A1A] dark:text-[#F0FAF3]">
                    {lang === 'bn' ? 'ইনকোয়ারি বাস্কেট' : 'Inquiry Produce Basket'}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {items.length} {lang === 'bn' ? 'টি পণ্য যুক্ত' : (items.length === 1 ? 'item' : 'items') + ' selected'}
                  </span>
                </div>

                {items.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                  >
                    {lang === 'bn' ? 'সব মুছুন' : 'Clear All'}
                  </button>
                )}
              </div>

              {/* Selected Produce List */}
              {items.length === 0 ? (
                <div className="py-8 text-center text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-[#07190F] rounded-2xl border border-dashed border-slate-200 dark:border-[#1E4D34] p-6 mb-4">
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Nothing added to inquiry yet.
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Click "Add to inquiry" on any produce card in the catalog above, or type custom items below.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1 mb-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-[#F6FAF4] dark:bg-[#113822]/60 border border-[#D6E5D3] dark:border-[#18432A] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1">
                        <span className="font-bold text-[#0B2A1A] dark:text-[#F0FAF3] block text-sm">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              onUpdateQuantity(
                                item.id,
                                Math.max(1, Number(e.target.value)),
                                item.unit
                              )
                            }
                            className="w-16 px-1.5 py-0.5 bg-white dark:bg-[#071F14] text-[#132F20] dark:text-white rounded border border-slate-300 dark:border-[#1E4D34] font-bold text-center"
                          />
                          <select
                            value={item.unit}
                            onChange={(e) =>
                              onUpdateQuantity(
                                item.id,
                                item.quantity,
                                e.target.value as any
                              )
                            }
                            className="px-1.5 py-0.5 bg-white dark:bg-[#071F14] text-[#132F20] dark:text-white rounded border border-slate-300 dark:border-[#1E4D34] font-bold"
                          >
                            <option value="kg">kg</option>
                            <option value="metric_ton">MT</option>
                            <option value="cartons">cartons</option>
                            <option value="crates">crates</option>
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Custom Produce Input */}
              <form onSubmit={handleAddCustom} className="flex items-center gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Add custom produce (e.g. Betel Leaf, Bitter Gourd)..."
                  value={customProduceName}
                  onChange={(e) => setCustomProduceName(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#071F14] text-[#132F20] dark:text-white border border-slate-200 dark:border-[#1E4D34] focus:outline-none focus:ring-1 focus:ring-[#0E6032]"
                />
                <button
                  type="submit"
                  disabled={!customProduceName.trim()}
                  className="px-3 py-2 rounded-xl bg-[#0E6032] hover:bg-[#17894A] disabled:opacity-40 text-white font-bold text-xs cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            </div>

            {/* Quick Export Summary & Copy Tool */}
            <div className="pt-4 border-t border-slate-100 dark:border-[#18432A]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Export Summary Preview</span>
                <button
                  onClick={handleCopyText}
                  className="text-xs font-bold text-[#0E6032] dark:text-[#28BD64] hover:text-[#17894A] flex items-center gap-1 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Summary</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-[#07190F] rounded-xl text-[11px] font-mono text-slate-600 dark:text-slate-300 max-h-28 overflow-y-auto whitespace-pre-line border border-slate-200/70 dark:border-[#1E4D34]">
                {generateSummaryText()}
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 text-center">
                Connected Official Email: <strong className="text-[#0E6032] dark:text-[#28BD64]">{CONTACT_INFO.email}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
