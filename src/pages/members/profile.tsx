import { signOut, useSession } from 'next-auth/react';

import { Card } from '@/components/Card';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { PageContainer } from '@/components/layout/page-container';
import { PageContent } from '@/components/layout/page-content';
import { PageHeader } from '@/components/layout/page-header';
import { PrimaryButton } from '@/components/interactable/button';
import { ProfileHeader } from '@/components/layout/profiler-header';
import { Session } from '@/api/auth';
import styled from 'styled-components';

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 992px) {
        justify-content: start;
        align-items: start;
    }
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

            <PageContainer>
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

                <PageContent>
                    {!user.isRestricted && (
                        <CardContainer>
                            <Card />
                        </CardContainer>
                    )}
                </PageContent>
            </PageContainer>
        </Page>
    );
};

export default MembersProfilePage;
