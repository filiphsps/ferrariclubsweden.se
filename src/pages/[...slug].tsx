import { GetStaticPaths, GetStaticProps } from 'next';

import ErrorPage from 'next/error';
import { FunctionComponent } from 'react';
import { MuffinComponents } from '@/components/MuffinComponents';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { PageApi } from '@/api/page';
import { PostApi } from '@/api/post';
import { Title } from '@/components/Title';
import { getCanonicalPath } from '@/api/client';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: var(--size-page-width);

    margin: 0px auto;
    padding: 1rem;
`;

const ContentContainer = styled.div`
    margin-top: 2.5rem;

    p {
        margin: 0px 0px 2rem 0px;
    }
    a {
        color: var(--color-primary);

        &:hover {
            text-decoration: underline;
        }
    }
`;

interface CustomPageProps {
    page?: any; // FIXME: PageModel
    post?: any; // FIXME: PostModel
}
const CustomPage: FunctionComponent<CustomPageProps> = ({ page, post }) => {
    const router = useRouter();
    const { data, error } = useSWR([router.asPath], () => PageApi({ uri: router.asPath }), {
        fallbackData: page
    });

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

    if (!data || error) return <ErrorPage statusCode={(error && error?.statusCode) || 404} title={error?.message} />;

    // TODO: We should get the page with auth
    const { title, mfnItems } = data;

    return (
        <Page>
            <NextSeo title={title} />

            <Container>
                {!mfnItems ? <Title>{title}</Title> : ''}
                {mfnItems && <MuffinComponents data={JSON.parse(mfnItems)} />}
                <ContentContainer
                    dangerouslySetInnerHTML={{
                        // TODO: Handle emails in content?
                        // TODO: Replace the api link somewhere else
                        __html: data.content || ''
                    }}
                />
            </Container>
        </Page>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // FIXME: Get paths
    return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params!.slug as string[];

    const uri = `/${slug.join('/')}/`;
    const canonical = getCanonicalPath(uri);

    if (uri !== canonical)
        return {
            props: {},
            redirect: {
                destination: canonical
            }
        };

    try {
        const page = await PageApi({
            uri
        });

        if (!page) {
            const post = await PostApi({
                uri
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
    } catch (error: any) {
        if (error?.statusCode && error.statusCode === 404)
            return {
                notFound: true
            };

        throw error;
    }
};

export default CustomPage;
