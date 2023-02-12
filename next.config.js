const child_process = require('child_process');
const manifest = require('./package.json');
const { i18n } = require('./next-i18next.config');

const git_sha = child_process.execSync('git rev-parse HEAD', {
    cwd: __dirname,
    encoding: 'utf8'
}).replace(/\n/, '');

module.exports = {
    poweredByHeader: false,
    reactStrictMode: true,
    trailingSlash: true,
    swcMinify: true,
    //largePageDataBytes: 256 * 1000,
    i18n,

    images: {
        domains: [
            "www.ferrariclubsweden.se"
        ],
    },
    compiler: {
        styledComponents: true,
    },
    env: {
        GIT_SHA: git_sha,
        VERSION: manifest.version
    },
    async redirects() {
        return [
            {
                source: '/login/',
                destination: '/members/login/',
                permanent: false,
            },
            {
                source: '/logga-ut/',
                destination: '/members/logout/',
                permanent: false,
            },
        ]
    },

    generateBuildId: async () => {
        return git_sha;
    },
};
