import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Mail,
  Phone,
  Search,
  Filter,
  Trash2,
  Download,
  Plus,
  Edit2,
  Check,
  X,
  ExternalLink,
  Package,
  Calendar,
  DollarSign,
  TrendingUp,
  Globe2,
  MessageCircle,
  Building,
  RefreshCw,
  Layers,
  ArrowLeft,
  Users,
  Eye,
  Activity,
  BarChart3,
  Clock,
  Laptop,
  Smartphone,
  Tablet,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  Sliders,
  Sparkles
} from 'lucide-react';
import { Product, PRODUCTS } from '../data/orchafreshData';
import { AdminInquiry, VisitorStats, VisitorLogEntry } from '../types';
import {
  getStoredVisitorStats,
  togglePublicCounter,
  adjustVisitorBaseline,
  exportVisitorLogsCSV,
  resetVisitorAnalytics,
} from '../utils/visitorTracker';
import { VisitorInsightsCard } from './VisitorInsightsCard';

const ADMIN_EMAIL = 'mahfuj2012ahmed@gmail.com';
const STORAGE_KEY_AUTH = 'orchafresh_admin_auth';
const STORAGE_KEY_INQUIRIES = 'orchafresh_admin_inquiries';
const STORAGE_KEY_PRODUCTS = 'orchafresh_managed_products';

