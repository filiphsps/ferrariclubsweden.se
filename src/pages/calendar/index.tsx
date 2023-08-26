/* eslint-disable @next/next/no-css-tags */
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { PageApi, WPPage } from '@/api/page';

import { Frame } from '@/components/layout/frame';
import { FunctionComponent } from 'react';
import Head from 'next/head';
import { MuffinComponents } from '@/components/MuffinComponents';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: 58rem;

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

export const getStaticProps: GetStaticProps<WPPage> = async ({ params }) => {
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
