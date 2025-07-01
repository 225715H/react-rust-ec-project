# ==================================
# ビルダーステージ (Builder Stage)
# ==================================
FROM node:20.10-alpine AS builder

WORKDIR /app

COPY package*.json ./
# 本番環境では開発用の依存関係は不要
RUN npm ci --only=production

COPY . .
RUN npm run build