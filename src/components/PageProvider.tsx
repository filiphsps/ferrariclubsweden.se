import { FunctionComponent, useCallback, useState } from 'react';

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
    max-width: 100vw;
    //transition: 300ms ease-in-out all; // FIXME: this is bad for performance
    transform: scale(1);
    background: var(--color-block-body);
`;

const Content = styled.div`
    grid-area: main;
    background: var(--color-light-block);

    &.menu-open {
        ${ContentContainer} {
            transform: scale(0.85);
            box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.25);
        }
    }
`;

export type PageProviderProps = {
    children: JSX.Element;
};
export const PageProvider: FunctionComponent<PageProviderProps> = ({ children }) => {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuState, setMenuState] = useState<'animating' | 'idle'>('idle');

    const setMenu = useCallback(
        (open: boolean) => {
            setMenuState('animating');
            setMenuOpen(open);

            setTimeout(() => {
                setMenuState('idle');
            }, 500);
        },
        [setMenuOpen, setMenuState]
    );

    return (
        <Contaier className={menuOpen ? 'menu-open' : ''}>
            <Header
                toggleMenu={() => setMenu(!menuOpen)}
                navigationMenuOpen={menuOpen}
                sticky={router.pathname === '/'}
            />
            <Content className={menuOpen ? 'menu-open' : ''}>
                <ContentContainer
                    style={{
                        transition: (menuState === 'animating' && '300ms ease-in-out all') || undefined
                    }}
                >
                    {children}
                </ContentContainer>
            </Content>
            <Footer />

            <NavigationMenu open={menuOpen} closeMenu={() => setMenu(false)} />
        </Contaier>
    );
};
