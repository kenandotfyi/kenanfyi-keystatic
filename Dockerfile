FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ENV PUBLIC_ENABLE_CMS=true
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
ENV HOST=0.0.0.0
ENV PORT=3000
ENV PUBLIC_ENABLE_CMS=true
EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]
