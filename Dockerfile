# 1. Build stage
FROM node:20-alpine AS builder
ARG OPENAI_API_KEY

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

WORKDIR /app

# Copy files
#COPY pnpm-workspace.yaml ./
#COPY package.json pnpm-lock.yaml ./

# Copy all files
COPY . .
RUN pnpm install

# Build
RUN pnpm build

# 2. Production stage
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

WORKDIR /app

COPY --from=builder /app/ .

#COPY --from=builder /app .
# Copy files to Production image
#COPY --from=builder /app/apps/quest4Kids/.next ./.next
#COPY --from=builder /app/apps/quest4Kids/public ./public
#COPY --from=builder /app/apps/quest4Kids/package.json ./package.json
#COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"]

