import { Avatar } from './user/avatar';
import { FiMenu } from 'react-icons/fi';
import type { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '../../public/img/logo.png';
import type { Session } from '@/api/auth';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';

const Contaier = styled.header`
    z-index: 5;
    grid-area: header;
    height: var(--block-header-height);
    padding: 0.5rem 1.5rem;
    background: var(--color-block);
    color: var(--color-block-body);
    user-select: none;
    transition: 250ms ease-in-out;

    &.sticky {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        z-index: 999;

        background: linear-gradient(
            to top,
            rgba(27, 27, 27, 0) 0%,
            rgba(27, 27, 27, 0.2) 35%,
            rgba(27, 27, 27, 0.55) 70%,
            rgba(27, 27, 27, 0.75)
        );
    }

    &.hide {
        margin-top: calc(var(--block-header-height) * -1);
    }
`;
const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    width: 100%;
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 4rem;
        width: 4rem;
        object-fit: contain;
    }
`;

const Navigation = styled.nav`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;

    @media (max-width: 992px) {
        display: none;
    }
`;
const Actions = styled(Navigation)`
    justify-content: flex-end;
`;
const NavigationItem = styled.div`
    text-transform: uppercase;
    font-size: 1rem;
    font-family: 'Ferrari', sans-serif;
    letter-spacing: 0.05rem;
    transition: 250ms ease-in-out;
    cursor: pointer;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.75);

    &:hover {
        color: var(--color-primary);
    }
`;

const MenuToggle = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-transform: uppercase;
    font-size: 1.5rem;
    letter-spacing: 0.05rem;
    cursor: pointer;

    svg {
        filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.75));
    }
`;
const AccountToggle = styled(MenuToggle)`
    justify-content: flex-end;
`;

const ProfileLink = styled.div`
    overflow: hidden;
    width: 2.25rem;
    height: 2.25rem;
    background: var(--color-light-background);
    border: 0.15rem solid var(--color-light-background);
    border-radius: 100%;
`;

const HeaderLogo = styled(Image)`
    user-select: none;

    img {
        user-select: none;
    }
`;

export type HeaderProps = {
    sticky?: boolean;
    navigationMenuOpen?: boolean;
    toggleMenu: () => void;
};
export const Header: FunctionComponent<HeaderProps> = ({ toggleMenu, sticky, navigationMenuOpen }) => {
    const { data } = useSession();
    const session = data as Session;

    return (
        <Contaier className={`${sticky ? 'sticky' : ''} ${navigationMenuOpen ? 'hide' : ''}`}>
            <ContentWrapper>
                <Content>
                    <MenuToggle onClick={toggleMenu}>
                        <FiMenu />
                    </MenuToggle>
                    <Logo>
                        <Link href="/">
                            <HeaderLogo src={LogoImage} alt="Ferrari Club Sweden" />
                        </Link>
                    </Logo>

                    {!session?.isLoggedIn && (
                        <Actions>
                            <>
                                <NavigationItem>
                                    <Link href="/members/login/">Logga In</Link>
                                </NavigationItem>
                                <NavigationItem>
                                    <Link href="/members/register/">Bli Medlem</Link>
                                </NavigationItem>
                            </>
                        </Actions>
                    )}

                    <AccountToggle>
                        {session?.isLoggedIn && (
                            <ProfileLink>
                                <Link href="/members/profile/">
                                    <Avatar size="2rem" />
                                </Link>
                            </ProfileLink>
                        )}
                    </AccountToggle>
                </Content>
            </ContentWrapper>
        </Contaier>
    );
};
