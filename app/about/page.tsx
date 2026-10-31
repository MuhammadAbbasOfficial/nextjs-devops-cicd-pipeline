import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — DevOps Toolbox Architecture",
  description:
    "Learn about the DevOps Toolbox architecture: Next.js 16 App Router deployed via Jenkins CI/CD, Docker Hub, Ansible, and Kubernetes K3s.",
};

const techStack = [
  {
    category: "Frontend",
    color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
    iconColor: "text-cyan-400 bg-cyan-500/10",
    items: [
      { name: "Next.js 16", desc: "App Router, TypeScript, Server Components" },
      { name: "React 19", desc: "Latest React with concurrent features" },
      { name: "TailwindCSS v4", desc: "Utility-first CSS with Turbopack" },
      { name: "Geist Font", desc: "Vercel's clean, modern typeface" },
    ],
  },
  {
    category: "CI/CD Pipeline",
    color: "from-amber-500/20 to-amber-500/5 border-amber-500/20",
    iconColor: "text-amber-400 bg-amber-500/10",
    items: [
      { name: "Jenkins", desc: "3-stage pipeline: Checkout → Build → Push" },
      { name: "Docker", desc: "Multi-stage build → Node 20 Alpine runner" },
      { name: "Docker Hub", desc: "Container registry (abbas786777/nextjs-devops-app)" },
      { name: "Ansible", desc: "Idempotent deployment playbook" },
    ],
  },
  {
    category: "Orchestration",
    color: "from-violet-500/20 to-violet-500/5 border-violet-500/20",
    iconColor: "text-violet-400 bg-violet-500/10",
    items: [
      { name: "Kubernetes K3s", desc: "Lightweight K8s for on-prem deployment" },
      { name: "Deployment", desc: "2 replicas with rolling updates" },
      { name: "Service", desc: "NodePort :30000 → container :3000" },
      { name: "kubectl", desc: "Managed via Ansible kubectl commands" },
    ],
  },
];

const pipelineSteps = [
  {
    step: "01",
    title: "Code Push",
    desc: "Developer pushes code to GitHub. This triggers the Jenkins webhook.",
    color: "text-zinc-400",
    bg: "bg-zinc-800",
  },
  {
    step: "02",
    title: "Jenkins Build",
    desc: "Jenkins pulls the code, builds a Docker image using the multi-stage Dockerfile, and tags it as latest.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    step: "03",
    title: "Push to Registry",
    desc: "Jenkins authenticates with Docker Hub using stored credentials and pushes the built image.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    step: "04",
    title: "Ansible Deploy",
    desc: "Ansible playbook runs kubectl apply for deployment.yaml and service.yaml on the K3s cluster.",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    step: "05",
    title: "K3s Rollout",
    desc: "Kubernetes pulls the latest image from Docker Hub, performs a rolling update across 2 replicas.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-3">
            Architecture <span className="gradient-text">Overview</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl leading-relaxed">
            This app is a real-world demonstration of a production-grade DevOps pipeline. Every code push
            goes through automated CI/CD before landing in a Kubernetes cluster.
          </p>
        </div>

        {/* Pipeline Steps */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">How the Pipeline Works</h2>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[2.25rem] top-10 bottom-10 w-px bg-gradient-to-b from-zinc-700 via-zinc-700 to-transparent hidden sm:block" />
            <div className="flex flex-col gap-4">
              {pipelineSteps.map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <div className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${s.bg} border border-zinc-700`}>
                    <span className={`text-xs font-bold font-mono ${s.color}`}>{s.step}</span>
                  </div>
                  <div className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4">
                    <h3 className={`text-sm font-semibold ${s.color} mb-1`}>{s.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {techStack.map((section) => (
              <div key={section.category} className={`rounded-2xl border bg-gradient-to-br p-5 ${section.color}`}>
                <h3 className="text-sm font-semibold text-white mb-4">{section.category}</h3>
                <div className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <div key={item.name} className="flex flex-col">
                      <span className="text-xs font-semibold text-white">{item.name}</span>
                      <span className="text-[11px] text-zinc-500 leading-relaxed">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">API Endpoints</h2>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden divide-y divide-zinc-800">
            {[
              {
                method: "GET",
                path: "/api/health",
                desc: "Health check — returns {status: \"ok\"}",
                response: '{"status":"ok"}',
                color: "text-emerald-400 bg-emerald-500/10",
              },
              {
                method: "GET",
                path: "/api/version",
                desc: "Build info — build number, git SHA, version, uptime, pod name",
                response: '{"buildNumber":"42","gitSha":"a1b2c3d","version":"1.0.0","uptime":"1h 23m","podName":"nextjs-app-xxx"}',
                color: "text-blue-400 bg-blue-500/10",
              },
            ].map((ep) => (
              <div key={ep.path} className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`rounded px-2 py-0.5 text-xs font-bold font-mono ${ep.color}`}>{ep.method}</span>
                  <code className="text-sm font-mono text-cyan-300">{ep.path}</code>
                </div>
                <p className="text-xs text-zinc-500 mb-3">{ep.desc}</p>
                <pre className="text-xs font-mono text-zinc-400 bg-zinc-950 rounded-lg px-3 py-2 overflow-x-auto">{ep.response}</pre>
              </div>
            ))}
          </div>
        </div>

        {/* ENV vars */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Environment Variables</h2>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="text-left px-5 py-3 font-medium">Variable</th>
                  <th className="text-left px-5 py-3 font-medium">Source</th>
                  <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[
                  { name: "APP_BUILD", source: "Jenkins", desc: "Build number from Jenkins pipeline" },
                  { name: "GIT_SHA", source: "Jenkins", desc: "Short git commit SHA of the deployed code" },
                  { name: "HOSTNAME", source: "Kubernetes", desc: "Pod name injected automatically by K8s" },
                  { name: "NODE_ENV", source: "Dockerfile", desc: "Set to 'production' in the runner stage" },
                ].map((v) => (
                  <tr key={v.name}>
                    <td className="px-5 py-3">
                      <code className="font-mono text-cyan-300">{v.name}</code>
                    </td>
                    <td className="px-5 py-3 text-zinc-400">{v.source}</td>
                    <td className="px-5 py-3 text-zinc-500 hidden sm:table-cell">{v.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GitHub CTA */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">View Source Code</h3>
            <p className="text-xs text-zinc-500">Explore the full pipeline configuration, Kubernetes manifests, and application code on GitHub.</p>
          </div>
          <a
            href="https://github.com/MuhammadAbbasOfficial/nextjs-devops-cicd-pipeline"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-zinc-800 border border-zinc-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 hover:border-zinc-500 transition-all"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub Repository
          </a>
        </div>
      </div>
    </div>
  );
}
