"use client";

import { useState } from "react";

export default function K8sGenerator() {
  const [form, setForm] = useState({
    appName: "my-app",
    image: "my-image:latest",
    replicas: "2",
    containerPort: "3000",
    cpuRequest: "100m",
    cpuLimit: "500m",
    memRequest: "128Mi",
    memLimit: "256Mi",
    envVars: "NODE_ENV=production\nPORT=3000",
  });
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const generate = () => {
    const envLines = form.envVars
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const [name, ...rest] = l.split("=");
        return `        - name: ${name.trim()}\n          value: "${rest.join("=").trim()}"`;
      })
      .join("\n");

    const yaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${form.appName}
  labels:
    app: ${form.appName}
spec:
  replicas: ${form.replicas}
  selector:
    matchLabels:
      app: ${form.appName}
  template:
    metadata:
      labels:
        app: ${form.appName}
    spec:
      containers:
        - name: ${form.appName}
          image: ${form.image}
          ports:
            - containerPort: ${form.containerPort}
          resources:
            requests:
              cpu: ${form.cpuRequest}
              memory: ${form.memRequest}
            limits:
              cpu: ${form.cpuLimit}
              memory: ${form.memLimit}${envLines ? `\n          env:\n${envLines}` : ""}
---
apiVersion: v1
kind: Service
metadata:
  name: ${form.appName}-service
spec:
  selector:
    app: ${form.appName}
  ports:
    - protocol: TCP
      port: 80
      targetPort: ${form.containerPort}
  type: ClusterIP`;
    setOutput(yaml);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fields = [
    { key: "appName", label: "App Name", placeholder: "my-app" },
    { key: "image", label: "Docker Image", placeholder: "nginx:latest" },
    { key: "replicas", label: "Replicas", placeholder: "2" },
    { key: "containerPort", label: "Container Port", placeholder: "3000" },
    { key: "cpuRequest", label: "CPU Request", placeholder: "100m" },
    { key: "cpuLimit", label: "CPU Limit", placeholder: "500m" },
    { key: "memRequest", label: "Memory Request", placeholder: "128Mi" },
    { key: "memLimit", label: "Memory Limit", placeholder: "256Mi" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {fields.map((f) => (
          <div key={f.key} className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">{f.label}</label>
            <input
              value={form[f.key as keyof typeof form]}
              onChange={(e) => set(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-400">
          Environment Variables <span className="text-zinc-600">(KEY=VALUE, one per line)</span>
        </label>
        <textarea
          value={form.envVars}
          onChange={(e) => set("envVars", e.target.value)}
          rows={3}
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 resize-none"
        />
      </div>

      <button
        onClick={generate}
        className="self-start rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/20"
      >
        Generate YAML →
      </button>

      {output && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-400">Generated Deployment YAML</label>
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
