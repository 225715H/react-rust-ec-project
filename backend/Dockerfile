# ==================================
# 1. ビルダーステージ (Builder Stage)
# ==================================
# Rustのビルドツールチェーンとsqlx-cliをインストール
FROM rust:1.88.0 AS builder

# sqlx-cliのインストール
RUN cargo install sqlx-cli

WORKDIR /usr/src/app/backend

# 依存関係のキャッシュ
COPY Cargo.toml Cargo.lock ./

RUN mkdir src && \
    echo "fn main() {}" > src/main.rs && \
    cargo build --release && \
    rm -rf src

# ソースコードをコピーしてビルド
COPY . .
RUN cargo build --release

# ==================================
# 2. 本番ステージ (Production Stage)
# ==================================
# 軽量なDebianイメージをベースにする
FROM debian:bookworm-slim AS final

# SSL証明書など、実行に必要なライブラリをインストール
RUN apt-get update && apt-get install -y libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app/backend

# ビルダーステージからビルドされたバイナリをコピー
COPY --from=builder /usr/src/app/backend/target/release/backend /usr/local/bin/

# ビルダーステージからsqlx-cliをコピー
COPY --from=builder /usr/local/cargo/bin/sqlx /usr/local/bin/

# マイグレーションファイルと起動スクリプトをコピー
COPY migrations ./migrations
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# ポートを開放
EXPOSE 8000

# entrypoint.sh を実行し、ビルド済みバイナリを起動
ENTRYPOINT ["./entrypoint.sh"]
CMD ["backend"]