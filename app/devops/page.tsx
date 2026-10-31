export default function DevOpsPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #1d4ed8 0%, #0f172a 42%, #020817 100%)',
        color: '#e2e8f0',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}
    >
      <section
        style={{
          maxWidth: '1100px',
          width: '100%',
          background: 'rgba(15, 23, 42, 0.78)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '28px',
          boxShadow: '0 24px 70px rgba(15, 23, 42, 0.6)',
          padding: '48px 32px',
        }}
      >
        <p
          style={{
            margin: 0,
            color: '#67e8f9',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontSize: '12px',
            fontWeight: 700,
          }}
        >
          About Me
        </p>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 1.1,
            margin: '18px 0 20px',
            color: '#f8fafc',
          }}
        >
          I am Abbas, and I am deeply interested in DevOps.
        </h1>

        <p
          style={{
            fontSize: '1.12rem',
            lineHeight: 1.9,
            color: '#cbd5e1',
            margin: '0 0 28px',
          }}
        >
          I am a person who enjoys learning how technology works in real-world environments, especially
          when it helps teams deliver software faster, safer, and more reliably. My interest in DevOps
          comes from the fact that it connects development and operations, making the whole process more
          efficient and automated. I like understanding how code moves from development to production,
          how systems remain stable, and how automation improves both speed and quality.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '18px',
            marginBottom: '28px',
          }}
        >
          {[
            'CI/CD Pipelines',
            'Docker & Containers',
            'Kubernetes',
            'Cloud Platforms',
            'Infrastructure as Code',
            'Monitoring & Automation',
          ].map((skill) => (
            <div
              key={skill}
              style={{
                background: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(148, 163, 184, 0.18)',
                borderRadius: '16px',
                padding: '18px 16px',
                fontWeight: 700,
                textAlign: 'center',
                color: '#f8fafc',
              }}
            >
              {skill}
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: '1.08rem',
            lineHeight: 1.9,
            color: '#dbeafe',
            margin: 0,
          }}
        >
          My goal is to keep building strong skills in DevOps by learning automation, Linux, cloud
          infrastructure, containerization, deployment strategies, and monitoring tools. I am motivated by
          the idea of creating systems that are scalable, reliable, and efficient. For me, DevOps is not only
          about tools and technology, but also about teamwork, continuous improvement, and making software
          delivery smoother for everyone.
        </p>
      </section>
    </main>
  );
}
