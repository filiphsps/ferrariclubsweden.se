import { GQLFetcher } from './client';
import { gql } from '@apollo/client';

interface PostApiProps {
    uri: string;
}
// FIXME: Postodel
export const PostApi = async ({ uri }: PostApiProps): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await (
                await GQLFetcher({})
            ).query({
                query: gql`
                    query Post($id: ID!) {
                        post(id: $id, idType: URI) {
                            id
                            uri
                            title
                            date
                            content
                        }
                    }
                `,
                variables: {
                    id: uri
                }
            });

            resolve(data.post);
        } catch (error) {
            console.error(error);
            reject();
        }
        return;
    });
};

interface PostsApiProps {}
export const PostsApi = async ({}: PostsApiProps): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data, errors } = await (
                await GQLFetcher({})
            ).query({
                query: gql`
                    query Posts {
                        posts(first: 100) {
                            edges {
                                node {
                                    id
                                    uri
                                    title
                                    date
                                    excerpt
                                }
                            }
                        }
                    }
                `
            });

            console.log('!!', data?.posts, errors);
            resolve(data.posts.edges);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
};
