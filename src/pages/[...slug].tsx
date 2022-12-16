import { GetStaticPaths, GetStaticProps } from 'next';

import ErrorPage from 'next/error';
import { FunctionComponent } from 'react';
import { MuffinComponents } from '../components/MuffinComponents';
import { NextSeo } from 'next-seo';
import { Page } from '../components/Page';
import { PageApi } from '../api/page';
import { Title } from '../components/Title';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: 58rem;

    margin: 0px auto;
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
                {!data.mfnItems ? <Title>{title}</Title> : ''}
                {data.mfnItems ? (
                    <MuffinComponents data={JSON.parse(data.mfnItems)} />
                ) : null}
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
