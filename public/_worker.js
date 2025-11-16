// 自定义 Worker 脚本, 用于生成 sitemap.xml
export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // 动态生成 sitemap.xml
        if (url.pathname === "/sitemap.xml") {
            const latest = new Date().toISOString().split("T")[0];

            const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tgmeng.com/</loc>
    <lastmod>${latest}</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

            return new Response(xml, {
                headers: {
                    "content-type": "application/xml",
                    "cache-control": "no-cache"
                }
            });
        }

        // 其他资源正常处理
        return env.ASSETS.fetch(request);
    }
};
