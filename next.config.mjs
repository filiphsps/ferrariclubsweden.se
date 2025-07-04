import manifest from './package.json' assert { type: 'json' };

/** @type {import('next').NextConfig} */
const config = {
    poweredByHeader: false,
    reactStrictMode: true,
    trailingSlash: true,
    swcMinify: true,
    productionBrowserSourceMaps: false,
    compress: true,
    experimental: {
        esmExternals: true,
        optimizePackageImports: [
            '@apollo/client',
            'cheerio',
            'react-icons',
        ],
        scrollRestoration: true,
    },
    images: {
        minimumCacheTTL: 60 * 6,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.ferrariclubsweden.se'
            },
            {
                protocol: 'https',
                hostname: '**.gravatar.com'
            },
            {
                protocol: 'https',
                hostname: '**.github.io'
            }
        ],
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [650, 900, 1280, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
    },
    compiler: {
        styledComponents: true,
        ...((process.env.NODE_ENV === 'production' && {
            removeConsole: {
                exclude: ['warn', 'error']
            }
        }) ||
            {})
    },
    eslint: {
        ignoreDuringBuilds: true
    },

    env: {
        DOMAIN: process.env.DOMAIN || 'www.ferrariclubsweden.se',
        VERSION: manifest.version
    },
    serverRuntimeConfig: {},

    async redirects() {
        return [
            {
                source: '/login',
                destination: '/members/login/',
                permanent: true
            },
            {
                source: '/logga-ut',
                destination: '/members/logout/',
                permanent: true
            },
            {
                source: '/bli-medlem',
                destination: '/members/register/',
                permanent: true
            },
            {
                source: '/medlemsskap',
                destination: '/members/register/',
                permanent: true
            },
            {
                source: '/medlemmar',
                destination: '/members/',
                permanent: true
            },
            {
                source: '/events/:event*',
                destination: '/calendar/events/:event*/',
                permanent: true
            },
            {
                source: '/kalender',
                destination: '/calendar/',
                permanent: true
            },
            {
                source: '/nyheter',
                destination: '/news/',
                permanent: true
            },
            {
                source: '/fonm',
                destination: '/wp/fonm/',
                permanent: false
            },

            // Last, any left-over stray WordPress URLs
            // and weird edge cases.
            {
                source: '/wordpress2016/wp-content/:any*',
                destination: '/wp/wp-content/:any*',
                permanent: true
            },
            {
                source: '/wordpress2016/:any*',
                destination: '/wp/:any*',
                permanent: true
            }
        ];
    },
    async rewrites() {
        return {
            /*fallback: [
                {
                    source: '/:any*',
                    destination: `https://api.ferrariclubsweden.se/:any* /`
                }
            ],*/
            afterFiles: [
                {
                    source: '/wp/wp-content/:any*',
                    destination: 'https://api.ferrariclubsweden.se/wp-content/:any*'
                },
                {
                    source: '/wp/:any*',
                    destination: 'https://api.ferrariclubsweden.se/:any*/'
                },
                {
                    source: '/admin/:any*',
                    destination: 'https://api.ferrariclubsweden.se/wp-admin/:any*/'
                }
            ]
        };
    },

    pageExtensions: ['ts', 'tsx']
};

export default config;
