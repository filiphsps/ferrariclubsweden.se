import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { Title } from '@/components/typography/title';
import { signOut } from 'next-auth/react';
import styled from 'styled-components';

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
    gap: 2rem;
    max-width: 28rem;
    width: 100%;
    text-align: center;
`;

interface MembersLogoutPageProps {}
const MembersLogoutPage = ({}: MembersLogoutPageProps) => {
    // Ugly, probably shouldn't be done like this
    signOut({ callbackUrl: '/' });

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

export default MembersLogoutPage;
