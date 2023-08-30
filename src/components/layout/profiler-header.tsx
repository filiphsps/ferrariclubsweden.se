import { signOut, useSession } from 'next-auth/react';

import Image from 'next/image';
import { Session } from '@/api/auth';
import styled from 'styled-components';

const Contaier = styled.section`
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 0 0 1em 0;
    margin-bottom: 1rem;

    border-bottom: 0.15rem solid var(--color-light-block);
`;

const About = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.75rem;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    color: var(--color-body-lighter);
`;
const Name = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
`;
const Email = styled.div`
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
`;

const Avatar = styled.div`
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    overflow: hidden;

    img {
        object-fit: contain;
    }
`;

const Actions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const Action = styled.button`
    text-transform: uppercase;
`;

type ProfileHeaderProps = {};
const ProfileHeader = ({}: ProfileHeaderProps) => {
    const { data } = useSession({ required: true });
    if (!data) return null;

    const { user } = data as Session;
    if (!user) return null;

    return (
        <Contaier>
            <About>
                <Avatar>
                    <Image alt="Profilbild" src={`https://${user.avatar?.url}`} fill />
                </Avatar>
                <Details>
                    <Name>{user.name}</Name>
                    <Email>{user.email}</Email>
                </Details>
            </About>
            <Actions>
                <Action onClick={() => signOut()}>Logga ut</Action>
            </Actions>
        </Contaier>
    );
};

export { ProfileHeader };
