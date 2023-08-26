/* eslint-disable @next/next/no-css-tags */
import * as cheerio from 'cheerio';

import { GetStaticPaths, GetStaticProps } from 'next';

import { FiChevronLeft } from 'react-icons/fi';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: 58rem;

    margin: 0px auto;
    padding: 2rem 1rem 1rem 1rem;
`;

const ContentContainer = styled.section`
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

        .mec-event-meta {
        }
    }
`;

const Header = styled.section`
    --action-height: 2rem;
    height: var(--action-height);
`;
const ReturnAction = styled(Link)`
    display: flex;
    justify-content: start;
    align-items: center;
    height: var(--action-height);

    line-height: 1;
    font-size: 1.05rem;
    text-transform: uppercase;
    font-weight: 500;

    color: var(--color-body-lighter);

    svg,
    span {
        display: block;
    }

    svg {
        font-size: 1.25rem;
        margin: 0 -0.15rem 0 -0.3rem;
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
            <NextSeo title={`${title} | Event`} />

            <Container>
                <Header>
                    <ReturnAction href="/calendar/">
                        <FiChevronLeft />
                        <span>Tillbaka</span>
                    </ReturnAction>
                </Header>

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

const styleBlacklist = ['mec-font-icons-css', 'mec-google-fonts-css'];
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params!.event as string;

    const target = await fetch(`https://api.ferrariclubsweden.se/events/${id}?iframe`).then((res) => res.text());
    const dom = cheerio.load(target);
    const title = dom('title').text().replaceAll('–', '-').split(' - ').at(0);
    const body = dom('#main-content').html()?.replaceAll(`href="http://"`, 'href="#"');

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
