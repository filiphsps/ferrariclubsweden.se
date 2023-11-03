import Background from '../../../public/img/carousel/slide-1.jpg';
import type { FunctionComponent } from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { SubTitle } from '@/components/SubTitle';
import { Title } from '@/components/typography/title';
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

const Header = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
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
                        <Header>
                            <Title>Bli Medlem</Title>
                            <SubTitle>
                                Medlems registrering är för närvarande avaktiverat under migrationen till ny webbsida.
                                Kontakta <a href="mailto:janne@ferrariclubsweden">janne@ferrariclubsweden</a>.
                            </SubTitle>
                        </Header>

                        {/*<Form>
                            <Input placeholder="Email" type="email" />
                            <Input placeholder="Lösenord" type="password" />
                            <PrimaryButton type="button">Bli Medlem</PrimaryButton>
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
