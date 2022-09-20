import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Contaier = styled.h1`
    margin: 0px;
    font-size: 2rem;
    line-height: 2.75rem;
    font-weight: 500;
`;

export type TitleProps = {
    children: string;
};
export const Title: FunctionComponent<TitleProps> = ({ children }) => {
    return <Contaier>{children}</Contaier>;
};
