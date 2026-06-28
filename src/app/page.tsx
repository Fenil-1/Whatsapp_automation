"use client";

import React, { useState } from "react";
import { Menu, X, LayoutDashboard, Radio, Users, Activity, Search, Plus, Bell, Settings } from "lucide-react";
import DashboardHome from "@/components/DashboardHome";
import BroadcastBuilder from "@/components/BroadcastBuilder";
import AudienceModule from "@/components/AudienceModule";
import TrackingModule from "@/components/TrackingModule";
import AddNumbersModule from "@/components/AddNumbersModule";

export default function WorkspaceContainer() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "builder", label: "Broadcast Builder", icon: Radio },
    { id: "audience", label: "Audience Module", icon: Users },
    { id: "tracking", label: "Live Tracking", icon: Activity },
  ];

  // Helper to resolve the user-facing name for the breadcrumb
  const getTabLabel = () => {
    if (currentTab === "add-numbers") return "Add Broadcast Numbers";
    const matched = navigationItems.find(item => item.id === currentTab);
    return matched ? matched.label : "Dashboard";
  };

  const renderActiveModule = () => {
    switch (currentTab) {
      case "dashboard": 
        return <DashboardHome setCurrentTab={setCurrentTab} />;
      case "builder": 
        return <BroadcastBuilder />;
      case "audience": 
        return <AudienceModule />;
      case "tracking": 
        return <TrackingModule />;
      case "add-numbers":
        return <AddNumbersModule />;
      default: 
        return <DashboardHome setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#09090b] text-zinc-100 overflow-x-hidden">
      
      {/* MOBILE TOP BAR */}
      <header className="flex md:hidden items-center justify-between px-4 py-3 bg-[#0c0c0e] border-b border-zinc-800/80 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-gradient-to-tr from-emerald-500 to-teal-500" />
          <span className="font-semibold text-sm tracking-tight text-white capitalize">whatsapp automation</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentTab("add-numbers")}
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 p-1.5 rounded-md font-bold"
          >
            <Plus size={16} />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-1.5 text-zinc-400 hover:text-white rounded-md"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0c0c0e] border-r border-zinc-900 p-4 transform transition-transform duration-200 ease-in-out
        md:relative md:transform-none md:flex md:flex-col justify-between shrink-0
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="flex flex-col flex-1">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-6 mb-4 border-b border-zinc-900 md:block">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded bg-emerald-500 flex items-center justify-center font-bold text-zinc-950 text-sm shadow-md shadow-emerald-500/10">W</div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-xs tracking-tight text-white capitalize">whatsapp automation</h1>
                <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider scale-90">SaaS</span>
              </div>
            </div>
            <button className="md:hidden text-zinc-400" onClick={() => setMobileMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <p className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold px-3 mb-2">Automate Engine</p>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 text-left
                    ${isActive 
                      ? "bg-zinc-900 text-white border border-zinc-800" 
                      : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent"}`}
                >
                  <Icon size={16} className={isActive ? "text-emerald-400" : "text-zinc-500"} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Section */}
        <div className="pt-4 border-t border-zinc-900 mt-auto flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[10px] font-bold border border-zinc-700">HQ</div>
            <div>
              <p className="text-[11px] font-bold text-zinc-200 leading-none">Reliance Retail Admin</p>
              <p className="text-[9px] text-zinc-500 mt-1 font-medium">Enterprise Tier ($500/mo)</p>
            </div>
          </div>
          <Settings size={14} className="text-zinc-600 hover:text-zinc-400 cursor-pointer" />
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* MAIN LAYOUT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP NAVBAR */}
        <nav className="hidden md:flex items-center justify-between h-14 border-b border-zinc-900 bg-[#09090b] px-6 lg:px-8">
          
          {/* Left Block: Breadcrumb Tracking */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-500">
            <span>Workspace</span>
            <span>&gt;</span>
            <span className="text-zinc-200">{getTabLabel()}</span>
          </div>

          {/* Right Block: Actions stack */}
          <div className="flex items-center space-x-4">
            {/* Search Input Bar with Command Badge */}
            <div 
              onClick={() => setSearchOpen(true)}
              className="relative w-64 lg:w-72 bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 rounded-xl px-3 py-1.5 flex items-center justify-between text-zinc-500 cursor-pointer transition"
            >
              <div className="flex items-center space-x-2">
                <Search size={14} className="text-zinc-500" />
                <span className="text-[11px] font-medium">Search workspace...</span>
              </div>
              <kbd className="text-[9px] bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded font-mono font-bold tracking-tight text-zinc-400">⌘K</kbd>
            </div>

            {/* Notification Bell */}
            <button className="relative p-1.5 text-zinc-400 hover:text-zinc-200 border border-zinc-900 rounded-lg hover:bg-zinc-900/30 transition">
              <Bell size={15} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </button>

            {/* Prominent Action Button Positioned up top */}
            <button
              onClick={() => setCurrentTab("add-numbers")}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 border
                ${currentTab === "add-numbers"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-inner"
                  : "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 border-transparent shadow-sm active:scale-[0.98]"}`}
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>New Broadcast</span>
            </button>
          </div>
        </nav>

        {/* VIEWPORT CONTAINER BODY */}
        <main className="flex-1 bg-gradient-to-b from-[#09090b] to-[#060608] p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            {renderActiveModule()}
          </div>
        </main>
      </div>

      {/* CMD + K SEARCH MODAL OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-start justify-center p-4 pt-[10vh]">
          <div className="bg-[#121215] border border-zinc-800 w-full max-w-xl rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-150">
            <input
              type="text"
              placeholder="Search contacts, campaigns, logs... (Press Esc to close)"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              autoFocus
              onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
            />
            <div className="mt-4 text-[11px] text-zinc-500 flex justify-between items-center px-1">
              <span>Tip: Use modular keywords to lookup specific sub-routes</span>
              <button onClick={() => setSearchOpen(false)} className="text-zinc-400 hover:text-white font-medium">ESC to dismiss</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}