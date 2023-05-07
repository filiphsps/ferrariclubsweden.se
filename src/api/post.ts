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
                const { data } = await Client.query({
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
            } catch (err) {
                console.error(err);
                reject();
            }
            return;
        }

        try {
            const { data } = await Client.query({
                query: gql`
                    query POSTS_QUERY {
                        posts {
                            edges {
                                node {
                                    id
                                    uri
                                    title
                                    date
                                }
                            }
                        }
                    }
                `
            });

            console.log(data.posts)
            resolve(data.posts.edges);
        } catch (err) {
            console.error(err);
            reject();
        }
    });
};
