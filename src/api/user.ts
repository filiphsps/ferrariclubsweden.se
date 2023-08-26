import Client from './client';
import { gql } from '@apollo/client';

interface VerifyAuthApiProps {}
export const VerifyAuthUserApi = async ({}: VerifyAuthApiProps): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        let token = localStorage.getItem('auth_token');
        if (!token || token == '') return resolve(false);

        let email = atob(token).split(':')[0].replace('Basic ', '');

        try {
            const { data } = await Client.query({
                query: gql`
                    query VERIFY_AUTH_USER_QUERY {
                        users(where: { searchColumns: EMAIL, search: "${email}"}) {
                            nodes {
                                email
                            }
                        }
                    }
                `
            });

            if (!data || data?.users?.nodes?.length <= 0) return resolve(false);

            if (data?.users?.nodes?.[0]?.email !== email) return resolve(false);

            return resolve(true);
        } catch (err) {
            console.error(err);
            return reject();
        }
    });
};
