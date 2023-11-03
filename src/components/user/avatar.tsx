import type { Session } from '@/api/auth';
import styled from 'styled-components';
/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react';

const Contaier = styled.div`
    position: relative;
    border-radius: 100%;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

type AvatarProps = {
    size: string;
};
export const Avatar = ({ size }: AvatarProps) => {
    const { data } = useSession();
    if (!data) return null;

    const { user } = data as Session;
    if (!user) return null;

    const avatar = `${
        /*(user.avatar?.url && user.avatar?.url!.split('?').at(0)!) ||*/ '//www.gravatar.com/avatar/default.jpg'
    }?d=identicon`;

    return (
        <Contaier
            title={user.name!}
            style={{
                width: size,
                height: size
            }}
        >
            <img alt="Profilbild" src={avatar} />
        </Contaier>
    );
};
