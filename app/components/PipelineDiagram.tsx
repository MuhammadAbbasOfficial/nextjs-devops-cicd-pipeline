const steps = [
  {
    id: "github",
    label: "GitHub",
    sublabel: "Source Code",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: "from-zinc-600 to-zinc-700",
    border: "border-zinc-600",
    text: "text-zinc-300",
  },
  {
    id: "jenkins",
    label: "Jenkins",
    sublabel: "CI/CD Build",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-11h2v6h-2zm0-4h2v2h-2z" />
      </svg>
    ),
    color: "from-amber-600 to-orange-600",
    border: "border-amber-600",
    text: "text-amber-300",
  },
  {
    id: "docker",
    label: "Docker Hub",
    sublabel: "Container Registry",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.887c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" />
      </svg>
    ),
    color: "from-blue-600 to-cyan-600",
    border: "border-blue-500",
    text: "text-blue-300",
  },
  {
    id: "ansible",
    label: "Ansible",
    sublabel: "Deploy Playbook",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.36 14.148l2.484-5.93L16.31 14l-4.077-.756.406-.756L14.79 13l-1.92-4.572-2.994 7.14-1.092-.456L12 6.708l4.38 10.452L12 18l-4.38-10.452" />
      </svg>
    ),
    color: "from-red-700 to-red-600",
    border: "border-red-600",
    text: "text-red-300",
  },
  {
    id: "k3s",
    label: "K3s",
    sublabel: "Kubernetes Cluster",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 01-2.075-2.597l2.578-.437.49.611zm-.843-5.05l-2.567-.447A5.22 5.22 0 018.87 6.68l.974 2.43-.483.19zm3.145.282l.518-.217.517.217V9.8l-.517.218-.518-.217V9.582zM11.83 8.64l-1.01-2.52a5.3 5.3 0 012.014.007L11.83 8.64zm-.79 5.51l-1.007 2.43a5.171 5.171 0 002.008 0l-1.001-2.43zm2.17-.407l-.49.61 2.576.436a5.23 5.23 0 01-2.085 2.6l-.001-.003-1-2.414.999-1.228zm.65-4.64l.97-2.42a5.18 5.18 0 011.864 2.134l-2.568.447-.266-.162zM12.01 6.44a5.48 5.48 0 100 10.96 5.48 5.48 0 000-10.96zm0-1.22A6.7 6.7 0 1118.71 12a6.7 6.7 0 01-6.7-6.78zM12 0a12 12 0 100 24A12 12 0 0012 0z" />
      </svg>
    ),
    color: "from-violet-600 to-purple-600",
    border: "border-violet-500",
    text: "text-violet-300",
  },
];

export default function PipelineDiagram() {
  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">CI/CD Pipeline Flow</h3>
        <span className="text-xs text-zinc-500">Push → Deploy</span>
      </div>

      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-center justify-between gap-1">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-1 flex-1">
            <div className="flex flex-col items-center flex-1 group">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} border ${step.border} shadow-lg group-hover:scale-110 transition-transform duration-200 ${step.text}`}
              >
                {step.icon}
              </div>
              <span className="mt-2 text-xs font-semibold text-white">{step.label}</span>
              <span className="text-[10px] text-zinc-500 text-center">{step.sublabel}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex items-center gap-0.5 pb-8">
                <div className="h-px w-4 bg-gradient-to-r from-zinc-700 to-zinc-600" />
                <svg className="h-3 w-3 text-zinc-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="flex sm:hidden flex-col gap-2">
        {steps.map((step, index) => (
          <div key={step.id}>
            <div className={`flex items-center gap-3 rounded-xl border ${step.border}/30 bg-gradient-to-r ${step.color}/10 p-3`}>
              <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${step.color} border ${step.border} ${step.text}`}>
                {step.icon}
              </div>
              <div>
                <span className="text-sm font-semibold text-white">{step.label}</span>
                <span className="ml-2 text-xs text-zinc-500">{step.sublabel}</span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex items-center justify-center h-5">
                <svg className="h-4 w-4 text-zinc-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
