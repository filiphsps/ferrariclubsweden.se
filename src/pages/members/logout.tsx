import { FunctionComponent, useEffect, useState } from 'react';

import Background from '../../../public/img/carousel/slide-3.jpg';
import { Button } from '../../components/Button';
import Image from 'next/image';
import { Input } from '../../components/Input';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Page } from '../../components/Page';
import { SubTitle } from '../../components/SubTitle';
import { Title } from '../../components/Title';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    height: calc(100% + 1rem);

    @media (max-width: 992px) {
        display: flex;
        flex-direction: column-reverse;
    }
`;

const Content = styled.article`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background: var(--color-block-body);
`;
const ContentContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 28rem;
    width: 100%;
    text-align: center;

    h1 {
        text-transform: unset;
        font-family: 'Poppins', sans-serif;
    }
`;

interface MembersLoginPageProps {}
const MembersLoginPage: FunctionComponent<MembersLoginPageProps> = () => {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('auth_token');

        setTimeout(() => {
            window.location.pathname = '';
        }, 1500);
    }, []);

    return (
        <Page>
            <NextSeo title="Logga Ut" />

            <Container>
                <Content>
                    <ContentContainer>
                        <div>
                            <Title>Loggar ut...</Title>
                        </div>
                    </ContentContainer>
                </Content>
            </Container>
        </Page>
    );
};

export default MembersLoginPage;
