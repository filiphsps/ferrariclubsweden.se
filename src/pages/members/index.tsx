import { Card } from '../../components/Card';
import { FunctionComponent } from 'react';
import { NextSeo } from 'next-seo';
import { Page } from '../../components/Page';
import { ProfileBanner } from '../../components/ProfileBanner';
import styled from 'styled-components';
import { useUser } from '../../hooks/useUser';

const Container = styled.div`
    max-width: var(--size-page-width);
    margin: 0px auto;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    padding-top: 1rem;
    min-height: 32rem;

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
        margin: 0px 1rem;
    }
`;

const Sidebar = styled.section`
    height: 100%;
    width: 16rem;
    background: var(--color-light-block);

    @media (max-width: 992px) {
        width: 100%;
        height: 8rem;
    }
`;

interface MemebersPageProps {}
const MemebersPage: FunctionComponent<MemebersPageProps> = () => {
    const { user } = useUser({ redirectTo: '/members/login' });

    return (
        <Page>
            <NextSeo title="För Medlemmar" />

            <Container>
                <ProfileBanner />

                <Content>
                    <Sidebar></Sidebar>
                </Content>
            </Container>
        </Page>
    );
};

export default MemebersPage;
