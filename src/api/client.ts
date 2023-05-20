import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://api.ferrariclubsweden.se/wordpress2016/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage?.getItem?.("auth_token");

    return {
        headers: {
            ...headers,
            authorization: token ? `Basic ${token}` : "",
        }
    }
});

const Client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

export default Client;
