// 用来动态生成sitemap.xml,,然后函数会在cloudflare里面运行
import generateSitemap from "./worker/_worker_sitemap.js";
import generateRSS from "./worker/_worker_rss.js";
export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname === "/sitemap.xml") {
            const xml = generateSitemap();
            return new Response(xml, {
                headers: {
                    "content-type": "application/xml",
                    "cache-control": "no-cache"
                }
            });
        }
        if (url.pathname.endsWith("/rss.xml")) {
            let key = url.pathname.slice(0, -"/rss.xml".length);
            if (key === "") key = "/";
            return generateRSS(key).then(xml => {
                return new Response(xml, {
                    headers: {
                        "content-type": "application/xml",
                        "cache-control": "no-cache"
                    }
                });
            });
        }
        return env.ASSETS.fetch(request);
    }
};
