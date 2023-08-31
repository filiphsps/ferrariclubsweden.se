import 'destyle.css';
import '@/style/base.css';
import '@/style/scrollbar.css';

import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo';
import Router, { useRouter } from 'next/router';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

import Head from 'next/head';
import NProgress from 'nprogress';
import { PageProvider } from '@/components/PageProvider';
import { Poppins } from 'next/font/google';
import SEO from 'nextseo.config';
import { SessionProvider } from 'next-auth/react';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', (error) => {
    console.error(error);
    NProgress.done();
});

const secondaryFont = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    preload: true
});

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    const router = useRouter();

    return (
        <>
            <style jsx global>{`
                body {
                    font-family: ${secondaryFont.style.fontFamily}, sans-serif;
                    --font-secondary: ${secondaryFont.style.fontFamily}, sans-serif;
                }
            `}</style>

            <DefaultSeo {...SEO} themeColor="#cc0003" />
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="Ferrari Club Sweden" />
                <link rel="apple-touch-icon" href="/favicon.png" />
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            </Head>

            <SocialProfileJsonLd
                type="Organization"
                name="Ferrari Club Sweden"
                description="Vi är Skandinaviens största officiella märkesklubb för Ferrari med idag 400 medlemmar. Målsättningen med verksamheten är att Ferrariägare skall träffas och ha kul under trevliga former."
                url="https://www.ferrariclubsweden.se/"
                logo="https://www.ferrariclubsweden.se/favicon.png"
                foundingDate="1972"
                address={{
                    '@type': 'PostalAddress',
                    streetAddress: 'Gåskullevägen 6',
                    addressLocality: 'Surte',
                    addressRegion: 'Västra Götaland',
                    postalCode: '4452',
                    addressCountry: 'Sweden'
                }}
                sameAs={[
                    'https://www.instagram.com/ferrariclubsweden/',
                    'https://www.facebook.com/groups/113734385349817/'
                ]}
            />

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

export function reportWebVitals({ id, name, value, label }: NextWebVitalsMetric) {
    if (process.env.NODE_ENV !== 'production') return;

    (window as any)?.dataLayer?.push({
        event: 'web-vital',
        event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
        event_action: name,
        // Google Analytics metrics must be integers, so the value is rounded.
        // For CLS the value is first multiplied by 1000 for greater precision
        // (note: increase the multiplier for greater precision if needed).
        event_value: Math.round(name === 'CLS' ? value * 1000 : value),
        // The 'id' value will be unique to the current page load. When sending
        // multiple values from the same page (e.g. for CLS), Google Analytics can
        // compute a total by grouping on this ID (note: requires `eventLabel` to
        // be a dimension in your report).
        event_label: id
    });
}

export default App;
