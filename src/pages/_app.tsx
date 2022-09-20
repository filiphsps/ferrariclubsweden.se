import 'destyle.css';
import '../style/base.css';

import Router, { useRouter } from 'next/router';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import NProgress from 'nprogress';
import { PageProvider } from '../components/PageProvider';
import SEO from '../../nextseo.config';
import { appWithTranslation } from 'next-i18next';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', (err) => {
    console.error(err);
    NProgress.done();
});

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    return (
        <>
            <DefaultSeo {...SEO} />
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

            <PageProvider>
                <Component key={router.asPath} {...pageProps} />
            </PageProvider>
        </>
    );
};

export default appWithTranslation(App);
