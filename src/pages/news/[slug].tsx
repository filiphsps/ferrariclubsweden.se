import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import ErrorPage from 'next/error';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { PageContainer } from '@/components/layout/page-container';
import { PageContent } from '@/components/layout/page-content';
import { PageHeader } from '@/components/layout/page-header';
import { PostApi } from '@/api/post';
import { ReturnFooter } from '@/components/blog/return-footer';
import styled from 'styled-components';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

const DynamicContent = styled.div``;

const NewsPostPage = ({ post: initialPostData }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { status: sessionStatus } = useSession({ required: true });

    const {
        data: post,
        error: postError,
        mutate
    } = useSWR(
        [
            'PostsApi',
            {
                slug: initialPostData?.slug
            }
        ],
        ([, props]) => PostApi(props),
        {
            fallbackData: initialPostData
        }
    );

    useEffect(() => {
        if (sessionStatus === 'loading') return;

        mutate();
    }, [sessionStatus]);

    if (postError) return <ErrorPage statusCode={postError?.statusCode || 404} title={postError?.message} />;

    return (
        <Page>
            <NextSeo title={`${post.title} | Nyheter`} />

            <PageContainer>
                <PageHeader title={post.title} />

                <PageContent>
                    {post.content && (
                        <DynamicContent
                            dangerouslySetInnerHTML={{
                                // TODO: Handle emails in content?
                                __html: post.content
                            }}
                        />
                    )}
                </PageContent>

                <ReturnFooter path="/news/" />
            </PageContainer>
        </Page>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // FIXME: Get paths
    return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params!.slug as string;

    try {
        const post = await PostApi({
            slug
        });

        return {
            props: {
                post
            },
            revalidate: 10
        };
    } catch (error: any) {
        if (error?.statusCode && error.statusCode === 404) {
            return {
                notFound: true
            };
        }

        throw error;
    }
};

export default NewsPostPage;
