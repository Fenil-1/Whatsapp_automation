'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import DashboardHome from '@/components/DashboardHome';
import AudienceModule from '@/components/AudienceModule';
import BroadcastBuilder from '@/components/BroadcastBuilder';
import TrackingModule from '@/components/TrackingModule';

export default function WorkspaceContainer() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#09090b] text-zinc-100 antialiased font-sans">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <div className="flex flex-1 flex-col overflow-hidden relative">
        <Navbar currentTab={currentTab} onSearchClick={() => setSearchOpen(true)} onNewBroadcast={() => setCurrentTab('builder')} />
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0c0c0e] to-[#08080a] p-6 lg:p-8 space-y-8">
          {currentTab === 'dashboard' && <DashboardHome setCurrentTab={setCurrentTab} />}
          {currentTab === 'audience' && <AudienceModule />}
          {currentTab === 'builder' && <BroadcastBuilder />}
          {currentTab === 'tracking' && <TrackingModule />}
        </main>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-start justify-center pt-[15vh]">
          <div className="bg-[#121215] border border-zinc-800 w-full max-w-xl rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-150">
            <input 
              type="text" 
              placeholder="Search contacts, campaign histories, intelligence rules... (Press Esc to close)"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              autoFocus
              onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
            />
            <div className="mt-4 text-xs text-zinc-500 flex justify-between px-1">
              <span>Tip: Type <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">@groups</kbd> to search segments</span>
              <span>ESC to dismiss</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
