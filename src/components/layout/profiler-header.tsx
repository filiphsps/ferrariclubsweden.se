/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react';

import { PrimaryButton } from '../interactable/button';
import { Session } from '@/api/auth';
import styled from 'styled-components';

const Contaier = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;

    border-bottom: 0.15rem solid var(--color-light-block);

    @media (min-width: 992px) {
        grid-template-columns: 1fr auto;
        padding: 0 1rem;
        border-bottom: none;
    }
`;

const About = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: start;
    align-items: center;
    gap: 0.75rem;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0rem;
    color: var(--color-body-lighter);

    @media (min-width: 992px) {
        gap: 0.15rem;
    }
`;
const Name = styled.div`
    font-size: 1.25rem;
    font-weight: 600;

    @media (min-width: 992px) {
        font-size: 1.5rem;
    }
`;
const Email = styled.div`
    font-size: 0.75rem;
    font-weight: 500;

    @media (min-width: 992px) {
        font-size: 1rem;
    }
`;

const Avatar = styled.div`
    position: relative;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 100%;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const Actions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 0.5rem;

    @media (min-width: 992px) {
        align-items: end;
    }
`;

type ProfileHeaderProps = {};
const ProfileHeader = ({}: ProfileHeaderProps) => {
    const { data } = useSession({ required: true });
    if (!data) return null;

    const { user } = data as Session;
    if (!user) return null;

    const avatar = `${
        (user.avatar?.url && user.avatar?.url!.split('?').at(0)!) || '//www.gravatar.com/avatar/default.jpg'
    }?d=identicon`;

    return (
        <Contaier>
            <About>
                <Avatar>
                    <img alt="Profilbild" src={avatar} />
                </Avatar>
                <Details>
                    <Name>{user.name}</Name>
                    <Email>{user.email}</Email>
                </Details>
            </About>
            <Actions>
                <PrimaryButton title="Logga ut" onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
                    Logga ut
                </PrimaryButton>
            </Actions>
        </Contaier>
    );
};

export { ProfileHeader };
