import { FiChevronRight, FiXCircle } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { MenuApi } from '@/api/menu';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

const Primary = styled.section`
    background: var(--color-block-body);
    width: 100%;
    height: 100vh;
    height: 100dvh;
    max-height: 100vh;
    max-height: 100dvh;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0 0 2rem 0;

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
    inset: 0;
    top: 130vh;
    display: grid;
    grid-template-columns: 1fr;
    transition: 500ms ease-in-out top;
    user-select: none;
    background: var(--color-block);

    height: 100vh;
    max-height: 100vh;

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
        top: 0;

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
    closeMenu: () => void;
    initialMenuData?: any;
};
export const NavigationMenu = ({ open, closeMenu, initialMenuData }: NavigationMenuProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { status: sessionStatus } = useSession();
    const [items, setItems] = useState<Array<{ id: string; title: string; href: string; level: number }>>([]);

    const {
        data: menu,
        error: menuError,
        mutate
    } = useSWR(
        [
            'MenuApi',
            {
                slug: (sessionStatus !== 'authenticated' && 'unauthenticated-main-menu') || 'authenticated-main-menu'
            }
        ],
        ([, props]) => MenuApi(props),
        {
            fallbackData: initialMenuData
        }
    );
    if (menuError) console.error(menuError);

    useEffect(() => {
        if (sessionStatus === 'loading') return;

        mutate();
    }, [sessionStatus]);

    // Close menu on route change.
    useEffect(() => {
        const routerCloseMenu = () => {
            closeMenu();
        };
        router.events.on('routeChangeStart', routerCloseMenu);

        return () => {
            router.events.off('routeChangeStart', routerCloseMenu);
        };
    }, []);

    // Reset scroll upon state change.
    useEffect(() => {
        if (!ref?.current) return;

        ref.current.scrollTop = 0;
    }, [open]);

    // Convert menu into the format we currently use.
    // FIXME: Refactor the menu entirely.
    useEffect(() => {
        if (!menu) return;

        const res = menu.flat(1);

        setItems(
            res
                .map((item) => ({
                    id: item.id,
                    title: item.label,
                    href: item.path,
                    level: item.level
                }))
                .filter((item) => item)
        );
    }, [menu]);

    return (
        <Contaier className={open ? 'open' : ''}>
            <Primary ref={ref}>
                <Header>Ferrari Club Sweden</Header>
                <Content>
                    <Toggle onClick={() => closeMenu()}>
                        <FiXCircle />
                    </Toggle>

                    <Navigation>
                        {items?.map(({ id, title, href, level }, index) => (
                            <NavigationItem
                                key={id}
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
