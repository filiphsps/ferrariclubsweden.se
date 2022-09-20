import { FunctionComponent } from 'react';
import { NextSeo } from 'next-seo';

interface IndexPageProps {}
const IndexPage: FunctionComponent<IndexPageProps> = () => {
    return (
        <>
            <NextSeo title="Hem" />
            <h1>Hello world!</h1>
        </>
    );
};

export default IndexPage;
