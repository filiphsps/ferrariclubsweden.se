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

export default Client;
