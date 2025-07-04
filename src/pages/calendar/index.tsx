/* eslint-disable @next/next/no-css-tags */
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { WPPage } from '@/api/page';
import { PageApi } from '@/api/page';

import type { FunctionComponent } from 'react';
import { MuffinComponents } from '@/components/MuffinComponents';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: var(--size-page-width);

    margin: 0px auto;
    padding: 1rem;
`;

const ContentContainer = styled.div`
    p {
        line-height: 1.15;
    }
    a {
        color: var(--color-primary);

        &:hover {
            text-decoration: underline;
        }
    }
`;

const CalendarPage: FunctionComponent<InferGetStaticPropsType<typeof getStaticProps>> = ({
    title,
    content,
    mfnItems
}) => {
    return (
        <Page>
            <NextSeo title={title} />

            <Container>
                {mfnItems && <MuffinComponents data={JSON.parse(mfnItems)} />}
                <ContentContainer
                    dangerouslySetInnerHTML={{
                        __html: content
                    }}
                />
            </Container>
        </Page>
    );
};

export const getStaticProps: GetStaticProps<WPPage> = async ({}) => {
    const page = await PageApi({
        uri: `/kalender/`
    });

    const content = (page.content || '').replaceAll('/events/', '/calendar/events/');

    return {
        props: {
            ...page,
            content
        },
        revalidate: 10
    };
};

export default CalendarPage;
