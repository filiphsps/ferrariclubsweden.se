import { GetStaticPaths, GetStaticProps } from 'next';

import ErrorPage from 'next/error';
import { FunctionComponent } from 'react';
import { MuffinComponents } from '../components/MuffinComponents';
import { NextSeo } from 'next-seo';
import { Page } from '../components/Page';
import { PageApi } from '../api/page';
import { PostApi } from '../api/post';
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
    page?: any; // FIXME: PageModel
    post?: any; // FIXME: PostModel
}
const CustomPage: FunctionComponent<CustomPageProps> = ({ page, post }) => {
    // TODO: blog post

    if (post) {
        const { title } = post;
        return (
            <Page>
                <NextSeo title={title} />

                <Container>
                    <Title>{title}</Title>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: post.content
                        }}
                    ></div>
                </Container>
            </Page>
        );
    }

    if (!page) return <ErrorPage statusCode={404} />;

    // TODO: We should get the page with auth
    const { title } = page;

    return (
        <Page>
            <NextSeo title={title} />

            <Container>
                {!page.mfnItems ? <Title>{title}</Title> : ''}
                {page.mfnItems && (
                    <MuffinComponents data={JSON.parse(page.mfnItems)} />
                )}
                <div
                    dangerouslySetInnerHTML={{
                        __html: page.content
                    }}
                ></div>
            </Container>
        </Page>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // FIXME: Get paths
    return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const slug = params!.slug as string[];

    if (slug.includes('login'))
        return {
            props: {},
            redirect: {
                destination: '/members/login/'
            }
        };

    const page = await PageApi({
        uri: `/${slug.join('/')}/`
    });

    if (!page) {
        const post = await PostApi({
            uri: `/${slug.join('/')}/`
        });
        return {
            props: {
                post: post
            },
            revalidate: 10
        };
    }

    return {
        props: {
            page: page
        },
        revalidate: 10
    };
};

export default CustomPage;
