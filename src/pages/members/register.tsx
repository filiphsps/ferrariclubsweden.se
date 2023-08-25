import Background from '../../../public/img/carousel/slide-1.jpg';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { SubTitle } from '@/components/SubTitle';
import { Title } from '@/components/Title';
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
const Form = styled.div`
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

interface MembersRegisterPageProps {}
const MembersRegisterPage: FunctionComponent<MembersRegisterPageProps> = () => {
    return (
        <Page>
            <NextSeo title="Bli Medlem" />

            <Container>
                <Sidebar>
                    <Image src={Background} alt="" />
                </Sidebar>
                <Content>
                    <ContentContainer>
                        <div>
                            <Title>Bli Medlem</Title>
                            <SubTitle>
                                Medlems registrering är för närvarande avaktiverat under migrationen till ny webbsida.
                                Kontakta <a href="mailto:janne@ferrariclubsweden">janne@ferrariclubsweden</a>.
                            </SubTitle>
                        </div>

                        {/*<Form>
                            <Input placeholder="Email" type="email" />
                            <Input placeholder="Lösenord" type="password" />
                            <Button type="button">Bli Medlem</Button>
                        </Form>

                        <Notice>
                            <p>Redan medlem?</p>
                            <Link href="/members/login">Logga in</Link>
                        </Notice>*/}
                    </ContentContainer>
                </Content>
            </Container>
        </Page>
    );
};

export default MembersRegisterPage;
