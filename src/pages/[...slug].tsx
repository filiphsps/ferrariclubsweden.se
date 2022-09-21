import { GetStaticPaths, GetStaticProps } from 'next';

import ErrorPage from 'next/error';
import { FunctionComponent } from 'react';
import { NextSeo } from 'next-seo';
import { Page } from '../components/Page';
import { PageApi } from '../api/page';
import styled from 'styled-components';

interface CustomPageProps {
    data: any; // FIXME: PageModel
}
const CustomPage: FunctionComponent<CustomPageProps> = ({ data }) => {
    if (!data) return <ErrorPage statusCode={404} />;

    const { title } = data;

    return (
        <Page>
            <NextSeo title={title} />
            <h2>TODO</h2>
        </Page>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // FIXME: Get paths
    return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const slug = params!.slug as string[];

    const page = await PageApi({
        uri: `/${slug.join('/')}/`
    });

    return {
        props: {
            data: page
        },
        revalidate: 10
    };
};

export default CustomPage;
