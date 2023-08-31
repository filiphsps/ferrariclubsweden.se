import { signOut, useSession } from 'next-auth/react';

import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { PageHeader } from '@/components/layout/page-header';
import { PrimaryButton } from '@/components/interactable/button';
import { ProfileHeader } from '@/components/layout/profiler-header';
import { Session } from '@/api/auth';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: var(--size-page-width);
    margin: 0px auto;

    @media (min-width: 992px) {
        padding: 2rem 0;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
`;

type MembersProfilePageProps = {};
const MembersProfilePage = ({}: MembersProfilePageProps) => {
    const { data } = useSession({ required: true });
    if (!data) return null;

    const { user } = data as Session;
    if (!user) return null;

    return (
        <Page>
            <NextSeo title="Din Profil" />

            <Container>
                <PageHeader
                    title="Din Profil"
                    actions={
                        <>
                            <PrimaryButton
                                title="Logga ut"
                                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                            >
                                Logga ut
                            </PrimaryButton>
                        </>
                    }
                />
                <ProfileHeader />

                <Content></Content>
            </Container>
        </Page>
    );
};

export default MembersProfilePage;
