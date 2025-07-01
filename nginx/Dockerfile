FROM nginx:1.27-alpine

# デフォルトのNginx設定ファイルを削除
RUN rm /etc/nginx/conf.d/default.conf

# カスタム設定ファイルをコンテナにコピー
COPY nginx.conf /etc/nginx/conf.d/