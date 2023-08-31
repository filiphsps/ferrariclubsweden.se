import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { PageHeader } from '@/components/layout/page-header';
import { PostsApi } from '@/api/post';
import styled from 'styled-components';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: var(--size-page-width);
    margin: 0px auto;

    @media (min-width: 992px) {
        padding: 2rem 0;
    }
`;

type NewsPageProps = {};
const NewsPage = ({}: NewsPageProps) => {
    const { status: sessionStatus, data: session } = useSession({ required: true });

    const {
        data: posts,
        error: postsError,
        mutate
    } = useSWR(['PostsApi', {}], ([, props]) => PostsApi(props), {
        //fallbackData: initialMenuData
    });

    useEffect(() => {
        if (sessionStatus === 'loading') return;

        mutate();
    }, [sessionStatus]);

    return (
        <Page>
            <NextSeo title="Nyheter" />

            <Container>
                <PageHeader title="Nyheter" />
            </Container>
        </Page>
    );
};

export default NewsPage;
