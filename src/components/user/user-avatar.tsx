/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';

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

type UserAvatarProps = {
    size: string;
    url?: string | null;
};
export const UserAvatar = ({ size, url }: UserAvatarProps) => {
    const avatar = `${(url && url!.split('?').at(0)!) || '//www.gravatar.com/avatar/default.jpg'}?d=identicon`;

    return (
        <Contaier
            style={{
                width: size,
                height: size
            }}
        >
            <img alt="Profilbild" src={avatar} />
        </Contaier>
    );
};
