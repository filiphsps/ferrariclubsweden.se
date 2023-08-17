import { FunctionComponent, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import ErrorPage from 'next/error';
import { MuffinComponents } from '../components/MuffinComponents';
import { NextSeo } from 'next-seo';
import { Page } from '../components/Page';
import { PageApi } from '../api/page';
import { PostApi } from '../api/post';
import { Title } from '../components/Title';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useUser } from '../hooks/useUser';

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: 58rem;

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
    const { user } = useUser();
    const { data, mutate } = useSWR(
        [router.asPath],
        () => PageApi({ uri: router.asPath }),
        {
            fallbackData: page
        }
    );

    useEffect(() => {
        mutate();
    }, [user, mutate]);

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

    if (!data) return <ErrorPage statusCode={404} />;

    // TODO: We should get the page with auth
    const { title } = data;

    return (
        <Page>
            <NextSeo title={title} />

            <Container>
                {!data.mfnItems ? <Title>{title}</Title> : ''}
                {data.mfnItems && (
                    <MuffinComponents data={JSON.parse(data.mfnItems)} />
                )}
                <ContentContainer
                    dangerouslySetInnerHTML={{
                        // TODO: Handle emails in content?
                        // TODO: Replace the api link somewhere else
                        __html:
                            data.content?.replaceAll(
                                'https://api.ferrariclubsweden.se/events',
                                '/events'
                            ) || ''
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
