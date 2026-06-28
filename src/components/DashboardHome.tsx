import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Radio, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { campaigns } from '@/data/mockData';


const analyticsChartData = [
  { name: 'Mon', sent: 4000, read: 2400 },
  { name: 'Tue', sent: 7500, read: 5100 },
  { name: 'Wed', sent: 12000, read: 9800 },
  { name: 'Thu', sent: 9000, read: 7200 },
  { name: 'Fri', sent: 14382, read: 12100 },
  { name: 'Sat', sent: 6200, read: 4800 },
  { name: 'Sun', sent: 8900, read: 7100 },
];

export default function DashboardHome({ setCurrentTab }: { setCurrentTab: (tab: string) => void }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-50">System Core Activity</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">Real-time meta business API tracking execution matrix.</p>
      </div>

      {/* Responsive KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {[
          { title: 'Total Active Contacts', value: '28,492', sub: '+12% this month', icon: Users, color: 'text-blue-400' },
          { title: "Today's Volume Out", value: '14,382', sub: '98.4% delivery rate', icon: Radio, color: 'text-emerald-400' },
          { title: 'Verified Base Groups', value: '86 Segments', sub: 'Dynamic updating', icon: CheckCircle, color: 'text-purple-400' },
          { title: 'API Flag Failures', value: '42 Messages', sub: 'Automatic retries live', icon: AlertTriangle, color: 'text-rose-400' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-gradient-to-b from-zinc-900/60 to-zinc-900/20 border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700/60 transition group relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-zinc-400">{kpi.title}</span>
              <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-100">{kpi.value}</h3>
              <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-400" />
                {kpi.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Campaign Splitter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-semibold text-zinc-200">Delivery vs Engagement Timeline</h3>
              <p className="text-xs text-zinc-500">Hourly processing rates across all distribution servers</p>
            </div>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsChartData} margin={{ left: -20, right: 5 }}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} />
                <YAxis stroke="#52525b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#f4f4f5', fontSize: '12px' }} />
                <Area type="monotone" dataKey="sent" stroke="#10b981" fillOpacity={1} fill="url(#colorSent)" strokeWidth={2} name="Dispatched" />
                <Area type="monotone" dataKey="read" stroke="#3b82f6" fillOpacity={0} strokeWidth={2} name="Read Opened" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-200 mb-4">Active Campaigns Engine</h3>
            <div className="space-y-3.5">
              {campaigns.slice(0, 4).map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-between hover:border-zinc-700/60 transition cursor-pointer" onClick={() => setCurrentTab('tracking')}>
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="text-xs font-medium text-zinc-200 truncate">{c.name}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 truncate">{c.groupNames.join(', ')}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${
                    c.status === 'Sending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setCurrentTab('tracking')} className="w-full text-center text-xs font-medium text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition py-2.5 rounded-xl mt-4">
            View Analytics Deep-dive
          </button>
        </div>
      </div>
    </div>
  );
}