import { Card } from '../../components/Card';
import { FunctionComponent } from 'react';
import { NextSeo } from 'next-seo';
import { Page } from '../../components/Page';
import { ProfileBanner } from '../../components/ProfileBanner';
import styled from 'styled-components';
import { useUser } from '../../hooks/useUser';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: var(--color-light-background);
    padding: 1rem;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    max-width: var(--size-page-width);
    margin: 0px auto;

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
`;

const Sidebar = styled.section`
    height: 100%;
    width: 16rem;
    padding: 1rem;
    background: var(--color-block-body);
    border-radius: 1rem;

    @media (max-width: 992px) {
        width: 100%;
    }
`;

const Main = styled.section``;
const CardContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 18rem;
    height: 11rem;
`;

interface MemebersPageProps {}
const MemebersPage: FunctionComponent<MemebersPageProps> = () => {
    const { user } = useUser({ redirectTo: '/members/login' });

    return (
        <Page>
            <NextSeo title="För Medlemmar" />

            <Container>
                <Content>
                    <Sidebar>
                        <ProfileBanner />
                    </Sidebar>
                    <Main>
                        <CardContainer>
                            <Card />
                        </CardContainer>
                    </Main>
                </Content>
            </Container>
        </Page>
    );
};

export default MemebersPage;
