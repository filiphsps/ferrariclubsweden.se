import { FunctionComponent, useState } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { NavigationMenu } from './NavigationMenu';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Contaier = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        'header'
        'main'
        'footer';

    &.menu-open {
        overflow: hidden;
        max-height: 100vh;
    }
`;
const ContentContainer = styled.main`
    height: 100%;
    width: 100%;
    padding: 0.5rem;
`;

const Content = styled.div`
    grid-area: main;
    transition: 300ms ease-in-out;

    &.menu-open {
        border: 4rem solid var(--color-light-block);
        border-top-width: 8rem;

        @media (max-width: 992px) {
            border-width: 3rem;
            border-top-width: 6rem;
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
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Contaier className={menuOpen ? 'menu-open' : ''}>
            <Header
                toggleMenu={() => setMenuOpen(!menuOpen)}
                navigationMenuOpen={menuOpen}
                sticky={router.pathname === '/'}
            />
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
