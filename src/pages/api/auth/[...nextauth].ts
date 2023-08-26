import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';

const providers = [
    CredentialsProvider({
        name: 'Ferrari Club Sweden',
        id: 'credentials',
        credentials: {
            username: { label: 'Username', type: 'text' },
            password: { label: 'Password', type: 'password' }
        },
        async authorize() {
            return null;
        }
    })
];

export default NextAuth({
    providers
});
