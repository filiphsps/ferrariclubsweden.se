import { FiChevronRight, FiXCircle } from 'react-icons/fi';
import { FunctionComponent, useEffect, useState } from 'react';

import Link from 'next/link';
import { MenuApi } from '@/api/menu';
import styled from 'styled-components';

const Primary = styled.div`
    background: var(--color-block-body);
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;

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
    line-height: 1.5rem;
    font-family: 'Ferrari', sans-serif;
    text-transform: uppercase;
    text-align: center;
`;
const Content = styled.div`
    padding: 1rem 2rem;
    font-family: 'Ferrari', sans-serif;

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
    margin-top: -1rem;
`;
const NavigationItem = styled.div<{ level: number }>`
    flex-shrink: 1;
    flex-grow: 0;
    font-size: ${(props) => (props.level === 0 ? '1.25rem' : '1.15rem')};
    line-height: ${(props) => (props.level === 0 ? '1.35rem' : '1.25rem')};
    padding-left: ${(props) => `${2 * props.level}rem`};
    text-transform: uppercase;
    font-weight: 700;
    transition: 150ms;
    color: ${(props) => (props.level === 0 ? 'var(--color-body)' : 'var(--color-body-lighter)')};

    a {
        &:hover {
            color: var(--color-primary);
        }
        cursor: pointer;
    }
`;

const Contaier = styled.div`
    z-index: 9999;
    position: fixed;
    top: 130vh;
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
export const NavigationMenu: FunctionComponent<NavigationMenuProps> = ({ open, toggleMenu }) => {
    const [items, setItems] = useState<Array<{ id: string; title: string; href: string; level: number }>>([]);
    useEffect(() => {
        MenuApi().then((menu) => {
            const res = menu.flat(1);

            setItems(
                res
                    .map((item) => ({
                        id: item.id,
                        title: item.label,

                        // FIXME: Don't do this here ffs.
                        href: item.path
                            .replace('/logga-ut/', '/members/logout/')
                            .replace('/login/', '/members/login/')
                            .replace('/medlemssida/', '/members/')
                            .replace('/medlemsskap/', '/members/register/')
                            .replace('/kalender/', '/calendar/'),

                        level: item.level
                    }))
                    .map((item) => {
                        // TODO: do this somewhere else
                        if (item.href.includes('/nytt-losenord/')) return null as unknown as any;

                        // TODO: handle this properly.
                        if (localStorage.getItem('auth_token')) {
                            if (item.href.includes('/members/login/')) return null as unknown as any;
                            else if (item.href.includes('/members/register/')) return null as unknown as any;
                        } else {
                            if (item.href.includes('/members/logout/')) return null as unknown as any;
                            else if (item.href.includes('/nyheter/')) return null as unknown as any;
                        }

                        return item;
                    })
                    .filter((item) => item)
            );
        });
    }, []);

    return (
        <Contaier className={open ? 'open' : ''}>
            <Primary>
                <Header>Ferrari Club Sweden</Header>
                <Content>
                    <Toggle onClick={toggleMenu}>
                        <FiXCircle />
                    </Toggle>

                    <Navigation>
                        {items.map(({ id, title, href, level }, index) => (
                            <NavigationItem
                                key={id}
                                onClick={toggleMenu}
                                level={level}
                                style={{
                                    animationDelay: `${200 + 50 * index}ms`
                                }}
                            >
                                {href !== '#' ? (
                                    <Link href={href}>
                                        {title}
                                        <FiChevronRight />
                                    </Link>
                                ) : (
                                    <>{title}</>
                                )}
                            </NavigationItem>
                        ))}
                    </Navigation>
                </Content>
            </Primary>
            <div></div>
        </Contaier>
    );
};
