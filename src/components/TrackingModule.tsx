import React from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';

// import { audienceMockData } from "@/data/mockData";
import { contacts } from '@/data/mockData';

export default function TrackingModule() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-50">Delivery Intelligence & Live Tracking</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">Deep structural overview of telemetry metrics, bypass vectors, and compliance logs.</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-zinc-200">System Delivery Intelligence Core</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { count: '214 contacts bypassed', label: 'No active engagement for 180 days', color: 'border-amber-500/30 bg-amber-500/5 text-amber-400' },
            { count: '89 contacts skipped', label: 'Global opt-out list detected', color: 'border-zinc-800 bg-zinc-900/20 text-zinc-400' },
            { count: '43 numbers dropped', label: 'Invalid format/Meta blocklist criteria', color: 'border-rose-500/30 bg-rose-500/5 text-rose-400' },
            { count: '18 messages deferred', label: 'Daily business account tier threshold limit', color: 'border-blue-500/30 bg-blue-500/5 text-blue-400' }
          ].map((card, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${card.color} flex flex-col justify-between gap-1`}>
              <h4 className="text-xs font-bold tracking-tight">{card.count}</h4>
              <p className="text-[11px] text-zinc-400 leading-snug">{card.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl overflow-hidden">
        <div className="p-4 bg-zinc-900/40 border-b border-zinc-800 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xs font-semibold text-zinc-200">Real-time Transmission Diagnostics Stack</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Live stream telemetry logs from downstream micro-routing clusters</p>
          </div>
          <div className="flex items-center self-start sm:self-auto space-x-2 text-[10px] bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800 font-mono text-zinc-400">
            <RefreshCw className="h-3 w-3 animate-spin text-emerald-400" />
            <span>Streaming Live Nodes</span>
          </div>
        </div>

        {/* Scroll Containment layer wrapper to safeguard mobile screens */}
        <div className="w-full overflow-x-auto separation-layer">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase font-bold tracking-wider bg-zinc-900/10">
                <th className="py-3 px-4">Identity Meta Phone</th>
                <th className="py-3 px-4">Segment Source</th>
                <th className="py-3 px-4">Timestamp Trace</th>
                <th className="py-3 px-4">Network Vector Status</th>
                <th className="py-3 px-4">Retry / Diagnostic Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-xs font-medium text-zinc-300 font-mono">
              {contacts.slice(25, 34).map((c, i) => {
                const simulatedStatuses = ['Delivered', 'Read', 'Queued', 'Skipped (Opted Out)', 'Failed (Network error)'];
                const computedStatus = simulatedStatuses[i % simulatedStatuses.length];
                return (
                  <tr key={c.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3 px-4 font-sans font-semibold text-zinc-200">
                      {c.name} 
                      <span className="text-zinc-500 block font-mono font-normal text-[11px] mt-0.5">{c.phone}</span>
                    </td>
                    <td className="py-3 px-4 text-zinc-400 font-sans text-xs">{c.groups[0]}</td>
                    <td className="py-3 px-4 text-zinc-500 text-[11px]">2026-06-28 00:29:{30 + i} AM</td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-sans px-2 py-0.5 rounded-full font-medium ${
                        computedStatus === 'Read' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        computedStatus === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        computedStatus === 'Queued' ? 'bg-zinc-800 text-zinc-400 border border-zinc-700' :
                        'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {computedStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-zinc-500 text-[11px] font-sans">
                      {computedStatus.includes('Failed') ? 'Auto-retrying on secondary channel' : '0 errors detected'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}