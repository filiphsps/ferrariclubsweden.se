import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import ErrorPage from 'next/error';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { PageContainer } from '@/components/layout/page-container';
import { PageContent } from '@/components/layout/page-content';
import { PageHeader } from '@/components/layout/page-header';
import { PostPreview } from '@/components/blog/post-preview';
import { PostsApi } from '@/api/post';
import styled from 'styled-components';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

const Posts = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    :last-child {
        border-bottom: none;
    }

    @media (min-width: 992px) {
        gap: 2.5rem;
    }
`;

const NewsPage = ({ posts: initialPostsData }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { status: sessionStatus } = useSession({ required: true });

    const {
        data: posts,
        error: postsError,
        mutate
    } = useSWR(['PostsApi', {}], ([, props]) => PostsApi(props), {
        fallbackData: initialPostsData
    });

    useEffect(() => {
        if (sessionStatus === 'loading') return;

        mutate();
    }, [sessionStatus]);

    if (postsError) return <ErrorPage statusCode={postsError?.statusCode || 404} title={postsError?.message} />;

    return (
        <Page>
            <NextSeo title="Nyheter" />

            <PageContainer>
                <PageHeader title="Nyheter" />

                <PageContent>
                    <Posts>
                        {posts.map((post) => (
                            <PostPreview key={post.id} data={post} />
                        ))}
                    </Posts>
                </PageContent>
            </PageContainer>
        </Page>
    );
};

export const getStaticProps: GetStaticProps = async ({}) => {
    try {
        const posts = await PostsApi({});

        return {
            props: {
                posts
            },
            revalidate: 10
        };
    } catch (error: any) {
        throw error;
    }
};

export default NewsPage;
