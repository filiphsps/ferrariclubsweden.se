import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import Background from '../../../public/img/carousel/slide-3.jpg';
import { Button } from '@/components/Button';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Input } from '@/components/Input';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { SubTitle } from '@/components/SubTitle';
import { Title } from '@/components/Title';
import { getCsrfToken } from 'next-auth/react';
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
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

    h1 {
        text-transform: unset;
        font-family: 'Poppins', sans-serif;
    }
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;

    input {
        margin-bottom: 0.5rem;
    }

    button {
        margin-top: 1rem;
    }
`;

const Sidebar = styled.div`
    background: var(--color-block);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
    }

    @media (max-width: 992px) {
        display: none;
    }
`;

const Notice = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    color: var(--color-block);

    p {
        opacity: 0.85;
    }

    a {
    }
`;

const MembersLoginPage: FunctionComponent<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ csrfToken }) => {
    return (
        <Page>
            <NextSeo title="Logga In" />

            <Container>
                <Content>
                    <ContentContainer>
                        <div>
                            <Title>Välkommen tillbaka!</Title>
                            <SubTitle>Kul att du är här igen! Logga in genom att fylla i fälten nedan.</SubTitle>

                            <SubTitle>
                                Medlems login är för närvarande (delvis) avaktiverat under migrationen till ny webbsida.
                                Kontakta <a href="mailto:janne@ferrariclubsweden">janne@ferrariclubsweden</a>.
                            </SubTitle>
                        </div>

                        <Form method="post" action="/api/auth/callback/credentials">
                            <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />

                            <Input name="username" placeholder="E-mail eller Användarenamn" type="text" />
                            <Input name="password" placeholder="Lösenord" type="password" />

                            <Button type="submit">Logga in</Button>
                        </Form>

                        <Notice>
                            <p>Inte medlem ännu?</p>
                            <Link href="/members/register">Bli Medlem</Link>
                        </Notice>
                    </ContentContainer>
                </Content>
                <Sidebar>
                    <Image src={Background} alt="" />
                </Sidebar>
            </Container>
        </Page>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            csrfToken: await getCsrfToken(context)
        }
    };
}

export default MembersLoginPage;
