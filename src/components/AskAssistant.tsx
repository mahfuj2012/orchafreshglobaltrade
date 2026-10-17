import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Trash2, Loader2, HelpCircle } from 'lucide-react';
import { CONTACT_INFO, PRODUCTS } from '../data/orchafreshData';
import { Language } from '../types';

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

interface AskAssistantProps {
  lang: Language;
}

export const AskAssistant: React.FC<AskAssistantProps> = ({ lang }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hello! I am the OrchaFresh Export Assistant. Ask me anything about our farm harvesting, seasonal fruit & vegetable calendar, cold-chain packing, or export logistics from Bangladesh."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const suggestions = [
    'How do you grade potatoes?',
    'How are mangoes harvested?',
    'How is produce packed for export?',
    'What ports do you ship from?',
    'What is the minimum order quantity?',
  ];

  const answerLocally = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('potato') && (q.includes('grade') || q.includes('grading') || q.includes('size'))) {
      return 'In our cleaning and grading division, potatoes (Diamond, Granola, Cardinal) are machine-cleaned to remove field dirt and graded by caliber (e.g. 40mm+, 55mm+). They are then hand-inspected by trained staff for skin defects before packing into 10kg, 25kg, or 50kg breathable mesh bags.';
    }

    if (q.includes('mango') && (q.includes('harvest') || q.includes('pick') || q.includes('season'))) {
      return 'Our mangoes (varieties like Amrapali, Himsagar, Fazli, Haribhanga) are grown in our own orchards and harvested between May and August. Harvesters hand-pick mature green mangoes in the early morning beneath the trees into woven baskets to avoid ground impact and heat stress, ensuring fruit ripens uniformly at destination.';
    }

    if (q.includes('pack') || q.includes('carton') || q.includes('box')) {
      return 'We pack produce in heavy-duty ventilated export cartons (3kg, 5kg, 10kg, 18kg), corrugated boxes, or breathable mesh sacks according to buyer specs and destination climate. Sensitive fruits like guavas and papayas receive individual protective foam nets.';
    }

    if (q.includes('port') || q.includes('ship') || q.includes('freight') || q.includes('dhaka') || q.includes('chattogram')) {
      return 'We export via air freight from Hazrat Shahjalal International Airport (DAC) in Dhaka for urgent fresh produce (12-36 hours transit to Middle East, UK, and Europe). For volume bulk orders, we ship in 20ft and 40ft refrigerated (reefer) sea containers from Chattogram Port (CGP).';
    }

    if (q.includes('moq') || q.includes('minimum')) {
      return 'For air cargo from Dhaka (DAC), the typical MOQ is 300 kg to 500 kg (which can be a consolidated assortment of fresh vegetables and fruits). For sea freight from Chattogram, the minimum is 1 twenty-foot (20ft) or forty-foot (40ft) reefer container (approx. 12 to 24 metric tons).';
    }

    if (q.includes('tomato')) {
      return 'Tomatoes are grown directly on our own drip-irrigated farm and harvested at the breaker/turning stage from December to March. Picking directly into crates avoids bruising, allowing 14+ days of shelf-life under 12°C cold-chain.';
    }

    if (q.includes('phytosanitary') || q.includes('certificate') || q.includes('document')) {
      return 'Every consignment includes an official Phytosanitary Certificate issued by the Plant Quarantine Wing of the Department of Agricultural Extension (DAE) Bangladesh, along with Certificate of Origin, Form C, Commercial Invoice, Packing List, and Bill of Lading.';
    }

    if (q.includes('founder') || q.includes('mahfuj') || q.includes('owner') || q.includes('contact')) {
      return `OrchaFresh Global Trade is founded by Mahfuj Ahmed. You can contact our direct export desk via WhatsApp at ${CONTACT_INFO.phone} or email us at ${CONTACT_INFO.email}.`;
    }

    return `OrchaFresh Global Trade exports farm-fresh fruits (mango, banana, pineapple, guava, litchi, papaya) and vegetables (tomatoes, chillies, eggplants, gourds, okra, potatoes) from Bangladesh. For this specific inquiry or a custom FOB/CIF quotation, please chat with founder Mahfuj Ahmed on WhatsApp at ${CONTACT_INFO.phone} or submit an inquiry below!`;
  };

  const handleAsk = async (textToAsk: string) => {
    if (!textToAsk.trim() || loading) return;

    const userText = textToAsk.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      // Check if we can fetch from server or answer locally
      const localAnswer = answerLocally(userText);
      // simulate realistic conversational delay
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', text: localAnswer }]);
        setLoading(false);
      }, 500);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Thank you for your question. Please contact our export team directly at ${CONTACT_INFO.email} or WhatsApp ${CONTACT_INFO.phone}.`
        }
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-[#D6E5D3] shadow-md max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E4F2E1] text-[#0E6032] flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0B2A1A]">
              Ask About Our Produce & Export
            </h3>
            <p className="text-xs text-[#4A6354]">
              Instant answers on farm harvesting, grading standards, and shipment procedures.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                role: 'assistant',
                text: "Conversation reset. Feel free to ask any question about OrchaFresh export operations!"
              }
            ])
          }
          className="text-xs font-semibold text-slate-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors"
          title="Reset chat"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Suggested prompts */}
      <div className="mb-4">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Frequently asked questions:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleAsk(sug)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#F6FAF4] hover:bg-[#E4F2E1] text-[#0E6032] border border-[#D6E5D3] transition-colors cursor-pointer text-left"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Message Log */}
      <div
        ref={logRef}
        className="h-64 sm:h-72 overflow-y-auto space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 mb-4"
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-[#0E6032] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`max-w-[82%] text-xs sm:text-sm p-3.5 rounded-2xl leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[#0E6032] text-white rounded-tr-xs'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-2xs'
              }`}
            >
              {m.text}
            </div>
            {m.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-[#F27B20] text-white flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#0E6032]" />
            <span>Consulting OrchaFresh field guidelines...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(input);
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about produce, packing, or shipping..."
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0E6032] text-slate-800"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-4 py-2.5 rounded-xl bg-[#0E6032] hover:bg-[#17894A] disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
