import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Muhammad Abbas | DevOps Engineer",
  description:
    "Muhammad Abbas portfolio showcasing DevOps skills in CI/CD, Docker, Kubernetes, Ansible, AWS, and cloud infrastructure.",
};

const technicalSkills = [
  "CI/CD",
  "Docker",
  "Kubernetes",
  "Ansible",
  "AWS EC2",
  "Linux & Bash",
  "Git & GitHub",
  "YAML & Python",
];

const projects = [
  {
    name: "End-to-End CI/CD Pipeline for a Next.js Application",
    link: "https://github.com/MuhammadAbbasOfficial/nextjs-devops-cicd-pipeline",
    description:
      "Built a complete pipeline using GitHub, Jenkins, Docker, Docker Hub, Ansible, and K3s on AWS EC2. The app is deployed with 2 replicas and exposed via NodePort.",
  },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.15),_transparent_30%),linear-gradient(180deg,#020817_0%,#0f172a_100%)] px-4 py-12 text-zinc-200 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-black/20 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-400">Portfolio</p>
              <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                MUHAMMAD ABBAS
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-cyan-300">
                DevOps Engineer | CI/CD • Docker • Kubernetes • Ansible • AWS
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-700 bg-zinc-950/60 p-4 text-sm text-zinc-300">
              <p>mabbas786official@gmail.com</p>
              <p>+92 345-0715686</p>
              <p>Mardan, Pakistan</p>
              <p>GitHub: github.com/MuhammadAbbasOfficial</p>
              <p className="mt-2 text-emerald-400">Available Immediately</p>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Professional summary</p>
          <p className="text-lg leading-8 text-zinc-300">
            Motivated Computer Science graduate with hands-on experience building a complete CI/CD pipeline for a
            Next.js application from GitHub to a running Kubernetes cluster using Jenkins, Docker, Docker Hub,
            Ansible, and K3s on an AWS EC2 Ubuntu server. Skilled in containerization, pipeline automation,
            infrastructure as code, and cloud networking, with a strong interest in contributing to real engineering
            workflows and production-ready systems.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Technical skills</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {technicalSkills.map((skill) => (
                <div key={skill} className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 font-medium text-white">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Quick profile</p>
            <ul className="space-y-3 text-zinc-300">
              <li>• Jenkins pipelines and credentials handling</li>
              <li>• Docker multi-stage builds and image optimization</li>
              <li>• Kubernetes deployments, services, and replica management</li>
              <li>• Ansible playbooks for repeatable deployment automation</li>
              <li>• AWS EC2 setup, security groups, and networking</li>
            </ul>
          </div>
        </section>

        <section className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">DevOps projects</p>

          {projects.map((project) => (
            <div key={project.name} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-cyan-300 hover:text-cyan-200"
              >
                {project.name}
              </a>
              <p className="mt-3 text-zinc-300">{project.description}</p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
                  <h3 className="mb-2 font-semibold text-white">CI Pipeline</h3>
                  <p className="text-sm leading-7 text-zinc-300">
                    Designed a Jenkins declarative pipeline that builds a Docker image from GitHub source code and pushes it to Docker Hub using credentials stored in Jenkins.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
                  <h3 className="mb-2 font-semibold text-white">Containerization</h3>
                  <p className="text-sm leading-7 text-zinc-300">
                    Containerized the application with a multi-stage Dockerfile using Node 20 Alpine to optimize build and runtime efficiency.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
                  <h3 className="mb-2 font-semibold text-white">Deployment & Orchestration</h3>
                  <p className="text-sm leading-7 text-zinc-300">
                    Deployed the application on a lightweight Kubernetes (K3s) cluster with 2 replicas and exposed it through a NodePort service.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
                  <h3 className="mb-2 font-semibold text-white">Infrastructure as Code</h3>
                  <p className="text-sm leading-7 text-zinc-300">
                    Wrote Ansible playbooks to apply Kubernetes manifests and verify pod status, removing manual steps and improving repeatability.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Education</p>
            <div className="space-y-3 text-zinc-300">
              <p className="text-xl font-semibold text-white">Master of Computer Science (MCS)</p>
              <p>Virtual University of Pakistan</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Contact us</p>
            <div className="space-y-3 text-zinc-300">
              <p><span className="font-semibold text-white">Email:</span> mabbas786official@gmail.com</p>
              <p><span className="font-semibold text-white">Phone:</span> +92 345-0715686</p>
              <p><span className="font-semibold text-white">Location:</span> Mardan, Pakistan</p>
              <p><span className="font-semibold text-white">GitHub:</span> github.com/MuhammadAbbasOfficial</p>
              <a
                href="https://wa.me/923450715686"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-white transition hover:bg-emerald-400"
              >
                WhatsApp: +92 345-0715686
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