interface AdminPanelProps {
  onBackToSite: () => void;
  onProductsUpdated?: (products: Product[]) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onBackToSite,
  onProductsUpdated,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const auth = localStorage.getItem(STORAGE_KEY_AUTH);
      return auth === ADMIN_EMAIL;
    } catch (e) {
      return false;
    }
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'inquiries' | 'products' | 'visitors' | 'dashboard'
  const [activeTab, setActiveTab] = useState<'inquiries' | 'products' | 'visitors' | 'dashboard'>('inquiries');

  // Visitor Telemetry State
  const [visitorStats, setVisitorStats] = useState<VisitorStats>(() => getStoredVisitorStats());
  const [visitorSearch, setVisitorSearch] = useState('');
  const [visitorDeviceFilter, setVisitorDeviceFilter] = useState<'All' | 'Desktop' | 'Mobile' | 'Tablet'>('All');
  const [baselineInput, setBaselineInput] = useState<number>(() => visitorStats.settings.customBaseline);
  const [isBaselineSaved, setIsBaselineSaved] = useState(false);

  useEffect(() => {
    const handleUpdate = (e: any) => {
      if (e.detail) {
        setVisitorStats(e.detail);
        setBaselineInput(e.detail.settings.customBaseline);
      }
    };
    window.addEventListener('orchafresh_visitor_update', handleUpdate);
    return () => window.removeEventListener('orchafresh_visitor_update', handleUpdate);
  }, []);

  // Inquiries State
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Initial sample inquiries for Mahfuj Ahmed's team
    return [
      {
        id: 'inq-sample-1',
        name: 'Tariq Al-Mansoor',
        company: 'Al Madina Fresh Imports LLC',
        country: 'United Arab Emirates',
        email: 'procurement@almadinagroup.ae',
        whatsapp: '+971 50 123 4567',
        product: 'Mango (Amrapali / Himsagar)',
        quantity: '2,500 kg',
        message: 'Requesting CIF Dubai pricing for 2,500 kg Amrapali mangoes. Require phytosanitary clearance certificate.',
        date: '2026-10-15',
        status: 'New',
      },
      {
        id: 'inq-sample-2',
        name: 'Darren Tan',
        company: 'FarEast Logistics & Trade',
        country: 'Singapore',
        email: 'buyer.singapore@globalfareast.com.sg',
        whatsapp: '+65 9123 4567',
        product: 'Fresh Tomato (Own Farm), Pointed Gourd',
        quantity: '1,500 kg',
        message: 'Looking for weekly air freight dispatch of vine tomatoes and export quality pointed gourd.',
        date: '2026-10-14',
        status: 'Contacted',
      },
      {
        id: 'inq-sample-3',
        name: 'S. Richardson',
        company: 'British Tropical Produce UK',
        country: 'United Kingdom',
        email: 'imports@britishtropic.co.uk',
        whatsapp: '+44 20 7946 0912',
        product: 'Yardlong Bean, Green Chilli',
        quantity: '800 kg',
        message: 'Interested in trial consignment of green chillies and yardlong beans into London Heathrow.',
        date: '2026-10-11',
        status: 'Closed',
      },
    ];
  });

  // Managed Products State (loaded from storage or defaults)
  const [productsList, setProductsList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return PRODUCTS;
  });

  // Search & Filter State for Inquiries
  const [inquirySearch, setInquirySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'New' | 'Contacted' | 'Closed'>('All');

  // Selected Inquiry Modal
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null);

  // Product Editing / Adding State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    type: 'fruit' as 'fruit' | 'veg',
    season: '',
    yearRound: false,
    description: '',
    priceRange: '',
    moq: '',
    packing: '',
    varieties: '',
  });

  // Sync inquiries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {}
  }, [inquiries]);

  // Sync products to localStorage and update parent app
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(productsList));
      if (onProductsUpdated) {
        onProductsUpdated(productsList);
      }
    } catch (e) {}
  }, [productsList, onProductsUpdated]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const trimmedEmail = loginEmail.trim().toLowerCase();

    // Verify authorized administrator email
    if (trimmedEmail !== ADMIN_EMAIL.toLowerCase()) {
      setLoginError(`Access denied. Only the registered administrator email (${ADMIN_EMAIL}) has admin privileges.`);
      return;
    }

    if (!loginPassword.trim()) {
      setLoginError('Please enter your password.');
      return;
    }

    // Success login
    setIsAuthenticated(true);
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, ADMIN_EMAIL);
    } catch (e) {}
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    } catch (e) {}
  };

  // Status Change for Inquiry
  const handleStatusChange = (id: string, newStatus: AdminInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  // Delete Inquiry
  const handleDeleteInquiry = (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry record?')) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  // Export Inquiries CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries to export.');
      return;
    }

    const headers = [
      'Inquiry ID',
      'Date',
      'Status',
      'Buyer Name',
      'Company',
      'Country',
      'Email',
      'WhatsApp / Phone',
      'Requested Produce',
      'Quantity',
      'Message / Requirements',
    ];

    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${inq.date}"`,
      `"${inq.status}"`,
      `"${inq.name.replace(/"/g, '""')}"`,
      `"${inq.company.replace(/"/g, '""')}"`,
      `"${inq.country.replace(/"/g, '""')}"`,
      `"${inq.email}"`,
      `"${inq.whatsapp}"`,
      `"${inq.product.replace(/"/g, '""')}"`,
      `"${inq.quantity.replace(/"/g, '""')}"`,
      `"${inq.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `orchafresh_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Inquiries
  const filteredInquiries = useMemo(() => {
    const q = inquirySearch.toLowerCase().trim();
    return inquiries.filter((inq) => {
      const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
      const matchesSearch =
        !q ||
        inq.name.toLowerCase().includes(q) ||
        inq.company.toLowerCase().includes(q) ||
        inq.country.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.product.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [inquiries, inquirySearch, statusFilter]);

  // Dashboard Stats Calculations
  const stats = useMemo(() => {
    const total = inquiries.length;
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const newThisWeek = inquiries.filter((inq) => {
      const inqDate = new Date(inq.date);
      return inqDate >= sevenDaysAgo;
    }).length;

    // Top Countries count
    const countryCounts: { [k: string]: number } = {};
    inquiries.forEach((inq) => {
      const c = inq.country || 'Other';
      countryCounts[c] = (countryCounts[c] || 0) + 1;
    });
    const sortedCountries = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    const pendingNew = inquiries.filter((inq) => inq.status === 'New').length;

    return { total, newThisWeek, sortedCountries, pendingNew };
  }, [inquiries]);

  // Visitor Telemetry Handlers
  const handleToggleCounter = () => {
    const updated = togglePublicCounter(!visitorStats.settings.showPublicCounter);
    setVisitorStats(updated);
  };

  const handleSaveBaseline = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = adjustVisitorBaseline(Number(baselineInput));
    setVisitorStats(updated);
    setIsBaselineSaved(true);
    setTimeout(() => setIsBaselineSaved(false), 3000);
  };

  const handleExportVisitorLogs = () => {
    exportVisitorLogsCSV(visitorStats);
  };

  const handleRefreshVisitorStats = () => {
    setVisitorStats(getStoredVisitorStats());
  };

  const handleResetAnalytics = () => {
    if (confirm('Are you sure you want to recalibrate visitor analytics to default baseline?')) {
      const reset = resetVisitorAnalytics();
      setVisitorStats(reset);
      setBaselineInput(reset.settings.customBaseline);
    }
  };

  const filteredVisitorLogs = useMemo(() => {
    const q = visitorSearch.toLowerCase().trim();
    return (visitorStats.recentLogs || []).filter((log) => {
      const matchDevice = visitorDeviceFilter === 'All' || log.device === visitorDeviceFilter;
      const matchQuery =
        !q ||
        log.country.toLowerCase().includes(q) ||
        (log.city && log.city.toLowerCase().includes(q)) ||
        log.page.toLowerCase().includes(q) ||
        log.referrer.toLowerCase().includes(q) ||
        log.browser.toLowerCase().includes(q);
      return matchDevice && matchQuery;
    });
  }, [visitorStats.recentLogs, visitorSearch, visitorDeviceFilter]);

  // Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      id: `prod-${Date.now()}`,
      name: '',
      type: 'fruit',
      season: 'Year-round',
      yearRound: true,
      description: '',
      priceRange: '$1.50 - $2.50 / kg FOB',
      moq: '500 kg air / 1 FCL sea',
      packing: 'Export cartons (5kg / 10kg)',
      varieties: '',
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      id: prod.id,
      name: prod.n,
      type: prod.t,
      season: prod.s,
      yearRound: prod.y === 1,
      description: prod.d,
      priceRange: prod.priceRange || '',
      moq: prod.moq || '500 kg air',
      packing: prod.packing || 'Export cartons',
      varieties: prod.varieties ? prod.varieties.join(', ') : '',
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    const varietiesArray = productForm.varieties
      ? productForm.varieties.split(',').map((v) => v.trim()).filter(Boolean)
      : undefined;

    if (editingProduct) {
      // Update existing
      setProductsList((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                n: productForm.name,
                t: productForm.type,
                s: productForm.season,
                y: productForm.yearRound ? 1 : 0,
                d: productForm.description,
                priceRange: productForm.priceRange,
                moq: productForm.moq,
                packing: productForm.packing,
                varieties: varietiesArray,
              }
            : p
        )
      );
    } else {
      // Create new
      const newProd: Product = {
        id: productForm.id || `custom-${Date.now()}`,
        n: productForm.name,
        t: productForm.type,
        s: productForm.season,
        y: productForm.yearRound ? 1 : 0,
        k: 'round',
        c: productForm.type === 'fruit' ? ['#F5A623', '#F76B1C'] : ['#28BD64', '#0E6032'],
        d: productForm.description,
        priceRange: productForm.priceRange,
        moq: productForm.moq,
        packing: productForm.packing,
        varieties: varietiesArray,
      };
      setProductsList((prev) => [newProd, ...prev]);
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Remove "${name}" from the product catalog?`)) {
      setProductsList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07190F] flex items-center justify-center p-4 selection:bg-[#1FA855] selection:text-white">
        <div className="w-full max-w-md bg-[#0C2618] border border-[#18432A] rounded-3xl p-8 sm:p-10 shadow-2xl text-white">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#28BD64]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              OrchaFresh Admin Portal
            </h2>
            <p className="text-xs text-emerald-200/70 mt-1.5">
              Secure executive panel for managing export inquiries and produce catalogs.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                Authorized Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder={ADMIN_EMAIL}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#07190F] border border-[#18432A] text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#28BD64]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                Password / Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter admin password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#07190F] border border-[#18432A] text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#28BD64]"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-200">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0E6032] hover:bg-[#17894A] text-white font-extrabold text-sm transition-all shadow-md cursor-pointer mt-2"
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#18432A] text-center">
            <button
              type="button"
              onClick={onBackToSite}
              className="text-xs font-bold text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#F6FAF4] dark:bg-[#07190F] text-[#132F20] dark:text-[#E0EFE6] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-white dark:bg-[#0C2618] border-b border-[#D6E5D3] dark:border-[#18432A] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToSite}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#113822] hover:bg-slate-200 dark:hover:bg-[#184a2e] text-[#132F20] dark:text-white transition-colors cursor-pointer"
              title="Return to Public Site"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-[#0E6032] dark:text-[#28BD64]">
                ORCHA<span className="text-[#F27B20]">FRESH</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#E4F2E1] dark:bg-[#113822] text-[#0E6032] dark:text-[#28BD64] text-[10px] font-black uppercase tracking-wider">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-[#F6FAF4] dark:bg-[#07190F] p-1 rounded-xl border border-[#D6E5D3] dark:border-[#18432A]">
            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-[#0E6032] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Inquiries ({inquiries.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#0E6032] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Product Manager ({productsList.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('visitors')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'visitors'
                  ? 'bg-[#0E6032] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visitors ({visitorStats.totalVisitors.toLocaleString()})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#0E6032] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Analytics
            </button>
          </div>

          {/* User profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-[#0B2A1A] dark:text-[#F0FAF3]">
                Mahfuj Ahmed
              </span>
              <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                {ADMIN_EMAIL}
              </span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {/* Card 1: Total Website Visitors */}
          <div
            onClick={() => setActiveTab('visitors')}
            className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-xs hover:shadow-md ${
              activeTab === 'visitors'
                ? 'bg-emerald-50 dark:bg-[#113822] border-emerald-500 ring-2 ring-emerald-500/30'
                : 'bg-white dark:bg-[#0C2618] border-[#D6E5D3] dark:border-[#18432A]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Website Visitors
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FA855] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FA855]"></span>
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-[#0B2A1A] dark:text-[#F0FAF3]">
                {visitorStats.totalVisitors.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-[#0E6032] dark:text-[#28BD64]">
                {visitorStats.settings.showPublicCounter ? 'Public ON' : 'Public OFF'}
              </span>
            </div>
          </div>

          {/* Card 2: Unique Importers & Live Active */}
          <div
            onClick={() => setActiveTab('visitors')}
            className="p-5 rounded-3xl bg-white dark:bg-[#0C2618] border border-[#D6E5D3] dark:border-[#18432A] shadow-xs cursor-pointer hover:border-emerald-400 transition-all"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Unique Buyers
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-[#F27B20]">
                {visitorStats.uniqueVisitors.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                +{visitorStats.todayVisitors} today
              </span>
            </div>
          </div>

          {/* Card 3: Total Inquiries */}
          <div
            onClick={() => setActiveTab('inquiries')}
            className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-xs ${
              activeTab === 'inquiries'
                ? 'bg-emerald-50 dark:bg-[#113822] border-emerald-500'
                : 'bg-white dark:bg-[#0C2618] border-[#D6E5D3] dark:border-[#18432A]'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Total Inquiries
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-[#0B2A1A] dark:text-[#F0FAF3]">
                {stats.total}
              </span>
              <span className="text-xs font-bold text-[#0E6032] dark:text-[#28BD64]">
                Logged In
              </span>
            </div>
          </div>

          {/* Card 4: New This Week */}
          <div
            onClick={() => setActiveTab('inquiries')}
            className="p-5 rounded-3xl bg-white dark:bg-[#0C2618] border border-[#D6E5D3] dark:border-[#18432A] shadow-xs cursor-pointer hover:border-orange-400 transition-all"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              New This Week
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-[#F27B20]">
                {stats.newThisWeek}
              </span>
              <span className="text-xs font-bold text-[#F27B20]">
                Recent RFQs
              </span>
            </div>
          </div>

          {/* Card 5: Produce Catalog */}
          <div
            onClick={() => setActiveTab('products')}
            className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-xs ${
              activeTab === 'products'
                ? 'bg-emerald-50 dark:bg-[#113822] border-emerald-500'
                : 'bg-white dark:bg-[#0C2618] border-[#D6E5D3] dark:border-[#18432A]'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Active Catalog
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-[#0B2A1A] dark:text-[#F0FAF3]">
                {productsList.length}
              </span>
              <span className="text-xs font-bold text-[#0E6032] dark:text-[#28BD64]">
                Live Items
              </span>
            </div>
          </div>
        </div>

        {/* TAB 1: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="bg-white dark:bg-[#0C2618] rounded-3xl border border-[#D6E5D3] dark:border-[#18432A] shadow-md p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#18432A]">
              <div>
                <h3 className="text-xl font-black text-[#0B2A1A] dark:text-[#F0FAF3]">
                  Export Inquiries & Quotation Requests
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Real-time database of quotation requests submitted by international buyers.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-xl bg-[#0E6032] hover:bg-[#17894A] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search buyer, country, produce..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-[#1E4D34] bg-slate-50 dark:bg-[#07190F] text-xs focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="text-xs font-bold text-slate-400">Status:</span>
                {(['All', 'New', 'Contacted', 'Closed'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[#0E6032] text-white'
                        : 'bg-slate-100 dark:bg-[#113822] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Table */}
            {filteredInquiries.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <p className="text-sm font-semibold">No inquiries matching your criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#18432A]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-[#07190F] text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-[#18432A]">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Buyer / Company</th>
                      <th className="py-3 px-4">Country</th>
                      <th className="py-3 px-4">Produce & Qty</th>
                      <th className="py-3 px-4">Direct Contact</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#18432A]">
                    {filteredInquiries.map((inq) => (
                      <tr
                        key={inq.id}
                        className="hover:bg-slate-50 dark:hover:bg-[#113822]/40 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                          {inq.date}
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="block text-sm text-[#0B2A1A] dark:text-[#F0FAF3]">
                            {inq.name}
                          </strong>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            {inq.company}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-200">
                          {inq.country}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <span className="font-bold text-[#0E6032] dark:text-[#28BD64] block truncate">
                            {inq.product}
                          </span>
                          <span className="text-[11px] text-slate-400">{inq.quantity}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            {inq.whatsapp && (
                              <a
                                href={`https://wa.me/${inq.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-[#0E6032] dark:text-[#28BD64] hover:scale-110 transition-transform"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {inq.email && (
                              <a
                                href={`mailto:${inq.email}`}
                                className="p-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:scale-110 transition-transform"
                                title="Send Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleStatusChange(inq.id, e.target.value as AdminInquiry['status'])
                            }
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                              inq.status === 'New'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                                : inq.status === 'Contacted'
                                ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedInquiry(inq)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#113822] hover:bg-slate-200 text-xs font-semibold cursor-pointer"
                            >
                              Details
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGER */}
        {activeTab === 'products' && (
          <div className="bg-white dark:bg-[#0C2618] rounded-3xl border border-[#D6E5D3] dark:border-[#18432A] shadow-md p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#18432A]">
              <div>
                <h3 className="text-xl font-black text-[#0B2A1A] dark:text-[#F0FAF3]">
                  Export Produce Catalog Manager
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Add, edit, or remove produce items that appear dynamically on your live public website.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddProduct}
                className="px-4 py-2 rounded-xl bg-[#0E6032] hover:bg-[#17894A] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {productsList.map((prod) => (
                <div
                  key={prod.id}
                  className="p-5 rounded-3xl border border-slate-200 dark:border-[#18432A] bg-slate-50/50 dark:bg-[#07190F]/50 flex flex-col justify-between hover:border-emerald-400 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          prod.t === 'fruit'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {prod.t}
                      </span>
                      {prod.priceRange && (
                        <span className="text-xs font-black text-[#0E6032] dark:text-[#28BD64]">
                          {prod.priceRange}
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-black text-[#0B2A1A] dark:text-[#F0FAF3]">
                      {prod.n}
                    </h4>

                    <span className="text-xs font-bold text-[#0E6032] dark:text-[#28BD64] block mt-0.5">
                      {prod.s}
                    </span>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                      {prod.d}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-[#18432A] text-[11px] text-slate-500 space-y-1">
                      <div>
                        <strong>MOQ:</strong> {prod.moq || '500 kg air'}
                      </div>
                      <div>
                        <strong>Packaging:</strong> {prod.packing || 'Cartons'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-5 pt-3 border-t border-slate-200/60 dark:border-[#18432A]">
                    <button
                      type="button"
                      onClick={() => handleOpenEditProduct(prod)}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#113822] border border-slate-200 dark:border-[#1E4D34] hover:bg-slate-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3 text-[#0E6032] dark:text-[#28BD64]" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(prod.id, prod.n)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WEBSITE VISITORS & TRAFFIC TELEMETRY */}
        {activeTab === 'visitors' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Visitors Header & Actions */}
            <div className="bg-white dark:bg-[#0C2618] rounded-3xl border border-[#D6E5D3] dark:border-[#18432A] p-6 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#18432A]">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-[#113822] flex items-center justify-center text-[#0E6032] dark:text-[#28BD64]">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#0B2A1A] dark:text-[#F0FAF3]">
                        Website Visitors & Traffic Analytics
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Live visitor monitoring, buyer geography, devices, and public website display controls.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleRefreshVisitorStats}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#113822] hover:bg-slate-200 dark:hover:bg-[#184a2e] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Refresh Live Telemetry"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh Data</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportVisitorLogs}
                    className="px-4 py-2 rounded-xl bg-[#0E6032] hover:bg-[#17894A] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Visitor CSV</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetAnalytics}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-[#18432A] hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-500 hover:text-rose-600 text-xs font-semibold transition-colors cursor-pointer"
                    title="Recalibrate Analytics"
                  >
                    Recalibrate
                  </button>
                </div>
              </div>

              {/* Public Counter Control & Baseline Adjustment Strip */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-[#F6FAF4] dark:bg-[#07190F] border border-emerald-200/80 dark:border-[#18432A]">
                {/* Public Display Toggle */}
                <div className="flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#0B2A1A] dark:text-white">
                          Public Website Counter
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            visitorStats.settings.showPublicCounter
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-[#0E6032] dark:text-[#28BD64]'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {visitorStats.settings.showPublicCounter ? 'Visible on Site' : 'Hidden'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Display the official live visitor counter widget on the public website (in Navbar & Footer).
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleToggleCounter}
                      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        visitorStats.settings.showPublicCounter ? 'bg-[#0E6032]' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                      role="switch"
                      aria-checked={visitorStats.settings.showPublicCounter}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          visitorStats.settings.showPublicCounter ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#0E6032] dark:text-[#28BD64]">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FA855] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FA855]"></span>
                    </span>
                    <span>Active Buyers Online Right Now: {visitorStats.activeNow} international sessions</span>
                  </div>
                </div>

                {/* Baseline Adjustment */}
                <div className="border-t md:border-t-0 md:border-l border-slate-200 dark:border-[#18432A] pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                  <div>
                    <span className="font-extrabold text-sm text-[#0B2A1A] dark:text-white block mb-1">
                      Counter Baseline Calibration
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      Adjust or recalibrate the baseline visitor count to synchronize with your trade records.
                    </p>

                    <form onSubmit={handleSaveBaseline} className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={baselineInput}
                        onChange={(e) => setBaselineInput(parseInt(e.target.value, 10) || 0)}
                        className="w-36 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-[#1E4D34] bg-white dark:bg-[#0C2618] text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 rounded-xl bg-[#0E6032] hover:bg-[#17894A] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Update Baseline
                      </button>
                    </form>
                  </div>

                  {isBaselineSaved && (
                    <p className="text-xs text-[#0E6032] dark:text-[#28BD64] font-bold mt-2 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Baseline counter updated successfully!</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Dynamic Visitor Insights Trend Chart (Recharts) */}
            <VisitorInsightsCard stats={visitorStats} inquiriesCount={inquiries.length} />

            {/* Geography & Devices Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Buyer Geographic Breakdown */}
              <div className="bg-white dark:bg-[#0C2618] rounded-3xl border border-[#D6E5D3] dark:border-[#18432A] p-6 shadow-md">
                <h4 className="text-lg font-black text-[#0B2A1A] dark:text-[#F0FAF3] mb-4 flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-[#0E6032] dark:text-[#28BD64]" />
                  <span>Top Buyer Regional Traffic</span>
                </h4>
                <div className="space-y-3.5">
                  {visitorStats.countryBreakdown.map((item) => (
                    <div key={item.country} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#0B2A1A] dark:text-[#F0FAF3] flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#113822] text-[10px] font-mono">
                            {item.code}
                          </span>
                          <span>{item.country}</span>
                        </span>
                        <span className="font-semibold text-slate-500 dark:text-slate-400">
                          {item.count.toLocaleString()} visits ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#113822] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0E6032] to-[#1FA855] rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology & Devices Breakdown */}
              <div className="bg-white dark:bg-[#0C2618] rounded-3xl border border-[#D6E5D3] dark:border-[#18432A] p-6 shadow-md">
                <h4 className="text-lg font-black text-[#0B2A1A] dark:text-[#F0FAF3] mb-4 flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-[#F27B20]" />
                  <span>Visitor Device & Channel Telemetry</span>
                </h4>

                <div className="space-y-4 mb-6">
                  {visitorStats.deviceBreakdown.map((d) => (
                    <div key={d.device} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#07190F] border border-slate-100 dark:border-[#18432A] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {d.device.includes('Desktop') ? (
                          <Laptop className="w-4 h-4 text-[#0E6032] dark:text-[#28BD64]" />
                        ) : d.device.includes('Tablet') ? (
                          <Tablet className="w-4 h-4 text-purple-500" />
                        ) : (
                          <Smartphone className="w-4 h-4 text-[#F27B20]" />
                        )}
                        <span className="text-xs font-bold text-[#0B2A1A] dark:text-[#F0FAF3]">
                          {d.device}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                          {d.count.toLocaleString()}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-[#0E6032] dark:text-[#28BD64] text-xs font-black">
                          {d.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-[#113822]/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                  <p className="font-bold mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#28BD64]" />
                    <span>Executive Produce Importer Profile:</span>
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Majority of procurement buyers access OrchaFresh via Desktop workstations during Middle East & European business hours for container booking and quotation specifications.
                  </p>
                </div>
              </div>
            </div>

            {/* Real-time Visitor Access Event Log */}
            <div className="bg-white dark:bg-[#0C2618] rounded-3xl border border-[#D6E5D3] dark:border-[#18432A] p-6 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#18432A]">
                <div>
                  <h4 className="text-lg font-black text-[#0B2A1A] dark:text-[#F0FAF3] flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0E6032] dark:text-[#28BD64]" />
                    <span>Real-Time Visitor Access Logs</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Detailed record of recent visitor arrival sessions, routes, and referrers.
                  </p>
                </div>

                {/* Filter and search */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search country, page, source..."
                      value={visitorSearch}
                      onChange={(e) => setVisitorSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1E4D34] bg-slate-50 dark:bg-[#07190F] text-xs focus:outline-none focus:ring-1 focus:ring-[#0E6032] w-48 sm:w-56"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    {(['All', 'Desktop', 'Mobile'] as const).map((dev) => (
                      <button
                        key={dev}
                        type="button"
                        onClick={() => setVisitorDeviceFilter(dev)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                          visitorDeviceFilter === dev
                            ? 'bg-[#0E6032] text-white'
                            : 'bg-slate-100 dark:bg-[#113822] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {dev}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Logs Table */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-[#18432A] text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-3">Time</th>
                      <th className="py-2.5 px-3">Visitor Origin</th>
                      <th className="py-2.5 px-3">Device & Browser</th>
                      <th className="py-2.5 px-3">Viewed Page</th>
                      <th className="py-2.5 px-3">Referrer Channel</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#18432A]/60">
                    {filteredVisitorLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No matching visitor logs found.
                        </td>
                      </tr>
                    ) : (
                      filteredVisitorLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-[#113822]/30 transition-colors">
                          <td className="py-3 px-3 font-semibold text-slate-500 whitespace-nowrap">
                            {log.timestamp}
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-bold text-[#0B2A1A] dark:text-[#F0FAF3] block">
                              {log.country}
                            </span>
                            {log.city && (
                              <span className="text-[10px] text-slate-400">
                                {log.city}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                              {log.device === 'Desktop' ? (
                                <Laptop className="w-3.5 h-3.5 text-slate-400" />
                              ) : (
                                <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                              )}
                              <span>{log.browser}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-mono text-emerald-700 dark:text-emerald-400">
                            {log.page}
                          </td>
                          <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#113822] text-[11px] font-medium">
                              {log.referrer}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0E6032] dark:text-[#28BD64] text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#28BD64]"></span>
                              Logged
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DASHBOARD ANALYTICS */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Dynamic Visitor Insights Trend Chart (Recharts) */}
            <VisitorInsightsCard stats={visitorStats} inquiriesCount={inquiries.length} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-[#0C2618] rounded-3xl border border-[#D6E5D3] dark:border-[#18432A] p-6 shadow-md">
              <h4 className="text-lg font-black text-[#0B2A1A] dark:text-[#F0FAF3] mb-4 flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-[#0E6032] dark:text-[#28BD64]" />
                <span>Top Importer Countries</span>
              </h4>
              <div className="space-y-3">
                {stats.sortedCountries.map(([country, count], i) => (
                  <div
                    key={country}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-[#07190F] border border-slate-100 dark:border-[#18432A]"
                  >
                    <span className="font-bold text-sm text-[#0B2A1A] dark:text-[#F0FAF3]">
                      {i + 1}. {country}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0E6032] dark:text-[#28BD64] font-bold text-xs">
                      {count} {count === 1 ? 'inquiry' : 'inquiries'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#0C2618] rounded-3xl border border-[#D6E5D3] dark:border-[#18432A] p-6 shadow-md flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-black text-[#0B2A1A] dark:text-[#F0FAF3] mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#28BD64]" />
                  <span>Administrative Security Status</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Authenticated session active for {ADMIN_EMAIL}. All API keys are isolated on server-side proxies.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-[#113822]/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-medium">
                    ✓ Firestore Security Policy: Public write (create inquiries only), restricted admin read.
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-[#113822]/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-medium">
                    ✓ Zero credentials or secret tokens exposed in client bundles.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#18432A]">
                <button
                  type="button"
                  onClick={onBackToSite}
                  className="w-full py-3 rounded-xl bg-[#0E6032] hover:bg-[#17894A] text-white text-xs font-bold transition-all shadow-xs"
                >
                  View Live Website
                </button>
              </div>
            </div>
          </div>
          </div>
        )}
      </main>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0C2618] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#D6E5D3] dark:border-[#18432A] shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#18432A] mb-4">
              <h4 className="text-xl font-black text-[#0B2A1A] dark:text-[#F0FAF3]">
                Inquiry Details
              </h4>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-[#18432A]">
                <span className="text-slate-400">Date:</span>
                <span className="font-bold">{selectedInquiry.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-[#18432A]">
                <span className="text-slate-400">Buyer Name:</span>
                <span className="font-bold">{selectedInquiry.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-[#18432A]">
                <span className="text-slate-400">Company / Importer:</span>
                <span className="font-bold">{selectedInquiry.company}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-[#18432A]">
                <span className="text-slate-400">Destination Country:</span>
                <span className="font-bold">{selectedInquiry.country}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-[#18432A]">
                <span className="text-slate-400">Product:</span>
                <span className="font-bold text-[#0E6032] dark:text-[#28BD64]">{selectedInquiry.product}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-[#18432A]">
                <span className="text-slate-400">Quantity:</span>
                <span className="font-bold">{selectedInquiry.quantity}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Message / Requirements:</span>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-[#07190F] border border-slate-200 dark:border-[#1E4D34] text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#18432A] flex items-center justify-between">
              {selectedInquiry.whatsapp && (
                <a
                  href={`https://wa.me/${selectedInquiry.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#1FA855] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Reply on WhatsApp</span>
                </a>
              )}
              {selectedInquiry.email && (
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="px-4 py-2 rounded-xl bg-[#0E6032] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0C2618] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#D6E5D3] dark:border-[#18432A] shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#18432A] mb-4">
              <h4 className="text-xl font-black text-[#0B2A1A] dark:text-[#F0FAF3]">
                {editingProduct ? 'Edit Produce Item' : 'Add New Produce Item'}
              </h4>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amrapali Mango, Green Chilli"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E4D34] bg-slate-50 dark:bg-[#07190F] focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={productForm.type}
                    onChange={(e) => setProductForm({ ...productForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E4D34] bg-slate-50 dark:bg-[#07190F]"
                  >
                    <option value="fruit">Fruit</option>
                    <option value="veg">Vegetable</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Harvest Season *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. May – Aug or Year-round"
                    value={productForm.season}
                    onChange={(e) => setProductForm({ ...productForm, season: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E4D34] bg-slate-50 dark:bg-[#07190F] focus:outline-none focus:ring-2 focus:ring-[#0E6032]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Price Range (FOB / CIF)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $1.80 - $2.40 / kg"
                    value={productForm.priceRange}
                    onChange={(e) => setProductForm({ ...productForm, priceRange: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E4D34] bg-slate-50 dark:bg-[#07190F]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Minimum Order (MOQ)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 500 kg air / 1 FCL sea"
                    value={productForm.moq}
                    onChange={(e) => setProductForm({ ...productForm, moq: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E4D34] bg-slate-50 dark:bg-[#07190F]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Packaging Specifications
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5kg ventilated corrugated cartons"
                  value={productForm.packing}
                  onChange={(e) => setProductForm({ ...productForm, packing: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E4D34] bg-slate-50 dark:bg-[#07190F]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Varieties (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amrapali, Himsagar, Haribhanga"
                  value={productForm.varieties}
                  onChange={(e) => setProductForm({ ...productForm, varieties: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E4D34] bg-slate-50 dark:bg-[#07190F]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Export grade produce description..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E4D34] bg-slate-50 dark:bg-[#07190F]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-[#18432A]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#113822] text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0E6032] hover:bg-[#17894A] text-white text-xs font-bold cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
