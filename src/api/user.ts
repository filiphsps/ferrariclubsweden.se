import { DocumentNode, gql } from '@apollo/client';

import { GQLFetcher } from './client';

interface CurrentUserApiProps {
    id: string;
    fields: DocumentNode;
}
export const CurrentUserApi = async ({ id, fields }: CurrentUserApiProps) => {
    const query = gql`
        query user($id: ID!) {
            user(id: $id) {
                {fields}
            }
        }
    `;

    const variables = {
        id
    };

    const { data: res, errors } = await (
        await GQLFetcher({
            headers: {}
        })
    ).query({
        query,
        variables
    });

    if (errors) {
        throw new Error(res.errors[0].message);
    }

    return res;
};
