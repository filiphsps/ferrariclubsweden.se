import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import Link from 'next/link';
import { PostsApi } from '@/api/post';
import styled from 'styled-components';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

const Contaier = styled.div`
    margin: 0px;
`;
const Post = styled.div`
    margin-bottom: 1.5rem;
    border-bottom: var(--color-block) 0.05rem solid;
`;
const Title = styled.h2`
    font-size: 1.65rem;
    line-height: 2.25rem;
    padding-bottom: 0.25rem;
`;
const Content = styled.p`
    font-size: 1rem;
    line-height: 1.45rem;
`;

export type BlogeProps = {};
export const Blog: FunctionComponent<BlogeProps> = ({}) => {
    const { status: sessionStatus } = useSession();

    const {
        data: posts,
        error: postsError,
        mutate
    } = useSWR(['PostApi', {}], ([, props]) => PostsApi(props), {
        //fallbackData: initialPostsData
    });
    if (postsError) console.error(postsError);

    useEffect(() => {
        if (sessionStatus === 'loading') return;

        mutate();
    }, [sessionStatus]);

    return (
        <Contaier>
            {posts?.map(({ slug, uri, title, excerpt }) => {
                return (
                    <Post key={slug}>
                        <Title>
                            <Link href={uri}>{title}</Link>
                        </Title>
                        <Content
                            dangerouslySetInnerHTML={{
                                __html: excerpt || ''
                            }}
                        />
                    </Post>
                );
            })}
            {posts && posts?.length <= 0 && (
                <>
                    Nyheter är för närvarande inte tillgängligt. <br />
                    Testa igen senare.
                </>
            )}
        </Contaier>
    );
};
