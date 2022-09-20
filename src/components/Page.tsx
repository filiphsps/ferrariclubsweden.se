import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Contaier = styled.div``;

export type PageProps = {
    children: JSX.Element | JSX.Element[];
};
export const Page: FunctionComponent<PageProps> = ({ children }) => {
    return <Contaier>{children}</Contaier>;
};
