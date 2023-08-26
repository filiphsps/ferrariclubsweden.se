import { FunctionComponent } from 'react';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import styled from 'styled-components';

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

interface MemebersPageProps {}
const MemebersPage: FunctionComponent<MemebersPageProps> = () => {
    return (
        <Page>
            <NextSeo title="För Medlemmar" />

            <Container>
                <Content>Kommer inom kort!</Content>
            </Container>
        </Page>
    );
};

export default MemebersPage;
