"use client";

import { useState } from "react";

interface CronField {
  name: string;
  label: string;
  min: number;
  max: number;
  examples: string[];
}

const FIELDS: CronField[] = [
  { name: "minute", label: "Minute", min: 0, max: 59, examples: ["0", "*/5", "0,30"] },
  { name: "hour", label: "Hour", min: 0, max: 23, examples: ["*", "9", "0,12"] },
  { name: "day", label: "Day of Month", min: 1, max: 31, examples: ["*", "1", "1,15"] },
  { name: "month", label: "Month", min: 1, max: 12, examples: ["*", "3", "*/3"] },
  { name: "weekday", label: "Day of Week", min: 0, max: 6, examples: ["*", "1-5", "0,6"] },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PRESETS = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every day at noon", value: "0 12 * * *" },
  { label: "Every Monday 9am", value: "0 9 * * 1" },
  { label: "Every weekday 8am", value: "0 8 * * 1-5" },
  { label: "Every Sunday midnight", value: "0 0 * * 0" },
  { label: "1st of month midnight", value: "0 0 1 * *" },
  { label: "Every 5 minutes", value: "*/5 * * * *" },
  { label: "Every 15 minutes", value: "*/15 * * * *" },
  { label: "Twice daily", value: "0 0,12 * * *" },
  { label: "Every quarter", value: "0 0 1 */3 *" },
];

function explainPart(value: string, field: CronField): string {
  if (value === "*") return `every ${field.label.toLowerCase()}`;
  if (value.startsWith("*/")) {
    const n = value.slice(2);
    return `every ${n} ${field.label.toLowerCase()}s`;
  }
  if (value.includes("-")) {
    const [a, b] = value.split("-");
    if (field.name === "weekday") return `${WEEKDAYS[parseInt(a)]} through ${WEEKDAYS[parseInt(b)]}`;
    if (field.name === "month") return `${MONTHS[parseInt(a) - 1]} through ${MONTHS[parseInt(b) - 1]}`;
    return `${field.label} ${a} through ${b}`;
  }
  if (value.includes(",")) {
    const parts = value.split(",");
    if (field.name === "weekday") return parts.map((p) => WEEKDAYS[parseInt(p)] ?? p).join(", ");
    if (field.name === "month") return parts.map((p) => MONTHS[parseInt(p) - 1] ?? p).join(", ");
    return `at ${field.label.toLowerCase()} ${parts.join(" and ")}`;
  }
  const num = parseInt(value);
  if (field.name === "weekday") return `on ${WEEKDAYS[num] ?? value}`;
  if (field.name === "month") return `in ${MONTHS[num - 1] ?? value}`;
  if (field.name === "hour") {
    const suffix = num === 0 ? "midnight" : num === 12 ? "noon" : `${num}:00`;
    return `at ${suffix}`;
  }
  return `at ${field.label.toLowerCase()} ${value}`;
}

function explain(cron: string): { sentence: string; error: string | null } {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return { sentence: "", error: "A cron expression must have exactly 5 fields" };

  try {
    const [minute, hour, day, month, weekday] = parts;
    const minuteEx = explainPart(minute, FIELDS[0]);
    const hourEx = explainPart(hour, FIELDS[1]);
    const dayEx = day === "*" ? null : explainPart(day, FIELDS[2]);
    const monthEx = month === "*" ? null : explainPart(month, FIELDS[3]);
    const weekEx = weekday === "*" ? null : explainPart(weekday, FIELDS[4]);

    let sentence = "Runs ";

    if (minute === "0" && hour !== "*") {
      sentence += `at the top of ${hourEx}`;
    } else if (minute === "*" && hour === "*") {
      sentence += "every minute";
    } else {
      sentence += `${minuteEx} of ${hourEx}`;
    }

    if (dayEx) sentence += `, on ${dayEx}`;
    if (monthEx) sentence += `, in ${monthEx}`;
    if (weekEx) sentence += `, ${weekEx}`;

    return { sentence, error: null };
  } catch {
    return { sentence: "", error: "Invalid cron expression" };
  }
}

export default function CronExplainer() {
  const [cron, setCron] = useState("0 9 * * 1-5");
  const { sentence, error } = explain(cron);


  return (
    <div className="flex flex-col gap-4">
      {/* Main input */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-zinc-400">Cron Expression</label>
        <div className="flex gap-2">
          <input
            value={cron}
            onChange={(e) => setCron(e.target.value)}
            placeholder="* * * * *"
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-mono text-cyan-300 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 tracking-widest"
          />
        </div>
        <div className="flex justify-between text-[10px] text-zinc-600 px-1">
          {["Minute", "Hour", "Day", "Month", "Weekday"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className={`rounded-xl border p-4 ${error ? "border-red-500/30 bg-red-500/5" : "border-emerald-500/30 bg-emerald-500/5"}`}>
        {error ? (
          <p className="text-sm text-red-400">❌ {error}</p>
        ) : (
          <p className="text-sm font-medium text-emerald-300">🕐 {sentence}</p>
        )}
      </div>

      {/* Field breakdown */}
      {!error && (
        <div className="grid grid-cols-5 gap-2">
          {cron.trim().split(/\s+/).slice(0, 5).map((part, i) => (
            <div key={i} className="flex flex-col items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 p-2">
              <span className="text-xs font-mono font-bold text-cyan-400">{part}</span>
              <span className="text-[10px] text-zinc-500 text-center">{FIELDS[i]?.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Presets */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-zinc-400">Common Presets</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.value}
              onClick={() => setCron(p.value)}
              className={`flex flex-col items-start rounded-lg border px-3 py-2 text-left transition-all hover:border-zinc-500 ${
                cron === p.value
                  ? "border-cyan-500/40 bg-cyan-500/10"
                  : "border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              <span className="text-xs font-medium text-white">{p.label}</span>
              <span className="text-[10px] font-mono text-zinc-500">{p.value}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Next runs note */}
      {!error && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-xs font-medium text-zinc-400 mb-2">Field Reference</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-zinc-500">
            <span><code className="text-zinc-400">*</code> — every value</span>
            <span><code className="text-zinc-400">*/n</code> — every n units</span>
            <span><code className="text-zinc-400">a-b</code> — range</span>
            <span><code className="text-zinc-400">a,b,c</code> — list</span>
            <span><code className="text-zinc-400">0-6</code> — Sun–Sat</span>
            <span><code className="text-zinc-400">1-12</code> — Jan–Dec</span>
          </div>
        </div>
      )}
    </div>
  );
}
