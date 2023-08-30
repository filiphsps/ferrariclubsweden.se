import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { ProfileHeader } from '@/components/layout/profiler-header';
import { Session } from '@/api/auth';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: var(--size-page-width);

    margin: 0px auto;
    padding: 2rem 1rem 1rem 1rem;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Title = styled.h1`
    margin-bottom: 1rem;

    font-family: var(--font-secondary);
    font-size: clamp(2rem, 8vw, 5rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0;
    text-transform: uppercase;

    color: var(--color-body-lighter);

    @media (min-width: 992px) {
        font-size: 2.25rem;
    }
`;

interface MembersProfilePageProps {}
const MembersProfilePage = ({}: MembersProfilePageProps) => {
    const { data } = useSession({ required: true });
    if (!data) return null;

    const { user } = data as Session;
    if (!user) return null;

    return (
        <Page>
            <NextSeo title="Din Profil" />

            <Container>
                <ProfileHeader />

                <Content>
                    <Title>Din Profil</Title>
                </Content>
            </Container>
        </Page>
    );
};

export default MembersProfilePage;
