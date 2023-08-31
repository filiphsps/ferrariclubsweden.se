/* eslint-disable @next/next/no-css-tags */
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

import { Config } from '@/utils/config';
import Script from 'next/script';
import { ServerStyleSheet } from 'styled-components';

class Document extends NextDocument {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await NextDocument.getInitialProps(ctx);
            const styles = [initialProps.styles, sheet.getStyleElement()];

            return {
                ...initialProps,
                styles: styles
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://api.ferrariclubsweden.se" crossOrigin="" />
                    <link rel="preconnect" href="https://www.gravatar.com" crossOrigin="" />

                    <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />

                    <link
                        rel="stylesheet"
                        id="mec-font-icons-css"
                        href="/wp/wp-content/plugins/modern-events-calendar/assets/css/iconfonts.css?ver=6.2.1"
                        type="text/css"
                        media="all"
                    />
                    <link
                        rel="stylesheet"
                        id="mec-frontend-style-css"
                        href="/wp/wp-content/plugins/modern-events-calendar/assets/css/frontend.min.css?ver=6.2.1"
                        type="text/css"
                        media="all"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />

                    {Config.GTM && process.env.NODE_ENV !== 'development' && (
                        <Script id="gtm" strategy="afterInteractive">
                            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','${Config.GTM}');`}
                        </Script>
                    )}
                </body>
            </Html>
        );
    }
}

export default Document;
