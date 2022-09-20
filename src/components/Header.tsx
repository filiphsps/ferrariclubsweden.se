import { FiMenu, FiUser } from 'react-icons/fi';

import { FunctionComponent } from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import LogoImage from '../../public/img/logo.png';
import styled from 'styled-components';

const Contaier = styled.header`
    grid-area: header;
    height: 5rem;
    padding: 0.5rem 1.5rem;
    background: var(--color-block);
    color: var(--color-block-body);
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
    letter-spacing: 0.05rem;
    transition: 150ms;

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

    @media (min-width: 992px) {
        display: none;
    }
`;
const AccountToggle = styled(MenuToggle)`
    justify-content: flex-end;
`;

export type HeaderProps = {};
export const Header: FunctionComponent<HeaderProps> = () => {
    return (
        <Contaier>
            <ContentWrapper>
                <Content>
                    <MenuToggle>
                        <FiMenu />
                    </MenuToggle>

                    <Navigation>
                        <NavigationItem>
                            <Link href="/">
                                <a>Hem</a>
                            </Link>
                        </NavigationItem>
                        <NavigationItem>
                            <Link href="/">
                                <a>Om Oss</a>
                            </Link>
                        </NavigationItem>
                        <NavigationItem>
                            <Link href="/">
                                <a>Event</a>
                            </Link>
                        </NavigationItem>
                    </Navigation>
                    <Logo>
                        <Image src={LogoImage} alt="Ferrari Club Sweden" />
                    </Logo>
                    <Actions>
                        <NavigationItem>
                            <Link href="/">
                                <a>Bli Medlem</a>
                            </Link>
                        </NavigationItem>
                    </Actions>

                    <AccountToggle>
                        <FiUser />
                    </AccountToggle>
                </Content>
            </ContentWrapper>
        </Contaier>
    );
};
