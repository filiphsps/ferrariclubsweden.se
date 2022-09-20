import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import SEO from '../../nextseo.config';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    return (
        <>
            <DefaultSeo
                {...SEO}
                twitter={{
                    cardType: 'summary_large_image',
                    handle: '@candybysweden',
                    site: '@candybysweden'
                }}
            />
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, user-scalable=no"
                />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
            </Head>

            <Component key={router.asPath} {...pageProps} />
        </>
    );
};

export default appWithTranslation(App);
