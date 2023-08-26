import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://api.ferrariclubsweden.se/graphql'
});

const authLink = setContext((_, { headers }) => {
    let token: string | null = null;
    if (typeof window !== 'undefined') {
        token = localStorage ? localStorage?.getItem?.('auth_token') : null;
    }

    return {
        headers: {
            ...headers,
            authorization: token ? `Basic ${token}` : ''
        }
    };
});

const Client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
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

export default Client;
