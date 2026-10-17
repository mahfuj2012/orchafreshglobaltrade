import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Eye,
  UserCheck,
  Activity,
  ArrowUpRight,
  Filter,
  Sparkles,
  Layers,
  Download
} from 'lucide-react';
import { VisitorStats } from '../types';

interface VisitorInsightsCardProps {
  stats: VisitorStats;
  inquiriesCount?: number;
}

type Timeframe = '7d' | '14d' | '30d';
type ChartType = 'area' | 'bar';
type MetricFilter = 'both' | 'visits' | 'uniques';

// Custom Tooltip for Recharts with high contrast & dark theme styling
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const visits = payload.find((p: any) => p.dataKey === 'visits')?.value ?? 0;
    const uniques = payload.find((p: any) => p.dataKey === 'uniques')?.value ?? 0;
    const inquiries = payload[0]?.payload?.inquiries ?? 0;

    return (
      <div className="bg-[#07190F] dark:bg-[#04120B] text-white p-3.5 rounded-2xl border border-emerald-500/40 shadow-2xl backdrop-blur-md text-xs min-w-[200px] z-50">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-900/60">
          <span className="font-extrabold text-[#F0FAF3] text-sm">{label}</span>
          <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
            {payload[0]?.payload?.fullDate || 'Daily Telemetry'}
          </span>
        </div>

        <div className="space-y-1.5 font-medium">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#28BD64]"></span>
              <span>Total Visits:</span>
            </span>
            <span className="font-bold font-mono text-white text-sm">{visits.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F27B20]"></span>
              <span>Unique Buyers:</span>
            </span>
            <span className="font-bold font-mono text-[#FFA25C] text-sm">{uniques.toLocaleString()}</span>
          </div>

          {inquiries > 0 && (
            <div className="flex items-center justify-between pt-1 border-t border-emerald-950">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Sparkles className="w-3 h-3 text-[#28BD64]" />
                <span>RFQ Inquiries:</span>
              </span>
              <span className="font-bold font-mono text-emerald-300">{inquiries} logged</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const VisitorInsightsCard: React.FC<VisitorInsightsCardProps> = ({
  stats,
  inquiriesCount = 3,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('7d');
  const [chartType, setChartType] = useState<ChartType>('area');
  const [metricFilter, setMetricFilter] = useState<MetricFilter>('both');

  // Dynamic daily trend dataset based on selected timeframe
  const chartData = useMemo(() => {
    // Baseline last 7 days from stats
    const last7 = stats.weeklyTrend.map((t, idx) => ({
      name: t.day,
      day: t.day,
      fullDate: t.date,
      visits: t.visits,
      uniques: t.uniques,
      inquiries: idx % 3 === 0 ? 1 : idx === 6 ? 2 : 0,
    }));

    if (timeframe === '7d') {
      return last7;
    }

    if (timeframe === '14d') {
      const prior7 = [
        { name: 'Oct 04', day: 'Sun', fullDate: 'Oct 04', visits: 172, uniques: 74, inquiries: 0 },
        { name: 'Oct 05', day: 'Mon', fullDate: 'Oct 05', visits: 210, uniques: 92, inquiries: 1 },
        { name: 'Oct 06', day: 'Tue', fullDate: 'Oct 06', visits: 235, uniques: 101, inquiries: 1 },
        { name: 'Oct 07', day: 'Wed', fullDate: 'Oct 07', visits: 189, uniques: 85, inquiries: 0 },
        { name: 'Oct 08', day: 'Thu', fullDate: 'Oct 08', visits: 254, uniques: 112, inquiries: 2 },
        { name: 'Oct 09', day: 'Fri', fullDate: 'Oct 09', visits: 228, uniques: 98, inquiries: 1 },
        { name: 'Oct 10', day: 'Sat', fullDate: 'Oct 10', visits: 165, uniques: 70, inquiries: 0 },
      ];
      return [...prior7, ...last7];
    }

    // 30 Days view
    const days30 = [];
    const baseMonthDays = 30;
    for (let i = baseMonthDays; i >= 1; i--) {
      const dateNum = 17 - i;
      const dateStr = dateNum <= 0 ? `Sep ${30 + dateNum}` : `Oct ${dateNum < 10 ? '0' + dateNum : dateNum}`;
      // Cyclic realistic produce buyer traffic
      const weekdayMod = (i + 2) % 7;
      const isWeekend = weekdayMod === 0 || weekdayMod === 6;
      const baseVisits = isWeekend ? 150 : 220;
      const wave = Math.floor(Math.sin(i / 2) * 35);
      const visits = Math.max(120, baseVisits + wave + (i === 1 ? stats.todayVisitors - baseVisits : 0));
      const uniques = Math.floor(visits * 0.44);
      const inquiries = weekdayMod === 4 ? 2 : weekdayMod === 2 ? 1 : 0;

      days30.push({
        name: dateStr,
        day: dateStr,
        fullDate: dateStr,
        visits,
        uniques,
        inquiries,
      });
    }
    // ensure last entry matches today
    if (days30.length > 0) {
      days30[days30.length - 1].visits = stats.todayVisitors;
      days30[days30.length - 1].name = 'Today';
    }
    return days30;
  }, [stats.weeklyTrend, stats.todayVisitors, timeframe]);

  // Aggregate telemetry metrics
  const aggregated = useMemo(() => {
    const totalVisits = chartData.reduce((acc, curr) => acc + curr.visits, 0);
    const totalUniques = chartData.reduce((acc, curr) => acc + curr.uniques, 0);
    const dailyAvg = Math.round(totalVisits / Math.max(1, chartData.length));
    const peakDay = chartData.reduce(
      (max, curr) => (curr.visits > max.visits ? curr : max),
      chartData[0] || { name: 'N/A', visits: 0 }
    );
    const uniqueRatio = ((totalUniques / Math.max(1, totalVisits)) * 100).toFixed(1);

    return {
      totalVisits,
      totalUniques,
      dailyAvg,
      peakDay,
      uniqueRatio,
    };
  }, [chartData]);

  // Export chart data as CSV
  const handleExportCSV = () => {
    const headers = ['Date / Day', 'Total Daily Visits', 'Unique Importers', 'Logged Inquiries'];
    const rows = chartData.map((d) => [`"${d.fullDate || d.name}"`, d.visits, d.uniques, d.inquiries]);
    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `orchafresh_visitor_trend_${timeframe}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-[#0C2618] rounded-3xl border border-[#D6E5D3] dark:border-[#18432A] p-6 sm:p-7 shadow-md transition-all">
      {/* Top Header Row with Timeframe & Mode Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#18432A]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0E6032] to-[#28BD64] flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-[#0B2A1A] dark:text-[#F0FAF3] tracking-tight">
                  Visitor Insights & Daily Traffic Trends
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0E6032] dark:text-[#28BD64] text-[10px] font-black uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28BD64] animate-pulse"></span>
                  Dynamic Telemetry
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Interactive Recharts visualization of international produce buyer visits and unique sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Controls Toolbar: Timeframe Selector, Chart Type, Metric Filter & Export */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Metric Filter */}
          <div className="flex items-center bg-slate-100 dark:bg-[#07190F] p-1 rounded-xl border border-slate-200 dark:border-[#18432A]">
            <button
              type="button"
              onClick={() => setMetricFilter('both')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                metricFilter === 'both'
                  ? 'bg-white dark:bg-[#113822] text-[#0E6032] dark:text-[#28BD64] shadow-xs'
                  : 'text-slate-500 hover:text-black dark:hover:text-white'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setMetricFilter('visits')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                metricFilter === 'visits'
                  ? 'bg-white dark:bg-[#113822] text-[#0E6032] dark:text-[#28BD64] shadow-xs'
                  : 'text-slate-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Visits
            </button>
            <button
              type="button"
              onClick={() => setMetricFilter('uniques')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                metricFilter === 'uniques'
                  ? 'bg-white dark:bg-[#113822] text-[#F27B20] shadow-xs'
                  : 'text-slate-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Uniques
            </button>
          </div>

          {/* Chart Type Toggle: Area vs Bar */}
          <div className="flex items-center bg-slate-100 dark:bg-[#07190F] p-1 rounded-xl border border-slate-200 dark:border-[#18432A]">
            <button
              type="button"
              onClick={() => setChartType('area')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                chartType === 'area'
                  ? 'bg-[#0E6032] text-white shadow-xs'
                  : 'text-slate-500 hover:text-black dark:hover:text-white'
              }`}
              title="Smooth Trend Area Chart"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Trend</span>
            </button>
            <button
              type="button"
              onClick={() => setChartType('bar')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                chartType === 'bar'
                  ? 'bg-[#0E6032] text-white shadow-xs'
                  : 'text-slate-500 hover:text-black dark:hover:text-white'
              }`}
              title="Column Comparison Bar Chart"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bars</span>
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-[#07190F] p-1 rounded-xl border border-slate-200 dark:border-[#18432A]">
            {(['7d', '14d', '30d'] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#0E6032] text-white shadow-xs'
                    : 'text-slate-500 hover:text-black dark:hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="p-2 rounded-xl bg-slate-100 dark:bg-[#113822] hover:bg-slate-200 dark:hover:bg-[#184a2e] text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
            title="Download Trend CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
        <div className="p-3.5 rounded-2xl bg-[#F6FAF4] dark:bg-[#07190F] border border-[#D6E5D3] dark:border-[#18432A]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Period Visits ({timeframe.toUpperCase()})
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#0B2A1A] dark:text-[#F0FAF3] font-mono">
              {aggregated.totalVisits.toLocaleString()}
            </span>
            <span className="text-[11px] font-bold text-[#0E6032] dark:text-[#28BD64]">
              +18.4%
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F6FAF4] dark:bg-[#07190F] border border-[#D6E5D3] dark:border-[#18432A]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Unique Importers
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#F27B20] font-mono">
              {aggregated.totalUniques.toLocaleString()}
            </span>
            <span className="text-[11px] font-bold text-[#F27B20]">
              {aggregated.uniqueRatio}% ratio
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F6FAF4] dark:bg-[#07190F] border border-[#D6E5D3] dark:border-[#18432A]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Daily Average
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#0E6032] dark:text-[#28BD64] font-mono">
              ~{aggregated.dailyAvg}
            </span>
            <span className="text-[11px] text-slate-500">
              per day
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F6FAF4] dark:bg-[#07190F] border border-[#D6E5D3] dark:border-[#18432A]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Peak Traffic Day
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-black text-[#0B2A1A] dark:text-white truncate">
              {aggregated.peakDay.name}
            </span>
            <span className="text-[11px] font-mono font-bold text-[#0E6032] dark:text-[#28BD64]">
              {aggregated.peakDay.visits} visits
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Recharts Chart Container */}
      <div className="w-full h-72 sm:h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0E6032" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#0E6032" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="colorUniques" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F27B20" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#F27B20" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
                dy={6}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
              />

              <Tooltip content={<CustomChartTooltip />} />

              {(metricFilter === 'both' || metricFilter === 'visits') && (
                <Area
                  type="monotone"
                  dataKey="visits"
                  name="Total Visits"
                  stroke="#0E6032"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                  activeDot={{ r: 6, stroke: '#28BD64', strokeWidth: 2, fill: '#FFFFFF' }}
                />
              )}

              {(metricFilter === 'both' || metricFilter === 'uniques') && (
                <Area
                  type="monotone"
                  dataKey="uniques"
                  name="Unique Buyers"
                  stroke="#F27B20"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorUniques)"
                  activeDot={{ r: 5, stroke: '#FFA25C', strokeWidth: 2, fill: '#FFFFFF' }}
                />
              )}
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
                dy={6}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
              />

              <Tooltip content={<CustomChartTooltip />} />

              {(metricFilter === 'both' || metricFilter === 'visits') && (
                <Bar
                  dataKey="visits"
                  name="Total Visits"
                  fill="#0E6032"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={32}
                />
              )}

              {(metricFilter === 'both' || metricFilter === 'uniques') && (
                <Bar
                  dataKey="uniques"
                  name="Unique Buyers"
                  fill="#F27B20"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={32}
                />
              )}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Legend & Insights Footer */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-[#18432A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <span className="w-3 h-3 rounded-full bg-[#0E6032]"></span>
            <span>Total Website Visits</span>
          </span>
          <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <span className="w-3 h-3 rounded-full bg-[#F27B20]"></span>
            <span>Unique Buyer Sessions</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#28BD64]" />
          <span>Middle East & European market traffic peaks Tuesday through Thursday.</span>
        </div>
      </div>
    </div>
  );
};
