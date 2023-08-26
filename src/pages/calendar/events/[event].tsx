/* eslint-disable @next/next/no-css-tags */
import * as cheerio from 'cheerio';

import { GetStaticPaths, GetStaticProps } from 'next';

import { Frame } from '@/components/layout/frame';
import { FunctionComponent } from 'react';
import Head from 'next/head';
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

    .mec-wrap article.mec-single-event {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;

        @media (min-width: 992px) {
            grid-template-columns: 1fr 20rem;
            gap: 2rem;
        }

        .col-md-4,
        .col-md-8 {
            width: 100%;
            padding: 0;
        }

        .mec-event-content {
            padding: 0 0 0 0;
            margin: 0;
        }
    }
`;

interface EventPageProps {
    id: string;
    title: string;
    body: string;
}
const EventPage: FunctionComponent<EventPageProps> = ({ title, body }) => {
    return (
        <Page>
            <NextSeo title={`${title} - Event`} />
            <Head>
                <link
                    rel="stylesheet"
                    href="https://api.ferrariclubsweden.se/wp-content/plugins/modern-events-calendar/assets/css/iconfonts.css"
                />
                <link
                    rel="stylesheet"
                    href="https://api.ferrariclubsweden.se/wp-content/plugins/modern-events-calendar/assets/css/frontend.min.css?ver=6.3"
                />
            </Head>

            <Container>
                <ContentContainer
                    dangerouslySetInnerHTML={{
                        __html: body || ''
                    }}
                />
            </Container>
        </Page>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // FIXME: Get paths
    return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params!.event as string;

    const target = await fetch(`https://api.ferrariclubsweden.se/events/${id}?iframe`).then((res) => res.text());
    const dom = cheerio.load(target);
    const title = dom('title').text().split(' - ').at(0);
    const body = dom('#main-content').html();

    return {
        props: {
            id,
            title,
            body
        },
        revalidate: 10
    };
};

export default EventPage;
