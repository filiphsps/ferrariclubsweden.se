import { FunctionComponent } from 'react';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
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
const Explainer = styled.div`
    p {
        margin-bottom: 0.75rem;

        font-size: 0.95rem;
        line-height: 1.5;

        color: var(--color-body-lighter);
    }
`;

interface MemebersProfilePageProps {}
const MemebersProfilePage: FunctionComponent<MemebersProfilePageProps> = () => {
    const { data } = useSession({
        required: true
    });
    const session = data as Session;

    return (
        <Page>
            <NextSeo title="För Medlemmar" />

            <Container>
                <Content>
                    <Title>Hej {session?.user?.firstName || session?.user?.name}!</Title>
                    <Explainer>
                        <p>Håll utkik här, för nu kommer de änna gå riktigt fort.</p>
                    </Explainer>
                </Content>
            </Container>
        </Page>
    );
};

export default MemebersProfilePage;
