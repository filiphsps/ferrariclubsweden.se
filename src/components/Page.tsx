import type { FunctionComponent } from 'react';
import styled from 'styled-components';

const Contaier = styled.section`
    height: 100%;
    width: 100%;
`;

export type PageProps = {
    children: JSX.Element | JSX.Element[];
};
export const Page: FunctionComponent<PageProps> = ({ children }) => {
    return <Contaier>{children}</Contaier>;
};
