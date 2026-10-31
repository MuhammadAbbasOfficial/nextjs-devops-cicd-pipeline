FROM node:20-alpine AS base

# 1. Dependencies stage
FROM base AS deps
# sharp aur alpine compatibility ke liye
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Sirf package files copy karein taake caching fast ho
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Builder stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry disable karein (optional)
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# 3. Runner stage (Yeh final image hogi)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Security: Non-root user banayein
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Public folder copy karein
COPY --from=builder /app/public ./public

# Standalone folder aur static files copy karein
# Standalone mode mein server.js khud-ba-khud ban jata hai
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Node server chalayein
CMD ["node", "server.js"]