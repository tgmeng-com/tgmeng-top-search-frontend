# 阶段 1：构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 阶段 2：运行
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

COPY custom-entrypoint.sh /custom-entrypoint.sh
RUN chmod +x /custom-entrypoint.sh

# 设置默认的环境变量（设置默认值，通过docker run -e 来替换）
ENV VUE_APP_API_BASE_URL=http://127.0.0.1:4399/api/
ENV VUE_APP_UMAMI_BASE_URL=https://umami.test.com/
ENV VUE_APP_UMAMI_AUTH=BearerDefaultAuthToken

EXPOSE 80
# 使用自定义入口脚本
ENTRYPOINT ["/custom-entrypoint.sh"]
