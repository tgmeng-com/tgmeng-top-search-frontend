#!/bin/sh

set -e

echo "================================================"
echo "🚀 Custom Entrypoint Starting"
echo "================================================"

# 设置默认值
API_BASE_URL=${VUE_APP_API_BASE_URL:-"http://default.api.url"}

echo "📝 Environment Variables:"
echo "  VUE_APP_API_BASE_URL: $API_BASE_URL"

# 检查并替换 config.js
if [ -f /usr/share/nginx/html/config.js ]; then
    echo ""
    echo "📄 Original config.js:"
    cat /usr/share/nginx/html/config.js

    # 替换占位符
    sed -i "s|VUE_APP_API_BASE_URL_PLACEHOLDER|$API_BASE_URL|g" /usr/share/nginx/html/config.js
    sed -i "s|VUE_APP_UMAMI_BASE_URL_PLACEHOLDER|$UMAMI_BASE_URL|g" /usr/share/nginx/html/config.js
    sed -i "s|VUE_APP_UMAMI_AUTH_PLACEHOLDER|$UMAMI_AUTH|g" /usr/share/nginx/html/config.js

    echo ""
    echo "✅ Updated config.js:"
    cat /usr/share/nginx/html/config.js
else
    echo "❌ Warning: config.js not found!"
    echo "📁 Files in /usr/share/nginx/html:"
    ls -la /usr/share/nginx/html/ | head -20
fi

echo "================================================"
echo "🚀 Starting Nginx"
echo "================================================"

# 执行 Nginx 官方的初始化脚本
if [ -d /docker-entrypoint.d ]; then
    echo "Running Nginx init scripts..."
    for f in /docker-entrypoint.d/*.sh; do
        if [ -x "$f" ]; then
            echo "Executing $f"
            "$f" || true
        fi
    done
fi

# 启动 Nginx
exec nginx -g 'daemon off;'