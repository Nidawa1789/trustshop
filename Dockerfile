# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
# Yarn est déjà dans node:20-alpine ; ne pas `npm i -g yarn` (EEXIST sur /usr/local/bin/yarn).
RUN apk add --no-cache libc6-compat

# Un seul stage install + build : évite COPY énorme deps→builder (copy_file_range / I/O Docker Desktop).
FROM base AS builder
WORKDIR /app
COPY package.json yarn.lock ./
ENV YARN_NETWORK_TIMEOUT=600000
RUN --mount=type=cache,id=yarn-web,target=/root/.cache/yarn \
    yarn install --frozen-lockfile --network-timeout 600000

COPY . .

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY

ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY \
    CLERK_SECRET_KEY=$CLERK_SECRET_KEY

RUN yarn build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
