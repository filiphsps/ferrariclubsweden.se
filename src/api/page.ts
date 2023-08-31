import Client, { replaceWithCanonicalDomain } from './client';

import { gql } from '@apollo/client';

export type WPPage = {
    id: string;
    title: string;
    uri: string;
    slug: string;
    content: string;
    mfnItems: string;
    status: 'published';
};

interface PageApiProps {
    uri: string;
}

// FIXME: PageModel
export const PageApi = async ({ uri }: PageApiProps): Promise<WPPage> => {
    return new Promise(async (resolve, reject) => {
        // FIXME: Get user's authentication token
        // as we shouldn't show non-accessible pages.

        try {
            const { data, errors, error } = await (
                await Client()
            ).query({
                query: gql`
                    query PAGE_QUERY {
                        page(id: "${uri}", idType: URI) {
                            id
                            title
                            uri
                            slug
                            content
                            mfnItems
                            status
                        }
                    }
                `
            });

            if (errors || error) {
                throw errors || error;
            } else if (!data.page) {
                return reject({
                    statusCode: 404,
                    message: 'Page not found'
                });
            }

            const page = data.page;
            return resolve({
                ...page,
                content: replaceWithCanonicalDomain((page?.content as string) || ''),
                mfnItems: ((page?.mfnItems as string) || '')
                    .replaceAll('http:', 'https:')
                    .replaceAll('ferrariclubsweden.com', 'ferrariclubsweden.se')
                    .replaceAll('https:\\/\\/www.ferrariclubsweden.se\\/', '\\/')
                    .replaceAll('https:\\/\\/api.ferrariclubsweden.se\\/wordpress2016\\/', '\\/wp\\/')
                    .replaceAll('https:\\/\\/api.ferrariclubsweden.se\\/', '\\/wp\\/')
            });
        } catch (error) {
            console.error(error);
            return reject({
                statusCode: 500
            });
        }
    });
};
