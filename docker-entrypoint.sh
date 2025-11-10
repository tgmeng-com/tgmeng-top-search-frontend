#!/bin/sh
# 用容器环境变量替换打包文件中的占位符
if [ -n "$VUE_APP_API_BASE_URL" ]; then
  find /usr/share/nginx/html/js -name '*.js' -exec sed -i "s|process.env.VUE_APP_API_BASE_URL|\"$VUE_APP_API_BASE_URL\"|g" {} +
fi
exec "$@"