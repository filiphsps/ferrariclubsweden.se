import { FunctionComponent } from 'react';
import { NextSeo } from 'next-seo';
import { Page } from '../../components/Page';

interface MemebersRegisterPageProps {}
const MemebersRegisterPage: FunctionComponent<
    MemebersRegisterPageProps
> = () => {
    return (
        <Page>
            <NextSeo title="Bli Medlem" />
        </Page>
    );
};

export default MemebersRegisterPage;
