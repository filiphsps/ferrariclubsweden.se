import { Avatar } from '@/components/user/avatar';
import { FiEdit } from 'react-icons/fi';
import Link from 'next/link';
import { Session } from '@/api/auth';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';

const Contaier = styled.section`
    display: grid;
    //grid-template-columns: 1fr;
    grid-template-columns: 1fr auto;
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
    gap: 0.15rem;
    color: var(--color-body-lighter);

    @media (min-width: 992px) {
        gap: 0.25rem;
    }
`;
const Name = styled.div`
    color: var(--color-block);
    font-size: 1.25rem;
    font-weight: 600;
    text-transform: uppercase;

    @media (min-width: 992px) {
        font-size: 1.5rem;
    }
`;
const Email = styled.div`
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;

    @media (min-width: 992px) {
        font-size: 1rem;
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

const AvatarOverlay = styled.div`
    z-index: 10;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.75);
    color: var(--color-block-body);
    font-size: 1.25rem;
    transition: 250ms ease-in-out;
    opacity: 0;
    cursor: pointer;
`;
const AvatarContainer = styled.div`
    position: relative;
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 100%;
    overflow: hidden;

    &:hover {
        ${AvatarOverlay} {
            opacity: 1;
        }
    }
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
                <Link href="https://gravatar.com" target="_blank" rel="nofollow">
                    <AvatarContainer>
                        <AvatarOverlay title="Ändra profilbild på Gravatar.com">
                            <FiEdit />
                        </AvatarOverlay>
                        <Avatar size="3.5rem" />
                    </AvatarContainer>
                </Link>

                <Details>
                    <Name>{user.name}</Name>
                    <Email>{user.email}</Email>
                </Details>
            </About>
            <Actions></Actions>
        </Contaier>
    );
};

export { ProfileHeader };
