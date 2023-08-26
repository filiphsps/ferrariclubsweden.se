import { FunctionComponent, useEffect, useState } from 'react';

import Link from 'next/link';
import { PostApi } from '@/api/post';
import styled from 'styled-components';

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
    const [posts, setPosts] = useState<any>(null);
    useEffect(() => {
        PostApi({}).then((posts) => {
            setPosts(posts);
        });
    }, []);

    return (
        <Contaier>
            {posts?.map((edge: any) => {
                let item = edge.node;
                return (
                    <Post key={item.id}>
                        <Title>
                            <Link href={item.uri}>{item.title}</Link>
                        </Title>
                        <Content
                            dangerouslySetInnerHTML={{
                                __html: item.excerpt
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
