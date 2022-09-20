import { FunctionComponent } from 'react';
import { NextSeo } from 'next-seo';
import { Page } from '../../components/Page';
import { useUser } from '../../hooks/useUser';

interface MemebersPageProps {}
const MemebersPage: FunctionComponent<MemebersPageProps> = () => {
    const {} = useUser({ redirectTo: '/members/login' });

    return (
        <Page>
            <NextSeo title="För Medlemmar" />
        </Page>
    );
};

export default MemebersPage;
