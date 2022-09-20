import Router from 'next/router';
import { useEffect } from 'react';

export const useUser = ({ redirectTo = '' } = {}) => {
    useEffect(() => {
        if (!redirectTo) return;

        Router.push(redirectTo);
    }, [redirectTo]);

    return {};
};
