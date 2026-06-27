import React from 'react';
import { LayoutDashboard, Users, Radio, BarChart3, Settings, Sparkles } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Sidebar({ currentTab, setCurrentTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'builder', label: 'Broadcast Builder', icon: Radio },
    { id: 'audience', label: 'Audience Module', icon: Users },
    { id: 'tracking', label: 'Live Tracking', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-[#0c0c0e] border-r border-zinc-800/80 flex flex-col justify-between h-full select-none">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-zinc-800/60 justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <Sparkles className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-zinc-100">Vortex Enterprise</span>
          </div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/20 rounded-full">SaaS</div>
        </div>

        <div className="p-4 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 px-2 mb-2">Automate Engine</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                  isActive 
                    ? 'bg-zinc-800 text-zinc-50 border border-zinc-700/50 shadow-inner' 
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-zinc-800/60 bg-zinc-900/20">
        <div className="flex items-center space-x-3 px-2 py-1.5 rounded-lg">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 flex items-center justify-center font-bold text-xs text-white">
            HQ
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-zinc-200 truncate">Reliance Retail Admin</p>
            <p className="text-[10px] text-zinc-500 truncate">Enterprise Tier ($500/mo)</p>
          </div>
          <Settings className="h-4 w-4 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
