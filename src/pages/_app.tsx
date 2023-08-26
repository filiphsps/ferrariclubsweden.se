import 'destyle.css';
import '../style/base.css';

import { AuthenticationError, AuthorizationError } from 'blitz';
import { ErrorBoundary, ErrorComponent, ErrorFallbackProps } from '@blitzjs/next';
import Router, { useRouter } from 'next/router';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import Client from '@/api/client';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import NProgress from 'nprogress';
import { PageProvider } from '@/components/PageProvider';
import SEO from 'nextseo.config';
import { SWRConfig } from 'swr';
import { withBlitz } from '@/blitz/client';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', (err) => {
    console.error(err);
    NProgress.done();
});

const RootErrorFallback = ({ error }: ErrorFallbackProps) => {
    if (error instanceof AuthenticationError) {
        return <div>Error: You are not authenticated</div>;
    } else if (error instanceof AuthorizationError) {
        return <ErrorComponent statusCode={error.statusCode} title="Sorry, you are not authorized to access this" />;
    } else {
        return <ErrorComponent statusCode={(error as any)?.statusCode || 400} title={error.message || error.name} />;
    }
};

const App = ({ Component, pageProps }: AppProps) => {
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

            <SWRConfig>
                <ApolloProvider client={Client}>
                    <PageProvider>
                        <ErrorBoundary FallbackComponent={RootErrorFallback}>
                            <Component key={router.asPath} {...pageProps} />
                        </ErrorBoundary>
                    </PageProvider>
                </ApolloProvider>
            </SWRConfig>
        </>
    );
};

export default withBlitz(App);
