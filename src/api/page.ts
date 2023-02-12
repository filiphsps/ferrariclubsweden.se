import Client from './client';
import { gql } from '@apollo/client';

interface PageApiProps {
    uri: string;
}
// FIXME: PageModel
export const PageApi = async ({ uri }: PageApiProps): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        // FIXME: Get user's authentication token
        // as we shouldn't show non-accessible pages.

        try {
            const { data } = await Client.query({
                query: gql`
                    query PAGE_QUERY {
                        page(id: "${uri}", idType: URI) {
                            id
                            title
                            uri
                            slug
                            content
                            mfnItems
                            status
                        }
                    }
                `
            });

            resolve(data.page);
        } catch (err) {
            console.error(err);
            reject();
        }
    });
};
