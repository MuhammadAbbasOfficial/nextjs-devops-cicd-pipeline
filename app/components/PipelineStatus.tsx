"use client";

import { useEffect, useState, useCallback, startTransition } from "react";

interface VersionData {
  buildNumber: string;
  gitSha: string;
  version: string;
  uptime: string;
  podName: string;
  timestamp: string;
}

function StatCard({
  label,
  value,
  icon,
  mono = false,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 hover:border-zinc-700 transition-colors">
      <div className="flex items-center gap-2 text-zinc-500">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <span
        className={`text-sm font-semibold text-white truncate ${mono ? "font-mono text-cyan-300" : ""}`}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}

export default function PipelineStatus() {
  const [data, setData] = useState<VersionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/version", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    startTransition(() => { fetchData(); });
    const interval = setInterval(() => startTransition(() => { fetchData(); }), 10_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20">
            <svg className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Live Pipeline Status</h3>
            <p className="text-xs text-zinc-500">Refreshes every 10 seconds</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {error ? (
            <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-medium text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              Error
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Live
            </span>
          )}
          <button
            onClick={fetchData}
            className="rounded-lg p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Refresh now"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-zinc-800/50" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <svg className="h-10 w-10 text-red-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-sm text-zinc-500">Could not fetch pipeline status</p>
          </div>
        ) : data ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <StatCard
              label="Build #"
              value={`#${data.buildNumber}`}
              mono
              icon={<svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>}
            />
            <StatCard
              label="Git SHA"
              value={data.gitSha.length > 7 ? data.gitSha.slice(0, 7) : data.gitSha}
              mono
              icon={<svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>}
            />
            <StatCard
              label="Version"
              value={`v${data.version}`}
              icon={<svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /></svg>}
            />
            <StatCard
              label="Uptime"
              value={data.uptime}
              icon={<svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
            <StatCard
              label="Pod"
              value={data.podName}
              mono
              icon={<svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 17.25v.75a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25v-.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.75m-19.5-.75v.75m2.25-15v-.75m0 15V5.25m4.5 12V8.25m0 9v-.75m4.5.75V12m0 5.25v-.75" /></svg>}
            />
            <StatCard
              label="Environment"
              value={data.nodeEnv ?? "production"}
              icon={<svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>}
            />
          </div>
        ) : null}

        {lastUpdated && (
          <p className="mt-3 text-right text-xs text-zinc-600">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}
