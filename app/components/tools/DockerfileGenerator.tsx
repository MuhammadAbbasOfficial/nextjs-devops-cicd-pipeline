"use client";

import { useState } from "react";

type BaseImage = { value: string; label: string };

const baseImages: BaseImage[] = [
  { value: "node:20-alpine", label: "Node.js 20 Alpine" },
  { value: "node:18-alpine", label: "Node.js 18 Alpine" },
  { value: "python:3.12-slim", label: "Python 3.12 Slim" },
  { value: "python:3.11-alpine", label: "Python 3.11 Alpine" },
  { value: "golang:1.22-alpine", label: "Go 1.22 Alpine" },
  { value: "openjdk:21-jdk-slim", label: "Java 21 JDK Slim" },
  { value: "nginx:alpine", label: "Nginx Alpine" },
  { value: "ubuntu:22.04", label: "Ubuntu 22.04" },
];

const presets: Record<string, Partial<typeof defaultForm>> = {
  nextjs: {
    baseImage: "node:20-alpine",
    workdir: "/app",
    port: "3000",
    buildCmd: "npm run build",
    startCmd: "npm start",
    installCmd: "npm ci",
    multiStage: true,
    runnerImage: "node:20-alpine",
    copyFiles: "package.json package-lock.json",
  },
  node: {
    baseImage: "node:20-alpine",
    workdir: "/app",
    port: "3000",
    buildCmd: "",
    startCmd: "node index.js",
    installCmd: "npm ci",
    multiStage: false,
  },
  python: {
    baseImage: "python:3.12-slim",
    workdir: "/app",
    port: "8000",
    buildCmd: "",
    startCmd: "python app.py",
    installCmd: "pip install -r requirements.txt",
    multiStage: false,
  },
  nginx: {
    baseImage: "nginx:alpine",
    workdir: "/usr/share/nginx/html",
    port: "80",
    buildCmd: "",
    startCmd: "",
    installCmd: "",
    multiStage: false,
  },
};

const defaultForm = {
  baseImage: "node:20-alpine",
  runnerImage: "node:20-alpine",
  workdir: "/app",
  port: "3000",
  installCmd: "npm ci",
  buildCmd: "npm run build",
  startCmd: "npm start",
  copyFiles: "package.json package-lock.json",
  multiStage: true,
  addUser: true,
  envVars: "NODE_ENV=production",
};

export default function DockerfileGenerator() {
  const [form, setForm] = useState(defaultForm);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const applyPreset = (name: string) => {
    setForm((f) => ({ ...f, ...presets[name] }));
    setOutput("");
  };

  const generate = () => {
    const envLines = form.envVars
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => `ENV ${l}`)
      .join("\n");

    let dockerfile = "";

    if (form.multiStage) {
      dockerfile = `# ─── Stage 1: Dependencies ───────────────────────────────
FROM ${form.baseImage} AS deps
WORKDIR ${form.workdir}
COPY ${form.copyFiles} ./
${form.installCmd ? `RUN ${form.installCmd}` : ""}

# ─── Stage 2: Builder ────────────────────────────────────
FROM ${form.baseImage} AS builder
WORKDIR ${form.workdir}
COPY --from=deps ${form.workdir}/node_modules ./node_modules
COPY . .
${form.buildCmd ? `RUN ${form.buildCmd}` : ""}

# ─── Stage 3: Runner (Production) ────────────────────────
FROM ${form.runnerImage} AS runner
WORKDIR ${form.workdir}
${envLines}
${form.addUser ? `RUN addgroup --system --gid 1001 nodejs\nRUN adduser --system --uid 1001 nextjs` : ""}
COPY --from=builder ${form.workdir}/public ./public
COPY --from=builder ${form.workdir}/.next ./.next
COPY --from=builder ${form.workdir}/node_modules ./node_modules
COPY --from=builder ${form.workdir}/package.json ./package.json
${form.addUser ? `USER nextjs` : ""}
EXPOSE ${form.port}
${form.startCmd ? `CMD ["sh", "-c", "${form.startCmd}"]` : ""}`;
    } else {
      dockerfile = `FROM ${form.baseImage}
WORKDIR ${form.workdir}
${envLines}
COPY . .
${form.installCmd ? `RUN ${form.installCmd}` : ""}
${form.buildCmd ? `RUN ${form.buildCmd}` : ""}
EXPOSE ${form.port}
${form.startCmd ? `CMD ["sh", "-c", "${form.startCmd}"]` : ""}`;
    }

    setOutput(dockerfile.trim());
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-zinc-500 self-center">Quick presets:</span>
        {["nextjs", "node", "python", "nginx"].map((p) => (
          <button
            key={p}
            onClick={() => applyPreset(p)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition-all capitalize"
          >
            {p === "nextjs" ? "Next.js" : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Base Image</label>
          <select
            value={form.baseImage}
            onChange={(e) => set("baseImage", e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500/50"
          >
            {baseImages.map((img) => (
              <option key={img.value} value={img.value}>{img.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Working Directory</label>
          <input value={form.workdir} onChange={(e) => set("workdir", e.target.value)} className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500/50" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Install Command</label>
          <input value={form.installCmd} onChange={(e) => set("installCmd", e.target.value)} placeholder="npm ci" className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500/50" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Build Command</label>
          <input value={form.buildCmd} onChange={(e) => set("buildCmd", e.target.value)} placeholder="npm run build" className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500/50" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Start Command</label>
          <input value={form.startCmd} onChange={(e) => set("startCmd", e.target.value)} placeholder="npm start" className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500/50" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400">Exposed Port</label>
          <input value={form.port} onChange={(e) => set("port", e.target.value)} placeholder="3000" className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500/50" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-400">ENV Variables <span className="text-zinc-600">(KEY=VALUE, one per line)</span></label>
        <textarea value={form.envVars} onChange={(e) => set("envVars", e.target.value)} rows={2} className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500/50 resize-none" />
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.multiStage} onChange={(e) => set("multiStage", e.target.checked)} className="rounded border-zinc-600 bg-zinc-800 text-cyan-500 focus:ring-cyan-500/50" />
          <span className="text-xs text-zinc-400">Multi-stage build</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.addUser} onChange={(e) => set("addUser", e.target.checked)} className="rounded border-zinc-600 bg-zinc-800 text-cyan-500 focus:ring-cyan-500/50" />
          <span className="text-xs text-zinc-400">Add non-root user</span>
        </label>
      </div>

      <button
        onClick={generate}
        className="self-start rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
      >
        Generate Dockerfile →
      </button>

      {output && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-400">Dockerfile</label>
            <button onClick={copy} className="text-xs text-zinc-500 hover:text-cyan-400 transition-colors">
              {copied ? "✅ Copied!" : "Copy"}
            </button>
          </div>
          <pre className="overflow-auto rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-xs font-mono text-emerald-300 max-h-72">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
