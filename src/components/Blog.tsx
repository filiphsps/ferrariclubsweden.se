import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostApi } from '../api/post';

const Contaier = styled.div`
    margin: 0px;
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
        {posts?.map((item: any) => {
            return (
                <div key={item.id}>
                    {item.title}
                </div>
            )
        })}
        {posts?.length <= 0 && <>
            Nyheter är för närvarande inte tillgängligt. <br/>
            Testa igen senare.
        </>}
    </Contaier>;
};
