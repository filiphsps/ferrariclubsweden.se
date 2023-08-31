import { GQLFetcher, replaceWithCanonicalDomain } from './client';

import { User } from './auth';
import { gql } from '@apollo/client';

export type WPPost = {
    id: string;
    slug: string;
    uri: string;
    title: string;
    date: string;
    content: string;
    excerpt?: string;
    commentStatus?: 'open' | 'closed';
    commentCount?: number;
};

export type WPPostComment = {
    id: string;
    databaseId: number;
    content: string;
    date: string;
    author: User;
};

type PostApiProps = {
    slug: string;
};
export const PostApi = async ({ slug }: PostApiProps): Promise<WPPost> => {
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
                            commentStatus
                            commentCount
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

type PostCommentsApiProps = {
    slug: string;
    parent: number | null;
};
export const PostCommentsApi = async ({ slug, parent }: PostCommentsApiProps): Promise<WPPostComment[]> => {
    return new Promise(async (resolve, reject) => {
        if (!slug)
            return reject({
                statusCode: 400
            });

        try {
            const { data, errors, error } = await (
                await GQLFetcher({})
            ).query({
                // FIXME: Pagination
                // , where: { parent: null }
                query: gql`
                    query Post($id: ID!, $parent: Int) {
                        post(id: $id, idType: SLUG) {
                            comments(first: 100, where: { parent: $parent, orderby: COMMENT_DATE, order: ASC }) {
                                edges {
                                    node {
                                        id
                                        databaseId
                                        content
                                        date
                                        author {
                                            node {
                                                name
                                                avatar {
                                                    url
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                `,
                variables: {
                    id: slug,
                    parent
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

            const comments = data.post.comments.edges.map((item: any) => ({
                ...item.node,
                author: item.node.author.node
            }));
            return resolve(comments);
        } catch (error) {
            console.error(error);
            return reject({
                statusCode: 500
            });
        }
    });
};

type PostsApiProps = {};
export const PostsApi = async ({}: PostsApiProps): Promise<WPPost[]> => {
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

            if (errors || error) {
                throw errors || error;
            } else if (!data?.posts?.edges || !data?.posts?.edges.length) {
                return resolve([]); // TODO: Is this correct? Should we reject?
            }

            return resolve(data.posts.edges);
        } catch (error: any) {
            console.error(error);
            return reject({
                statusCode: 500
            });
        }
    });
};
