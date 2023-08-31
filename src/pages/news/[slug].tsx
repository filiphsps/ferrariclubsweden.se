import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { Comments } from '@/components/blog/comments';
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

const DynamicContent = styled.article`
    a {
        color: var(--color-primary);
    }
`;

const Section = styled.section``;
const SectionTitle = styled.div`
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-top: 0.15rem solid var(--color-section-header);
    color: var(--color-body-lighter);
    background: var(--color-section-header);
    font-size: 1.25rem;
    font-weight: 400;
    text-transform: uppercase;
`;
const SectionContent = styled.div`
    padding: 0 0.5rem;
`;

const NewsPostPage = ({ post: initialPostData }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { status: sessionStatus } = useSession({ required: process.env.NODE_ENV === 'production' });

    const {
        data: post,
        error: postError,
        mutate: mutatePost
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

        mutatePost();
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

                    {post?.commentCount && (
                        <Section>
                            <SectionTitle>
                                {post.commentCount || 0} Kommentar{post.commentCount !== 1 && 'er'}
                            </SectionTitle>
                            <SectionContent>
                                <Comments slug={post.slug} />
                            </SectionContent>
                        </Section>
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
