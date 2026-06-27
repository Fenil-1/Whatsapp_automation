import React from 'react';
import { Search, Bell, Plus, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSearchClick: () => void;
  onNewBroadcast: () => void;
}

export default function Navbar({ currentTab, onSearchClick, onNewBroadcast }: NavbarProps) {
  return (
    <header className="h-16 border-b border-zinc-800/80 bg-[#0c0c0e]/80 backdrop-blur-md px-6 flex items-center justify-between z-30">
      <div className="flex items-center space-x-2 text-xs font-medium text-zinc-400">
        <span>Workspace</span>
        <ChevronRight className="h-3 w-3 text-zinc-600" />
        <span className="capitalize text-zinc-200 font-semibold">{currentTab.replace('-', ' ')}</span>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={onSearchClick}
          className="w-64 hidden md:flex items-center justify-between bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition px-3 py-1.5 rounded-lg text-left text-xs text-zinc-500"
        >
          <div className="flex items-center space-x-2">
            <Search className="h-3.5 w-3.5 text-zinc-500" />
            <span>Search workspace...</span>
          </div>
          <div className="flex items-center space-x-1 bg-zinc-800 border border-zinc-700/80 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">
            <span>⌘K</span>
          </div>
        </button>

        <div className="relative p-2 text-zinc-400 hover:text-zinc-200 cursor-pointer transition">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>

        <button 
          onClick={onNewBroadcast}
          className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-[0_4px_20px_rgba(16,185,129,0.25)] transition duration-200 active:scale-95"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>New Broadcast</span>
        </button>
      </div>
    </header>
  );
}
