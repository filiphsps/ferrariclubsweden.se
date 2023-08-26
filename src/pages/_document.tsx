/* eslint-disable @next/next/no-css-tags */
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

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
                </body>
            </Html>
        );
    }
}

export default Document;
