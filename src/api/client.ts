import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { getSession } from 'next-auth/react';

const httpLink = createHttpLink({
    uri: 'https://api.ferrariclubsweden.se/graphql'
});

export const redirects = [
    ['/logga-ut/', '/members/logout/'],
    ['/login/', '/members/login/'],
    ['/bli-medlem/', '/members/register/'],
    ['/medlemsskap/', '/members/register/'],
    ['/medlemssida/', '/members/'],
    ['/medlemmar/', '/members/'],
    ['/members/', '/members/profile/'],
    ['/kalender/', '/calendar/'],
    ['/nyheter/', '/news/']
];
export const getCanonicalPath = (path: string) => {
    if (path === '/' || path === '#') return path;

    const redirect = redirects.find((item) => item.at(0)!.startsWith(path));
    if (redirect) {
        return redirect[1];
    }

    return path;
};

export const replaceWithCanonicalDomain = (content: string) => {
    return content
        .replaceAll('http://', 'https://')
        .replaceAll('ferrariclubsweden.com', 'ferrariclubsweden.se')
        .replaceAll('https://www.ferrariclubsweden.se/', '/')
        .replaceAll('https://api.ferrariclubsweden.se/wordpress2016/', '/wp/')
        .replaceAll('https://api.ferrariclubsweden.se/', '/wp/')
        .replaceAll('/api/events/', '/events/')
        .replaceAll('/wp/events/', '/events/');
};

export const GQLFetcher = async ({ headers }: any) => {
    const session: any = await getSession();

    let cleanedHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...((session?.authToken &&
            headers?.Authorization === undefined && {
                Authorization: `Bearer ${session.authToken}`
            }) ||
            {}),
        ...(headers || {})
    };

    if (cleanedHeaders.Authorization === '') delete cleanedHeaders.Authorization;

    return new ApolloClient({
        cache: new InMemoryCache({
            addTypename: false
        }),
        link: httpLink,
        headers: cleanedHeaders
    });
};

const Client = async () => await GQLFetcher({});

export default Client;
