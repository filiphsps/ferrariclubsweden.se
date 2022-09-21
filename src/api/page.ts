import Client from './client';
import { gql } from '@apollo/client';

interface PageApiProps {
    uri: string;
}
// FIXME: PageModel
export const PageApi = async ({ uri }: PageApiProps): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await Client.query({
                query: gql`
                    query PAGE_QUERY {
                        page(id: "${uri}", idType: URI) {
                            title
                            uri
                            slug
                            content
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
