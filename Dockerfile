# 1. Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

WORKDIR /app

# Copy files
#COPY pnpm-workspace.yaml ./
#COPY package.json pnpm-lock.yaml ./

# Copy all files
COPY . .
RUN pnpm install

# 
#ARG NODE_ENV
#ENV NODE_ENV=$NODE_ENV

#ARG NEXTAUTH_SECRET
#ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

#ARG NEXT_PUBLIC_API_URL
#ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

#ARG AUTH_TRUST_HOST
#ENV AUTH_TRUST_HOST=$AUTH_TRUST_HOST

# Build
RUN pnpm build

# 2. Production stage
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

WORKDIR /app

COPY --from=builder /app/ .

#ENV NODE_ENV=local

#COPY --from=builder /app .
# Copy files to Production image
#COPY --from=builder /app/apps/quest4Kids/.next ./.next
#COPY --from=builder /app/apps/quest4Kids/public ./public
#COPY --from=builder /app/apps/quest4Kids/package.json ./package.json
#COPY --from=builder /app/node_modules ./node_modules

#ENV AUTH_TRUST_HOST="http://localhost:3000"
#ENV NEXTAUTH_SECRET="changeme"
#ENV NEXT_PUBLIC_API_URL="http://localhost:4000"


EXPOSE 3000

CMD ["pnpm", "start"]

