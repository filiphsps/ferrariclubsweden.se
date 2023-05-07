import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostApi } from '../api/post';

const Contaier = styled.h2`
    margin: 0px;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
`;

export type BlogeProps = {
};
export const Blog: FunctionComponent<BlogeProps> = ({ }) => {
    const [posts, setPosts] = useState<any>(null)
    useEffect(() => {
        PostApi({}).then(posts => {
            setPosts(posts)
            console.log(posts)
        })
    }, [])
    
    return <Contaier>
        TODO: News posts
        {posts?.map((item: any) => {
            return (
                <div key={item.id}>
                    {item.title}
                </div>
            )
        })}
    </Contaier>;
};
