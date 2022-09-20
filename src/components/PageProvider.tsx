import { FunctionComponent } from 'react';
import { Header } from './Header';
import styled from 'styled-components';

const Contaier = styled.div``;
const Content = styled.main`
    padding: 0.5rem;
`;

export type PageProviderProps = {
    children: JSX.Element;
};
export const PageProvider: FunctionComponent<PageProviderProps> = ({
    children
}) => {
    return (
        <Contaier>
            <Header />
            <Content>{children}</Content>
        </Contaier>
    );
};
