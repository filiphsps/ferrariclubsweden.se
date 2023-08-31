import { GQLFetcher, replaceWithCanonicalDomain } from './client';

import { gql } from '@apollo/client';

type Post = {
    id: string;
    slug: string;
    uri: string;
    title: string;
    date: string;
    content: string;
    excerpt: string;
};

type PostApiProps = {
    slug: string;
};
// FIXME: Postodel
export const PostApi = async ({ slug }: PostApiProps): Promise<Post> => {
    return new Promise(async (resolve, reject) => {
        if (!slug)
            return reject({
                statusCode: 400
            });

        try {
            const { data, errors, error } = await (
                await GQLFetcher({})
            ).query({
                query: gql`
                    query Post($id: ID!) {
                        post(id: $id, idType: SLUG) {
                            id
                            slug
                            uri
                            title
                            date
                            content
                        }
                    }
                `,
                variables: {
                    id: slug
                }
            });

            if (errors || error) {
                throw errors || error;
            } else if (!data.post) {
                return reject({
                    statusCode: 404,
                    message: 'Post not found'
                });
            }

            return resolve({
                ...data.post,
                content: replaceWithCanonicalDomain(data.post.content)
            });
        } catch (error) {
            console.error(error);
            return reject({
                statusCode: 500
            });
        }
    });
};

type PostsApiProps = {};
export const PostsApi = async ({}: PostsApiProps): Promise<Post[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data, errors, error } = await (
                await GQLFetcher({})
            ).query({
                query: gql`
                    query Posts {
                        posts(where: { tag: "Ferrari" }) {
                            edges {
                                node {
                                    id
                                    slug
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
            console.log(data.posts);

            if (errors || error) {
                throw errors || error;
            } else if (!data?.posts?.edges || !data?.posts?.edges.length) {
                return resolve([]); // TODO: Is this correct? Should we reject?
            }

            console.log('!!', data?.posts, errors, error);
            return resolve(data.posts.edges);
        } catch (error: any) {
            console.error(error);
            return reject({
                statusCode: 500
            });
        }
    });
};
