"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Client-side only tools
const YamlJsonTool = dynamic(() => import("../components/tools/YamlJsonTool"), { ssr: false });
const K8sGenerator = dynamic(() => import("../components/tools/K8sGenerator"), { ssr: false });
const DockerfileGenerator = dynamic(() => import("../components/tools/DockerfileGenerator"), { ssr: false });
const CronExplainer = dynamic(() => import("../components/tools/CronExplainer"), { ssr: false });
const CidrCalculator = dynamic(() => import("../components/tools/CidrCalculator"), { ssr: false });

type ToolId = "yaml" | "k8s" | "dockerfile" | "cron" | "cidr";

const tools: Array<{
  id: ToolId;
  label: string;
  emoji: string;
  desc: string;
  color: string;
  activeColor: string;
}> = [
  {
    id: "yaml",
    label: "YAML / JSON",
    emoji: "{ }",
    desc: "Validate & convert",
    color: "text-cyan-400",
    activeColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
  },
  {
    id: "k8s",
    label: "K8s Generator",
    emoji: "⎈",
    desc: "Deployment YAML",
    color: "text-violet-400",
    activeColor: "border-violet-500/40 bg-violet-500/10 text-violet-300",
  },
  {
    id: "dockerfile",
    label: "Dockerfile",
    emoji: "🐳",
    desc: "Container builder",
    color: "text-blue-400",
    activeColor: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  },
  {
    id: "cron",
    label: "Cron Explainer",
    emoji: "⏱",
    desc: "Schedule parser",
    color: "text-amber-400",
    activeColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  },
  {
    id: "cidr",
    label: "CIDR Calc",
    emoji: "🌐",
    desc: "Subnet calculator",
    color: "text-emerald-400",
    activeColor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<ToolId, React.ComponentType<any>> = {
  yaml: YamlJsonTool,
  k8s: K8sGenerator,
  dockerfile: DockerfileGenerator,
  cron: CronExplainer,
  cidr: CidrCalculator,
};

export default function ToolsPage() {
  const [active, setActive] = useState<ToolId>("yaml");
  const ActiveTool = components[active];
  const activeMeta = tools.find((t) => t.id === active)!;

  return (
    <div className="relative min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            DevOps <span className="gradient-text">Tools</span>
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Client-side utilities — no data leaves your browser
          </p>
        </div>

        {/* Tool Tabs — desktop horizontal */}
        <div className="hidden sm:grid grid-cols-5 gap-2 mb-6">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-xl border px-3 py-3 text-left transition-all hover:-translate-y-0.5 ${
                active === t.id
                  ? t.activeColor
                  : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              <div className={`text-lg mb-1 font-mono ${active === t.id ? "" : t.color}`}>{t.emoji}</div>
              <div className="text-xs font-semibold">{t.label}</div>
              <div className="text-[10px] text-zinc-600 mt-0.5">{t.desc}</div>
            </button>
          ))}
        </div>

        {/* Tool Tabs — mobile select */}
        <div className="sm:hidden mb-4">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value as ToolId)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500/50"
          >
            {tools.map((t) => (
              <option key={t.id} value={t.id}>
                {t.emoji} {t.label} — {t.desc}
              </option>
            ))}
          </select>
        </div>

        {/* Active Tool Panel */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm overflow-hidden">
          {/* Panel Header */}
          <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-4">
            <span className="text-xl font-mono">{activeMeta.emoji}</span>
            <div>
              <h2 className="text-sm font-semibold text-white">{activeMeta.label}</h2>
              <p className="text-xs text-zinc-500">{activeMeta.desc}</p>
            </div>
            <div className="ml-auto flex items-center gap-2 rounded-full bg-zinc-800 border border-zinc-700 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-zinc-400">Client-side only</span>
            </div>
          </div>

          {/* Tool Content */}
          <div className="p-6">
            <ActiveTool />
          </div>
        </div>
      </div>
    </div>
  );
}
