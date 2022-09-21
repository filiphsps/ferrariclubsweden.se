import { FunctionComponent } from 'react';
import { Page } from '../components/Page';
import styled from 'styled-components';

interface CustomPageProps {}
const CustomPage: FunctionComponent<CustomPageProps> = () => {
    return (
        <Page>
            <h2>TODO</h2>
        </Page>
    );
};

/*export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const page = await PageApi({
        uri: '/'
    });

    return {
        props: {
            data: {
                page
            }
        },
        revalidate: 10
    };
};*/

export default CustomPage;
