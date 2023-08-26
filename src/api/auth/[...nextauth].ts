import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthAdapter } from '@blitzjs/auth/next-auth';
import { api } from '@/blitz/server';

export default api(
    NextAuthAdapter({
        successRedirectUrl: '/',
        errorRedirectUrl: '/error',
        secureProxy: true,
        providers: [
            CredentialsProvider({
                credentials: {
                    username: { label: 'Username' },
                    password: { label: 'Password', type: 'password' }
                },
                async authorize() {
                    return null;
                }
            })
        ],
        callback: async (user, account, profile, session) => {
            await session.$create({
                userId: user.id
            });
        }
    })
);
