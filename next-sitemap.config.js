/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    changefreq: 'weekly',
    priority: 0.7,
    exclude: [
        '/studio/*',
        '/api/*',
        '/404',
        '/500',
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/studio/', '/api/'],
            },
        ],
        additionalSitemaps: [],
    },
    // Transform function to customize each URL
    transform: async (config, path) => {
        // Give homepage highest priority
        if (path === '/') {
            return {
                loc: path,
                changefreq: 'daily',
                priority: 1.0,
                lastmod: new Date().toISOString(),
            };
        }

        // Give project pages high priority
        if (path.startsWith('/projects/')) {
            return {
                loc: path,
                changefreq: 'weekly',
                priority: 0.8,
                lastmod: new Date().toISOString(),
            };
        }

        // Default transformation
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: new Date().toISOString(),
        };
    },
};
