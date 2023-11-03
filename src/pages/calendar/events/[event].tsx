/* eslint-disable @next/next/no-css-tags */
import * as cheerio from 'cheerio';

import type { GetStaticPaths, GetStaticProps } from 'next';

import type { FunctionComponent } from 'react';
import { NextSeo } from 'next-seo';
import { Page } from '@/components/Page';
import { PageContainer } from '@/components/layout/page-container';
import { PageContent } from '@/components/layout/page-content';
import { PageHeader } from '@/components/layout/page-header';
import { ReturnFooter } from '@/components/blog/return-footer';
import styled from 'styled-components';

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
            font-size: 2rem;
            line-height: 1;
            letter-spacing: 0;
            margin-bottom: 1rem;

            @media (min-width: 992px) {
                font-size: 2.5rem;
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
                        margin-bottom: 0.75rem;

                        font-size: 0.95rem;
                        line-height: 1.5;
                    }

                    & > :last-child {
                        margin-bottom: 0;
                    }
                }

                img {
                    max-width: 100%;
                    object-fit: cover;

                    @media (max-width: 992px) {
                        width: 100%;
                    }
                }
            }

            .mec-event-meta {
                margin-bottom: 0;

                @media (min-width: 992px) {
                    position: sticky;
                    top: 1rem;
                }

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

interface EventPageProps {
    id: string;
    title: string;
    body: string;
}
const EventPage: FunctionComponent<EventPageProps> = ({ title, body }) => {
    return (
        <Page>
            <NextSeo title={`${title} | Event`} />

            <PageContainer>
                <PageHeader title={title} />

                <PageContent>
                    <ContentContainer
                        dangerouslySetInnerHTML={{
                            __html: body || ''
                        }}
                    />
                </PageContent>

                <ReturnFooter path="/calendar/" />
            </PageContainer>
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

    dom('h1').remove();
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
