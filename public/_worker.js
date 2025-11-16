// 用来动态生成sitemap.xml,,然后函数会在cloudflare里面运行
export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // 提到 fetch 函数体最外层
        function getLastMod(freq) {
            const now = new Date();
            const year = now.getUTCFullYear();
            const month = String(now.getUTCMonth() + 1).padStart(2, "0");
            const day = String(now.getUTCDate()).padStart(2, "0");
            const hour = String(now.getUTCHours()).padStart(2, "0");
            const minute = String(now.getUTCMinutes()).padStart(2, "0");

            switch(freq) {
                case "minute":
                    return `${year}-${month}-${day}T${hour}:${minute}:00Z`;
                case "hourly":
                    return `${year}-${month}-${day}T${hour}:00:00Z`;
                case "weekly":
                case "monthly":
                default:
                    return `${year}-${month}-${day}T00:00:00Z`;
            }
        }

        if (url.pathname === "/sitemap.xml") {
            const domains = ["tgmeng.com", "www.tgmeng.com", "trend.tgmeng.com"];
            const paths = [
                { path: "/", changefreq: "minute", priority: 1.0 },
                // { path: "/hot", changefreq: "minute", priority: 0.9 },
                // { path: "/news", changefreq: "hourly", priority: 0.8 },
                // { path: "/about", changefreq: "weekly", priority: 0.5 },
                // { path: "/contact", changefreq: "monthly", priority: 0.4 }
            ];

            const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => domains.map(d => `  <url>
    <loc>https://${d}${p.path}</loc>
    <lastmod>${getLastMod(p.changefreq)}</lastmod>
    <changefreq>${p.changefreq === "minute" ? "always" : p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")).join("\n")}
</urlset>`;

            return new Response(xml, {
                headers: {
                    "content-type": "application/xml",
                    "cache-control": "no-cache"
                }
            });
        }

        return env.ASSETS.fetch(request);
    }
};
