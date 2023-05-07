import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Contaier = styled.h2`
    margin: 0px;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
`;

export type BlogeProps = {
};
export const Blog: FunctionComponent<BlogeProps> = ({ }) => {
    return <Contaier>
        TODO: News posts
    </Contaier>;
};
