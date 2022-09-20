import { Footer } from './Footer';
import { FunctionComponent } from 'react';
import { Header } from './Header';
import styled from 'styled-components';

const Contaier = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        'header'
        'main'
        'footer';
`;
const Content = styled.main`
    grid-area: main;
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
            <Footer />
        </Contaier>
    );
};
