import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import Background from '../../../public/img/carousel/slide-3.jpg';
import Image from 'next/image';
import { Input } from '@/components/Input';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { PrimaryButton } from '@/components/interactable/button';
import { SubTitle } from '@/components/SubTitle';
import { Title } from '@/components/typography/title';
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
    gap: 2rem;
    max-width: 28rem;
    width: 100%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    button {
        margin-top: 0.5rem;
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

const Header = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Actions = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;
const Action = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
    color: var(--color-body-lighter);

    font-size: 0.75rem;
    font-weight: 500;

    p {
        margin: 0;
        font-weight: inherit;
        font-size: inherit;
        color: inherit;
    }

    a {
        font-weight: inherit;
        color: inherit;

        &:hover {
            color: var(--color-primary);
        }
    }
`;

const MembersResetPage = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Page>
            <NextSeo title="Återställ Lösenord" />

            <Container>
                <Content>
                    <ContentContainer>
                        <Header>
                            <Title>Glömt ditt lösenord?</Title>
                            <SubTitle>
                                Fyll i ditt användarenamn eller e-mail så skickar vi en återstälnningslänk. Glöm inte
                                att titta skräpposts-mappen!
                            </SubTitle>
                        </Header>

                        <Form method="post" action="/api/auth/callback/credentials">
                            <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <Input name="type" type="hidden" defaultValue="reset" />

                            <Input name="username" placeholder="E-mail eller Användarenamn" type="text" />
                            <PrimaryButton type="submit">Börja återställning</PrimaryButton>
                        </Form>

                        <Actions>
                            <Action>
                                <p>Inte medlem ännu?</p>
                                <Link href="/members/register">Bli Medlem</Link>
                            </Action>
                        </Actions>
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

export default MembersResetPage;
