import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { getSession } from 'next-auth/react';

const httpLink = createHttpLink({
    uri: 'https://api.ferrariclubsweden.se/graphql'
});

export const redirects = [
    ['/logga-ut/', '/members/logout/'],
    ['/login/', '/members/login/'],
    ['/medlemsskap/', '/members/register/'],
    ['/medlemssida/', '/members/'],
    ['/kalender/', '/calendar/']
];
export const getCanonicalPath = (path: string) => {
    if (path === '/' || path === '#') return path;

    const redirect = redirects.find((item) => item.at(0)!.startsWith(path));
    if (redirect) {
        return redirect[1];
    }

    return path;
};

export const GQLFetcher = async ({ headers }: any) => {
    const session: any = await getSession();

    return new ApolloClient({
        cache: new InMemoryCache({
            addTypename: false
        }),
        link: httpLink,
        headers: {
            ...(headers || {}),
            ...((session?.authToken && {
                Authorization: `Bearer ${session.authToken}`
            }) ||
                {})
        }
    });
};

const Client = async () => await GQLFetcher({}); /* new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
});*/

export default Client;
