import 'destyle.css';
import '@/style/base.css';
import '@/style/scrollbar.css';

import Router, { useRouter } from 'next/router';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import NProgress from 'nprogress';
import { PageProvider } from '@/components/PageProvider';
import SEO from 'nextseo.config';
import { SessionProvider } from 'next-auth/react';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', (error) => {
    console.error(error);
    NProgress.done();
});

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    const router = useRouter();

    return (
        <>
            <DefaultSeo {...SEO} />
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <link rel="icon" type="image/png" href="/img/logo.png" />
            </Head>

            <SessionProvider session={session}>
                <StyleSheetManager enableVendorPrefixes>
                    <ThemeProvider theme={{}}>
                        <PageProvider>
                            <Component key={router.asPath} {...pageProps} />
                        </PageProvider>
                    </ThemeProvider>
                </StyleSheetManager>
            </SessionProvider>
        </>
    );
};

export default App;
