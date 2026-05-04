# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat

# Install + build dans le même stage (pas de COPY node_modules entre stages).
FROM base AS builder
WORKDIR /app
COPY package.json yarn.lock ./
ENV YARN_NETWORK_TIMEOUT=600000
RUN --mount=type=cache,id=yarn-api,target=/root/.cache/yarn \
    yarn install --frozen-lockfile --network-timeout 600000

COPY prisma ./prisma
COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN yarn prisma generate && yarn build

# Image finale : pas de COPY du node_modules du builder (souvent >500 Mo, I/O fragile).
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=4000

RUN addgroup --system --gid 1001 nestjs \
    && adduser --system --uid 1001 nestjs

COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY --from=builder /app/dist ./dist

ENV YARN_NETWORK_TIMEOUT=600000
RUN --mount=type=cache,id=yarn-api-prod,target=/root/.cache/yarn \
    yarn install --frozen-lockfile --production --network-timeout 600000 \
    && npx prisma generate

USER nestjs
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
