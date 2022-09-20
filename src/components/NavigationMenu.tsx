import { FiXCircle } from 'react-icons/fi';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Primary = styled.div`
    background: var(--color-block-body);
    width: 100%;
    height: 100vh;

    @media (min-width: 992px) {
        width: 33vw;
        min-width: 30rem;
        max-width: 38rem;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 4rem;
    padding: 0.5rem 1rem;
    border-bottom: 0.15rem solid var(--color-light-block);
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
`;
const Content = styled.div`
    padding: 1rem 2rem;

    @media (min-width: 992px) {
        width: 33vw;
        min-width: 30rem;
        max-width: 42rem;
        padding: 2rem 4rem;
    }
`;

const Toggle = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 2rem;
    line-height: 2.5rem;
    font-size: 2.5rem;
    cursor: pointer;
    transition: 150ms ease-in-out;
    opacity: 0.75;
    translate: -0.25rem 0px;

    &:hover {
        color: var(--color-primary);
        opacity: 1;
    }
`;

const Navigation = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
const NavigationItem = styled.div`
    flex-shrink: 1;
    flex-grow: 0;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    transition: 150ms;

    &:hover {
        color: var(--color-primary);
    }
`;

const Contaier = styled.div`
    z-index: 9999;
    position: fixed;
    top: 100vh;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: grid;
    grid-template-columns: 1fr;
    transition: 500ms ease-in-out top;
    user-select: none;
    background: var(--color-block);

    @keyframes MenuItemsSlideIn {
        0% {
            opacity: 0;
            translate: 0px 2rem;
            rotate: 15deg;
        }
        45% {
            opacity: 0.65;
            rotate: 0deg;
        }
        75% {
            translate: 0px;
        }
        100% {
            opacity: 1;
        }
    }

    &.open {
        top: 0px;

        ${NavigationItem} {
            opacity: 0;
            animation-name: MenuItemsSlideIn;
            animation-duration: 750ms;
            animation-fill-mode: forwards;
            transform-origin: left center;
        }
    }

    @media (min-width: 992px) {
        grid-template-columns: auto 1fr;
    }
`;

export type NavigationMenuProps = {
    open: boolean;
    toggleMenu: () => void;
};
export const NavigationMenu: FunctionComponent<NavigationMenuProps> = ({
    open,
    toggleMenu
}) => {
    const items = [
        {
            title: 'Hem',
            href: '/'
        },
        {
            title: 'Om Oss',
            href: '/om-oss/'
        },
        {
            title: 'Kontakta Oss',
            href: '/kontakta-oss/'
        },
        {
            title: 'Vår Historia',
            href: '/var-historia/'
        },
        {
            title: 'Kalender',
            href: '/kalender/'
        }
    ];

    return (
        <Contaier className={open ? 'open' : ''}>
            <Primary>
                <Header>Ferrari Club Sweden</Header>
                <Content>
                    <Toggle onClick={toggleMenu}>
                        <FiXCircle />
                    </Toggle>

                    <Navigation>
                        {items.map(({ title, href }, index) => (
                            <NavigationItem
                                key={href}
                                onClick={toggleMenu}
                                style={{
                                    animationDelay: `${400 + 150 * index}ms`
                                }}
                            >
                                <Link href={href}>
                                    <a>{title}</a>
                                </Link>
                            </NavigationItem>
                        ))}
                    </Navigation>
                </Content>
            </Primary>
            <div></div>
        </Contaier>
    );
};
