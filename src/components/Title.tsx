import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Contaier = styled.h1`
    margin: 0px;
    font-size: 2rem;
    line-height: 2.5rem;
    font-weight: 500;
`;

export type TitleProps = {
    children: JSX.Element | Array<JSX.Element | String> | string | undefined;
};
export const Title: FunctionComponent<TitleProps> = ({ children }) => {
    return <Contaier>{children}</Contaier>;
};
