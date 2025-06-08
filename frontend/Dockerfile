FROM node:20.10

# package.jsonとlockファイルを先にコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# プロジェクトファイルをコピー
COPY . .

# ポートを開放
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]