import type { ISODateString, Session as NextAuthSession } from 'next-auth';

import { GQLFetcher } from './client';
import { gql } from '@apollo/client';

export type User = {
    id?: string | null;
    userId?: string | null;
    email?: string | null;
    name?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
};

export type Session = NextAuthSession & {
    isLoggedIn?: boolean;
    authToken?: string;
    expires: ISODateString;
    user?: User;
};

/* type FetchResult =
    | {
          authToken: string;
          refreshToken: string;
          user: User;
          errors: undefined;
      }
    | {
          errors: Array<{
              message: string;
          }>;
      }; */
export default async function fetchAPI(query: any, { variables }: any = {}, headers: any = {}): Promise<any> {
    try {
        const { data, errors } = await (
            await GQLFetcher({
                headers: headers || {}
            })
        ).mutate({
            mutation: query,
            variables
        });

        if (errors) {
            console.error(errors);
            throw new Error('Failed to fetch API');
        }

        return data;
    } catch (e: any) {
        return {
            errors: [e]
        };
    }
}

const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            authToken
            refreshToken
            user {
                id
                userId
                email
                name
                firstName
                lastName
            }
        }
    }
`;

interface AuthWithPasswordApiProps {
    username: string;
    password: string;
}
export const AuthWithPasswordApi = async ({ username, password }: AuthWithPasswordApiProps) => {
    const variables = {
        input: {
            provider: 'PASSWORD',
            credentials: {
                username,
                password
            }
        }
    };

    const res = await fetchAPI(
        LOGIN,
        { variables },
        {
            Authorization: ''
        }
    );

    if (res?.errors) {
        throw new Error(res.errors[0].message);
    }

    return res.login;
};

interface AuthRefreshTokenApiProps {
    refreshToken: any; // TODO: string;
}
export const AuthRefreshTokenApi = async ({ refreshToken }: AuthRefreshTokenApiProps) => {
    const query = gql`
        mutation RefreshAuthToken($input: RefreshAuthTokenInput!) {
            refreshToken(input: $input) {
                authToken
            }
        }
    `;

    const variables = {
        input: {
            refreshToken
        }
    };

    const res = await fetchAPI(
        query,
        { variables },
        {
            Authorization: ''
        }
    );

    if (res?.errors) {
        throw new Error(res.errors[0].message);
    }

    return res;
};

interface SendPasswordResetEmailApiProps {
    username: string;
}
export const SendPasswordResetEmailApi = async ({ username }: SendPasswordResetEmailApiProps) => {
    const query = gql`
        mutation SendPasswordResetEmail($input: SendPasswordResetEmailInput!) {
            sendPasswordResetEmail(input: $input) {
                success
            }
        }
    `;

    const variables = {
        input: { username }
    };

    const res = await fetchAPI(query, { variables }, {});

    if (res?.errors) {
        throw new Error(res.errors[0].message);
    }

    return res;
};
