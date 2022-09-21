import { ApolloClient, InMemoryCache } from '@apollo/client';

const Client = new ApolloClient({
    uri: 'https://www.ferrariclubsweden.se/wordpress2016/graphql',
    cache: new InMemoryCache()
});

export default Client;
