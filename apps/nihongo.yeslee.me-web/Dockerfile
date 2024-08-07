FROM node:20-slim
WORKDIR /app/
COPY package.json pnpm-lock.yaml* ./
RUN apt-get update && apt-get install -y ca-certificates
RUN npm install -g pnpm pm2
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 8077
CMD ["pm2-runtime", "start", "pnpm", "--name", "yeslee.me", "--", "start"]
