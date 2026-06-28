import React, { useState } from "react";
import { groups, } from '@/data/mockData';
import {
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Check,
  UserCheck,
  Calendar,
} from "lucide-react";


export default function BroadcastBuilder() {
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([
    "VIP Customers",
  ]);
  const [messageContent, setMessageContent] = useState(
    "Hi {{FirstName}},\n\nYour premium festive package is dispatched from our hub. Track details directly.\n\nRegards,\nEnterprise Core Team",
  );
  const [mediaType, setMediaType] = useState<"text" | "image" | "pdf">("text");

  const toggleAudience = (name: string) => {
    setSelectedAudiences((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name],
    );
  };

  const baseCount = selectedAudiences.length * 340;
  const duplicateDeduction =
    selectedAudiences.length > 1 ? selectedAudiences.length * 42 : 0;
  const finalReach = baseCount - duplicateDeduction;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-50">
          Campaign Composer
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Design hyper-personalized outreach structures with sub-second live
          rendering.
        </p>
      </div>

      {/* Adaptive Responsive Layout Split */}
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Form Configuration Pipeline Block */}
        <div className="w-full xl:flex-1 space-y-6">
          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-emerald-400" /> 1. Select
              Targeted Clusters
            </h3>
            <div className="flex flex-wrap gap-2">
              {groups.slice(0, 7).map((g) => {
                const isSelected = selectedAudiences.includes(g.name);
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleAudience(g.name)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition flex items-center space-x-1.5 font-medium ${
                      isSelected
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    <span>{g.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800/60 grid grid-cols-3 text-center divide-x divide-zinc-800">
              <div>
                <p className="text-[9px] sm:text-[10px] font-medium text-zinc-500 uppercase">
                  Gross Raw
                </p>
                <p className="text-sm sm:text-base font-bold text-zinc-300 mt-1 font-mono">
                  {baseCount}
                </p>
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] font-medium text-zinc-500 uppercase">
                  Deduplicated
                </p>
                <p className="text-sm sm:text-base font-bold text-rose-400 mt-1 font-mono">
                  -{duplicateDeduction}
                </p>
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] font-medium text-emerald-400 uppercase">
                  Net Reach
                </p>
                <p className="text-sm sm:text-base font-bold text-emerald-400 mt-1 font-mono">
                  {finalReach}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-400" /> 2. Content
              Formulation Workspace
            </h3>

            <div className="grid grid-cols-3 gap-1 sm:gap-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              {[
                { id: "text", label: "Plain Text", icon: MessageSquare },
                { id: "image", label: "Image Content", icon: ImageIcon },
                { id: "pdf", label: "Document PDF", icon: FileText },
              ].map((t) => (
                <button
                  key={t.id}
                  // src/components/BroadcastBuilder.tsx (Line 87)
                  onClick={() => setMediaType(t.id as "text" | "image" | "pdf")}
                  className={`flex items-center justify-center space-x-1.5 py-2 text-xs font-medium rounded-lg transition ${
                    mediaType === t.id
                      ? "bg-zinc-800 text-zinc-100 shadow"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <t.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs text-zinc-500 gap-1 px-1">
                <span>
                  Dynamic Variable:{" "}
                  <code className="bg-zinc-800 text-zinc-300 px-1 py-0.5 rounded">
                    {"{{FirstName}}"}
                  </code>
                </span>
                <span className="font-mono">{messageContent.length} chars</span>
              </div>
              <textarea
                className="w-full h-44 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs font-medium text-zinc-200 focus:outline-none focus:border-zinc-700 leading-relaxed font-sans"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-2 gap-4">
              <div className="flex items-center space-x-2 text-xs text-zinc-500 self-start sm:self-auto">
                <Calendar className="h-4 w-4 text-zinc-400" />
                <span>Zone: UTC +05:30 (Asia/Kolkata)</span>
              </div>
              <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-zinc-950 px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/10 transition-transform active:scale-98">
                Initiate Broadcast Pipeline
              </button>
            </div>
          </div>
        </div>

        {/* Live Smartphone Simulator Layout Preview column */}
        <div className="w-full sm:w-[320px] shrink-0 mx-auto xl:sticky xl:top-6">
          <div className="w-full h-[580px] sm:h-[610px] bg-zinc-950 border-[6px] border-zinc-800 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col">
            <div className="absolute top-0 inset-x-0 h-4 bg-zinc-800 flex justify-center items-center z-40">
              <div className="w-24 h-3 bg-zinc-950 rounded-b-xl" />
            </div>

            <div className="bg-[#075e54] pt-5 pb-3 px-4 text-white flex items-center space-x-2">
              <div className="h-7 w-7 rounded-full bg-zinc-300/30 flex items-center justify-center font-bold text-xs">
                V
              </div>
              <div>
                <p className="text-xs font-semibold tracking-tight">
                  Vortex Outbound Gateway
                </p>
                <p className="text-[9px] text-emerald-200/80">
                  Official Verified Cloud Account
                </p>
              </div>
            </div>

            <div className="flex-1 bg-[#ebe5df] p-3 space-y-3 overflow-y-auto relative pattern-dots">
              <div className="mx-auto text-center my-1">
                <span className="bg-white/80 backdrop-blur-sm text-[9px] font-semibold text-zinc-500 px-2 py-0.5 rounded shadow-sm uppercase tracking-wide">
                  Today
                </span>
              </div>

              <div className="max-w-[85%] bg-white rounded-lg p-2.5 shadow-sm text-zinc-800 text-[11px] font-normal leading-relaxed relative ml-1 border-l-2 border-emerald-500">
                {mediaType === "image" && (
                  <div className="w-full h-28 bg-zinc-200 rounded mb-2 flex items-center justify-center text-zinc-400 text-xs">
                    [Selected Promotional Image]
                  </div>
                )}
                {mediaType === "pdf" && (
                  <div className="w-full bg-zinc-100 p-2 rounded mb-2 flex items-center space-x-2 border border-zinc-200">
                    <FileText className="h-4 w-4 text-rose-500" />
                    <span className="text-[9px] font-medium text-zinc-600 truncate">
                      commercial_invoice.pdf
                    </span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">
                  {messageContent.replace("{{FirstName}}", "Aravind")}
                </p>
                <div className="text-[8px] text-zinc-400 text-right mt-1.5 flex justify-end items-center space-x-0.5">
                  <span>12:29 AM</span>
                  <span className="text-blue-500 font-bold">✓✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
