const startTime = Date.now();

export function GET() {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;
  const uptime = `${hours}h ${minutes}m ${seconds}s`;

  return Response.json({
    buildNumber: process.env.APP_BUILD ?? "local",
    gitSha: process.env.GIT_SHA ?? "dev",
    version: "1.0.0",
    uptime,
    podName: process.env.HOSTNAME ?? "localhost",
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
