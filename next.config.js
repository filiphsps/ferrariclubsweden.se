const manifest = require('./package.json');
const { withBlitz } = require('@blitzjs/next');

module.exports = withBlitz({
    poweredByHeader: false,
    reactStrictMode: true,
    trailingSlash: true,
    swcMinify: true,

    images: {
        domains: ['www.ferrariclubsweden.se', 'api.ferrariclubsweden.se']
    },
    compiler: {
        styledComponents: true
    },
    env: {
        VERSION: manifest.version
    },
    async redirects() {
        return [
            {
                source: '/login',
                destination: '/members/login/',
                permanent: false
            },
            {
                source: '/logga-ut',
                destination: '/members/logout/',
                permanent: false
            },
            {
                source: '/medlemsskap',
                destination: '/members/register/',
                permanent: false
            },
            {
                source: '/medlemmar',
                destination: '/',
                permanent: false
            },
            {
                source: '/events/:event*',
                destination: '/calendar/events/:event*/',
                permanent: true
            },
            {
                source: '/kalender',
                destination: '/calendar/',
                permanent: false
            },
            {
                source: '/fonm',
                destination: '/api/fonm/',
                permanent: false
            },

            // Last, any left-over stray WordPress URLs
            // and weird edge cases.
            {
                source: '/wordpress2016/wp-content/:any*',
                destination: '/api/wp-content/:any*',
                permanent: true
            },
            {
                source: '/wordpress2016/:any*',
                destination: '/api/:any*',
                permanent: true
            }
        ];
    },
    async rewrites() {
        return {
            fallback: [
                {
                    source: '/:any*',
                    destination: `https://api.ferrariclubsweden.se/:any*/`
                }
            ],
            afterFiles: [
                {
                    source: '/api/wp-content/:any*',
                    destination: 'https://api.ferrariclubsweden.se/wp-content/:any*'
                },
                {
                    source: '/api/:any*',
                    destination: 'https://api.ferrariclubsweden.se/:any*/'
                },
                {
                    source: '/admin/:any*',
                    destination: 'https://api.ferrariclubsweden.se/wp-admin/:any*/'
                }
            ]
        };
    }
});
