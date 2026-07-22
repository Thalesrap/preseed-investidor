FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@10.26.1 --activate

WORKDIR /app

COPY . .

RUN pnpm install --no-frozen-lockfile

RUN pnpm --filter @workspace/api-server run build

EXPOSE 8080

ENV NODE_ENV=production

CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
