import { AuthRefreshTokenApi, AuthWithPasswordApi, SendPasswordResetEmailApi, Session } from '@/api/auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';

const providers = [
    CredentialsProvider({
        name: 'Ferrari Club Sweden',
        credentials: {
            username: { label: 'E-mail eller Användarenamn', type: 'text' },
            password: { label: 'Lösenord', type: 'password' }
        },
        async authorize(credentials) {
            if (!credentials) return null;

            if ((credentials as any).type === 'reset') {
                const reset = await SendPasswordResetEmailApi({
                    username: credentials.username
                });

                return null;
            }

            const user = (await AuthWithPasswordApi(credentials)) as any;
            if (user) {
                return user;
            }

            return null;
        }
    })
];

export default NextAuth({
    providers,
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                return {
                    ...token,
                    ...user
                };
            }

            // TODO: Handle expiry
            if (token?.authToken) return token;

            try {
                if (token?.refreshToken) {
                    // if we have a refresh token, we'll try to get a new auth token.
                    const newTokens = await AuthRefreshTokenApi({
                        refreshToken: token.refreshToken
                    });

                    // If we got a new auth token, we'll update the token.
                    if (newTokens?.authToken) {
                        token.authToken = newTokens.authToken;
                    } else {
                        // If we didn't that mean's the refresh token is no longer valid, so we'll remove it.
                        delete token.authToken;
                        delete token.refreshToken;
                    }
                }
            } catch {
                // Likewise, if we got an error, we want to remove the refresh token.
                delete token.authToken;
                delete token.refreshToken;
            }

            return token;
        },
        session: async ({ session, token }: { session: Session; token: any }) => {
            // If we have an auth token, that means the user is logged in.
            if (token?.authToken) {
                session.isLoggedIn = true;
                session.user = token.user;
                session.authToken = token.authToken;
                // We don't store the refresh token, since we don't need it in our frontend.
            } else {
                // This means the user is not logged in.
                session.isLoggedIn = false;
                delete session.authToken;
                // We don't delete stale userData, to help the user log back in.
            }

            return session as Session;
        }
    },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/members/login',
        signOut: '/members/logout'
    }
});
