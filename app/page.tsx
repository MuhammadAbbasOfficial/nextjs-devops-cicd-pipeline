import PipelineStatus from "./components/PipelineStatus";
import PipelineDiagram from "./components/PipelineDiagram";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevOps Toolbox — Home",
  description:
    "Live CI/CD pipeline dashboard for a Next.js app deployed via Jenkins, Docker Hub, Ansible, and Kubernetes K3s.",
};

const features = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: "YAML / JSON Tools",
    desc: "Validate, convert, and format YAML and JSON with instant feedback.",
    href: "/tools",
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "border-cyan-500/20 hover:border-cyan-500/40",
    textColor: "text-cyan-400",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v.75a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25v-.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.75m-19.5-.75v.75m2.25-15v-.75m0 15V5.25m4.5 12V8.25m0 9v-.75m4.5.75V12m0 5.25v-.75" />
      </svg>
    ),
    title: "K8s YAML Generator",
    desc: "Generate Deployment + Service YAML with resource limits and env vars.",
    href: "/tools",
    color: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/20 hover:border-violet-500/40",
    textColor: "text-violet-400",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    title: "Dockerfile Generator",
    desc: "Build optimized multi-stage Dockerfiles for Node, Python, Go, and more.",
    href: "/tools",
    color: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/20 hover:border-blue-500/40",
    textColor: "text-blue-400",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Cron Explainer",
    desc: "Turn any cron expression into plain English with preset library.",
    href: "/tools",
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/20 hover:border-amber-500/40",
    textColor: "text-amber-400",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "CIDR Calculator",
    desc: "Calculate subnet details: network, broadcast, hosts, mask from CIDR.",
    href: "/tools",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    textColor: "text-emerald-400",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-400 mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
            </span>
            Live on Kubernetes K3s · Jenkins CI/CD
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            <span className="gradient-text">DevOps</span>
            <br />
            <span className="text-zinc-200">Toolbox</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-zinc-400 leading-relaxed mb-10">
            A production-grade DevOps utility suite deployed via a full CI/CD pipeline.
            Monitor your live deployment, generate configs, and master DevOps tools — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
            >
              Open Toolbox
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition-all hover:-translate-y-0.5"
            >
              View Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-10">
        <div className="mx-auto max-w-5xl space-y-4">
          <PipelineDiagram />
          <PipelineStatus />
        </div>
      </section>

      {/* Features */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Everything You Need</h2>
            <p className="text-zinc-500 text-sm">5 powerful DevOps tools, all client-side — no backend required</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className={`group rounded-2xl border ${f.border} bg-gradient-to-br ${f.color} p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/80 ${f.textColor}`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
                <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${f.textColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Open tool
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800 grid grid-cols-1 sm:grid-cols-3">
            {[
              { label: "CI/CD Stages", value: "3", sub: "Checkout → Build → Push" },
              { label: "K8s Replicas", value: "2", sub: "High availability" },
              { label: "DevOps Tools", value: "5", sub: "All client-side" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center p-6 text-center">
                <span className="text-4xl font-bold gradient-text">{stat.value}</span>
                <span className="mt-1 text-sm font-medium text-white">{stat.label}</span>
                <span className="text-xs text-zinc-500">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
