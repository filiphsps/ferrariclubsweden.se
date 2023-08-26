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
                source: '/login/',
                destination: '/members/login/',
                permanent: false
            },
            {
                source: '/logga-ut/',
                destination: '/members/logout/',
                permanent: false
            },
            {
                source: '/medlemsskap/',
                destination: '/members/register/',
                permanent: false
            },
            {
                source: '/medlemmar',
                destination: '/',
                permanent: false
            }
        ];
    },
    async rewrites() {
        return [
            {
                source: '/fonm/',
                destination: 'https://api.ferrariclubsweden.se/fonm'
            },
            {
                source: '/wordpress2016/:any*',
                destination: 'https://api.ferrariclubsweden.se/:any*'
            }
        ];
    }
});
