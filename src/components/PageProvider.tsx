import { FunctionComponent, useState } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { NavigationMenu } from './NavigationMenu';
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
const ContentContainer = styled.main`
    height: 100%;
    width: 100%;
    padding: 0.5rem;
`;

const Content = styled.div`
    grid-area: main;
    transition: 250ms ease-in-out;

    &.menu-open {
        border: 4rem solid var(--color-light-block);

        @media (max-width: 992px) {
            border-width: 1.5rem;
        }

        ${ContentContainer} {
            box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.25);
        }
    }
`;

export type PageProviderProps = {
    children: JSX.Element;
};
export const PageProvider: FunctionComponent<PageProviderProps> = ({
    children
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Contaier>
            <Header toggleMenu={() => setMenuOpen(!menuOpen)} />
            <Content className={menuOpen ? 'menu-open' : ''}>
                <ContentContainer>{children}</ContentContainer>
            </Content>
            <Footer />

            <NavigationMenu
                open={menuOpen}
                toggleMenu={() => setMenuOpen(!menuOpen)}
            />
        </Contaier>
    );
};
