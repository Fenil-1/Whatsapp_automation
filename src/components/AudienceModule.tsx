import React, { useState } from 'react';
import { generateMockData } from '@/data/mockData';
import { Search, SlidersHorizontal, Layers, Info } from 'lucide-react';

const { groups, contacts } = generateMockData();

export default function AudienceModule() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery);
    const matchesGroup = selectedGroup ? c.groups.includes(selectedGroup) : true;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50">Audience Architecture</h1>
        <p className="text-sm text-zinc-400 mt-1">Manage highly specific dynamic segments with clean structural integrity.</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" /> Dynamic Clusters
          </span>
          {selectedGroup && (
            <button onClick={() => setSelectedGroup(null)} className="text-xs text-emerald-400 hover:underline">Clear Filter</button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {groups.map((g) => {
            const isCurrent = selectedGroup === g.name;
            return (
              <div 
                key={g.id}
                onClick={() => setSelectedGroup(isCurrent ? null : g.name)}
                className={`cursor-pointer rounded-xl p-3 border transition text-left relative overflow-hidden group ${
                  isCurrent ? 'bg-zinc-800 border-zinc-600 shadow-lg' : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${g.color}`} />
                <h4 className="text-xs font-semibold text-zinc-200 truncate pr-4">{g.name}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-zinc-400 font-mono">{g.count.toLocaleString()}</span>
                  <span className="text-[9px] text-zinc-500">{g.lastUsed}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800/80 flex flex-col sm:flex-row justify-between gap-3 bg-zinc-900/40">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Query structural entity database by parameters..."
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 border border-zinc-800 bg-zinc-900/60 px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 transition">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Refine Meta Attributes</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase font-bold tracking-wider bg-zinc-900/10">
                <th className="py-3 px-4">Contact Identity</th>
                <th className="py-3 px-4">Phone Matrix</th>
                <th className="py-3 px-4">Region Cluster</th>
                <th className="py-3 px-4">Engagement Rate</th>
                <th className="py-3 px-4">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-xs font-medium text-zinc-300">
              {filteredContacts.slice(0, 12).map((c) => (
                <tr key={c.id} className="hover:bg-zinc-900/40 transition-colors group">
                  <td className="py-3.5 px-4 flex items-center space-x-3">
                    <div className="h-7 w-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-[10px] text-zinc-400">
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-zinc-200 font-semibold group-hover:text-emerald-400 transition">{c.name}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{c.tags.join(' • ')}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-zinc-400">{c.phone}</td>
                  <td className="py-3.5 px-4 text-zinc-400">{c.city}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${c.engagementScore}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">{c.engagementScore}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      c.status === 'Active' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' :
                      c.status === 'Inactive' ? 'bg-zinc-800 text-zinc-500 border-zinc-700' :
                      c.status === 'Opted Out' ? 'bg-amber-500/5 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/5 text-rose-400 border-rose-500/20'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredContacts.length === 0 && (
            <div className="p-8 text-center text-zinc-500 text-xs flex flex-col items-center justify-center space-y-2">
              <Info className="h-5 w-5 text-zinc-600" />
              <span>No operational identities matching criteria found in this index.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
