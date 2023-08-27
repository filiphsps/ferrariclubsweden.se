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
    max-width: var(--size-page-width);

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

    .mec-wrap {
        .mec-event-content {
            width: 100%;
        }

        .mec-single-title {
            font-family: var(--font-secondary);
            font-size: clamp(2rem, 8vw, 5rem);
            line-height: 1;
            letter-spacing: 0;
            margin-bottom: 1rem;

            @media (min-width: 992px) {
                font-size: 2.25rem;
            }
        }

        article.mec-single-event {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            width: 100%;

            @media (min-width: 992px) {
                grid-template-columns: auto 20rem;
                gap: 1rem;
            }

            .col-md-4,
            .col-md-8 {
                width: auto;
                padding: 0;
            }

            .mec-event-content {
                padding: 0;
                margin: 0;

                .mec-events-content {
                    margin-bottom: 0px;

                    p {
                        margin-bottom: 1rem;
                    }

                    & > :last-child {
                        margin-bottom: 0;
                    }
                }

                img {
                    max-width: 100%;
                }
            }

            .mec-event-meta {
                margin-bottom: 0;

                &.mec-frontbox {
                    padding: 1rem;
                }

                div[class^='mec-'] {
                    margin-bottom: 0.75rem;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
            .mec-attendees-list-details {
                margin-top: 1rem;
                margin-bottom: 0;
            }
        }
    }
`;

const Footer = styled.section`
    --action-height: 2rem;
    height: var(--action-height);
    margin: 0 0 1rem 0;
`;
const ReturnAction = styled(Link)`
    display: flex;
    justify-content: start;
    align-items: center;
    height: var(--action-height);

    line-height: 1;
    font-size: 0.95rem;
    font-family: var(--font-primary);
    text-transform: uppercase;
    font-weight: 500;

    color: var(--color-body-lighter);

    svg,
    span {
        display: block;
    }

    svg {
        font-size: 0.95rem;
        margin: -0.05rem 0 0 -0.3rem;
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
                <ContentContainer
                    dangerouslySetInnerHTML={{
                        __html: body || ''
                    }}
                />

                <Footer>
                    <ReturnAction href="/calendar/">
                        <FiChevronLeft />
                        <span>Tillbaka</span>
                    </ReturnAction>
                </Footer>
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
