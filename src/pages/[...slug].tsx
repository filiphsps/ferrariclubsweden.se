import { GetStaticPaths, GetStaticProps } from 'next';

import ErrorPage from 'next/error';
import { FunctionComponent } from 'react';
import { NextSeo } from 'next-seo';
import { Page } from '../components/Page';
import { PageApi } from '../api/page';
import { Title } from '../components/Title';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
`;

interface CustomPageProps {
    data: any; // FIXME: PageModel
}
const CustomPage: FunctionComponent<CustomPageProps> = ({ data }) => {
    if (!data) return <ErrorPage statusCode={404} />;

    const { title } = data;

    return (
        <Page>
            <NextSeo title={title} />

            <Container>
                <Title>{title}</Title>
                <h2>wordpress content here</h2>
            </Container>
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
