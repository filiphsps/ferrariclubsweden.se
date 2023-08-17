import Document, { Head, Html, Main, NextScript } from 'next/document';

import { ServerStyleSheet } from 'styled-components';

class App extends Document {
    static async getInitialProps(ctx: any) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App: any) => (props: any) =>
                        sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            } as any;
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=PT+Sans&family=Poppins:wght@400;500;600&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel="stylesheet"
                        id="mec-font-icons-css"
                        href="https://api.ferrariclubsweden.se/wordpress2016/wp-content/plugins/modern-events-calendar/assets/css/iconfonts.css?ver=6.2.1"
                        type="text/css"
                        media="all"
                    />
                    <link
                        rel="stylesheet"
                        id="mec-frontend-style-css"
                        href="https://api.ferrariclubsweden.se/wordpress2016/wp-content/plugins/modern-events-calendar/assets/css/frontend.min.css?ver=6.2.1"
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

export default App;
