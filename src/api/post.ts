import Client from './client';
import { gql } from '@apollo/client';

interface PostApiProps {
    uri?: string;
}
// FIXME: Postodel
export const PostApi = async ({ uri }: PostApiProps): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        // FIXME: Get user's authentication token
        // as we shouldn't show non-accessible posts.

        if (uri != null) {
            try {
                const { data } = await (
                    await Client()
                ).query({
                    query: gql`
                        query POST_QUERY {
                            post(id: "${uri}", idType: URI) {
                                id
                                uri
                                title
                                date
                                content
                            }
                        }
                    `
                });

                resolve(data.post);
            } catch (error) {
                console.error(error);
                reject();
            }
            return;
        }

        try {
            const { data } = await (
                await Client()
            ).query({
                query: gql`
                    query POSTS_QUERY {
                        posts {
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
            resolve(data.posts.edges);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
};
