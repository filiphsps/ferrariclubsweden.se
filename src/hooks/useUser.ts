import { useCallback, useEffect, useState } from 'react';

import { VerifyAuthUserApi } from '@/api/user';
import { useRouter } from 'next/router';

export const useUser = ({ redirectTo = '', redirectIfFound = false } = {}) => {
    const [user, setUser] = useState<{
        isLoggedIn: boolean;
        id?: string;
        name?: string;
        status?: string;
    } | null>();
    const router = useRouter();

    const authenticate = useCallback(async (email: string, password: string) => {
        // TODO: try auth
        localStorage.setItem('auth_token', btoa(`${email.toLowerCase()}:${password}`));

        // TODO: fetch user details
        var success = await VerifyAuthUserApi({});

        if (!success) throw new Error('Invalid details');

        setUser({
            isLoggedIn: success
        });
    }, []);

    useEffect(() => {
        function updateUser() {
            console.log('updateUser!!!');
            const token = localStorage?.getItem('auth_token');

            if (!token)
                setUser({
                    isLoggedIn: false
                });
            else setUser(null);
        }
        window.addEventListener('storage', updateUser);

        const token = localStorage?.getItem('auth_token');
        if (!token)
            return setUser({
                isLoggedIn: false
            });

        VerifyAuthUserApi({}).then((loggedIn: boolean) => {
            if (!loggedIn)
                return setUser({
                    isLoggedIn: false
                });

            setUser({
                isLoggedIn: true,
                name: 'Hello World'
            });
        });

        return () => {
            window.removeEventListener('storage', updateUser);
        };
    }, []);

    useEffect(() => {
        // if no redirect needed, just return (example: already on /dashboard)
        // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
        if (!redirectTo || !user) return;

        if (!user.isLoggedIn && !redirectIfFound) router.push(redirectTo);
        else if (user.isLoggedIn && redirectIfFound) router.push(redirectTo);
    }, [router, router.pathname, user, redirectTo, redirectIfFound]);

    return {
        authenticate,
        user
    };
};
