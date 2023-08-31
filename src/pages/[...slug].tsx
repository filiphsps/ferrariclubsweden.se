import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import ErrorPage from 'next/error';
import { MuffinComponents } from '@/components/MuffinComponents';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { PageApi } from '@/api/page';
import { PostApi } from '@/api/post';
import { Title } from '@/components/typography/title';
import { getCanonicalPath } from '@/api/client';
import styled from 'styled-components';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

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

const CustomPage = ({ page: initialPageData }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { status: sessionStatus } = useSession();

    const {
        data: page,
        error: pageError,
        mutate
    } = useSWR(
        [
            'PageApi',
            {
                uri: initialPageData?.uri
            }
        ],
        ([, props]) => PageApi(props),
        {
            fallbackData: initialPageData
        }
    );
    useEffect(() => {
        if (sessionStatus === 'loading') return;

        mutate();
    }, [sessionStatus]);

    if (pageError) return <ErrorPage statusCode={pageError?.statusCode || 404} title={pageError?.message} />;

    if (!page) return null; // TODO: Loading page

    const { title, mfnItems, content, excerpt, uri } = page;

    return (
        <Page>
            <NextSeo title={title} description={excerpt} canonical={`https://www.ferrariclubsweden.se${uri}`} />

            <Container>
                {!mfnItems ? <Title>{title}</Title> : ''}
                {mfnItems && <MuffinComponents data={JSON.parse(mfnItems)} />}
                <ContentContainer
                    dangerouslySetInnerHTML={{
                        // TODO: Handle emails in content?
                        __html: content || ''
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

        return {
            props: {
                page: page
            },
            revalidate: 10
        };
    } catch (error: any) {
        if (error?.statusCode && error.statusCode === 404) {
            try {
                const post = await PostApi({
                    slug: slug[0]
                });

                if (!post) throw {};

                return {
                    props: {},
                    redirect: {
                        destination: `/news/${post.slug}/`
                    }
                };
            } catch {}

            return {
                notFound: true
            };
        }

        throw error;
    }
};

export default CustomPage;
