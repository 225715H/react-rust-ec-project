FROM rust:1.87

# cargo-watchをインストールしてホットリロードを可能にする
RUN cargo install cargo-watch

# 依存関係を先にコピーしてキャッシュを効かせる
COPY Cargo.toml Cargo.lock ./
# ダミーのmain.rsを作成して依存関係のみをビルド
RUN mkdir src && echo "fn main() {}" > src/main.rs && cargo build --release && rm -rf src

# アプリケーションのソースコードをコピー
COPY src ./src

# ポートを開放
EXPOSE 8000

# cargo-watchでサーバーを起動
CMD ["cargo", "watch", "-x", "run"]