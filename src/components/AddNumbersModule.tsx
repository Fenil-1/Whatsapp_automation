"use client";

import React, { useState } from 'react';
import { Plus, UserPlus } from 'lucide-react';
import { contacts, groups } from '@/data/mockData';

export default function AddNumbersModule() {
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedCluster, setSelectedCluster] = useState('VIP Customers');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAddNumbers = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nameInput.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid name.' });
      return;
    }

    const cleanPhone = phoneInput.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid phone number.' });
      return;
    }

    // Directly push to our exported data array
    contacts.unshift({
      id: `usr-${Date.now()}`,
      name: nameInput.trim(),
      phone: `+91 ${cleanPhone.substring(cleanPhone.length - 10)}`,
      city: 'Mumbai',
      status: 'Active',
      lastSeen: '1m ago',
      engagementScore: 100,
      groups: [selectedCluster],
      tags: ['Manual Input', 'New']
    });

    setStatusMessage({
      type: 'success',
      text: `Successfully added "${nameInput}" into the audience workspace!`
    });
    
    setNameInput('');
    setPhoneInput('');
  };

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 border-b border-zinc-800/60 pb-4">
        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
          <UserPlus size={20} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-200">Add New Broadcast Contact</h3>
          <p className="text-xs text-zinc-500">Insert a single record directory into your dynamic database array.</p>
        </div>
      </div>

      <form onSubmit={handleAddNumbers} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Full Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Amit Sharma"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Phone Number</label>
            <input
              type="text"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400">Target Segment Cluster</label>
          <select 
            value={selectedCluster} 
            onChange={(e) => setSelectedCluster(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 focus:outline-none"
          >
            {groups.map(g => (
              <option key={g.id} value={g.name}>{g.name}</option>
            ))}
          </select>
        </div>

        {statusMessage && (
          <div className={`p-3 rounded-xl border text-xs ${
            statusMessage.type === 'success' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/5 text-rose-400 border-rose-500/20'
          }`}>
            {statusMessage.text}
          </div>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-sm"
        >
          <Plus size={16} strokeWidth={2.5} />
          Incorporate Recipient into Pipeline
        </button>
      </form>
    </div>
  );
}