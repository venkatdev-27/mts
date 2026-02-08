# -------- Build stage --------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY . .

# Compile TypeScript -> JavaScript
RUN npm run build

# -------- Production stage --------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Copy ONLY compiled output
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "dist/server.js"]
