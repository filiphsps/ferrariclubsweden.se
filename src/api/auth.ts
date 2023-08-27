import { GQLFetcher } from './client';
import type { Session as NextAuthSession } from 'next-auth';
import { gql } from '@apollo/client';

export type User = {
    id: string;
    authToken: string;
    refreshToken: string;
    userData: any;
};

export type Session = NextAuthSession & {
    isLoggedIn?: boolean;
    authToken?: string;
    userData?: any;
    user?: {
        id?: string | null;
        userId?: string | null;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
};

type FetchResult =
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
      };

export default async function fetchAPI(query: any, { variables }: any = {}, headers: any = {}): Promise<FetchResult> {
    try {
        const { data, errors } = await (
            await GQLFetcher({ headers })
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

const LOGIN = /* GraphQL */ gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            authToken
            refreshToken
            user {
                id
                userId
                email
                name
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

    const res = await fetchAPI(LOGIN, { variables });

    if (res?.errors) {
        throw new Error(res.errors[0].message);
    }

    return res;
};

interface AuthRefreshTokenApiProps {
    refreshToken: any; // TODO: string;
}
export const AuthRefreshTokenApi = async ({ refreshToken }: AuthRefreshTokenApiProps) => {
    const query = /* GraphQL */ `
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

    const res = await fetchAPI(query, { variables });

    if (res?.errors) {
        throw new Error(res.errors[0].message);
    }

    return res;
};
