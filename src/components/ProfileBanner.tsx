import { Card } from './Card';
import { FunctionComponent } from 'react';
import Image from 'next/future/image';
import MissingAvatarImage from '../../public/img/missing-avatar.png';
import { SubTitle } from './SubTitle';
import { Title } from './Title';
import styled from 'styled-components';
import { useUser } from '../hooks/useUser';

const Contaier = styled.section`
    width: 100%;
`;
const Content = styled.header`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    padding: 2rem;
    background: var(--color-light-block);

    @media (max-width: 992px) {
        grid-template-columns: auto 1fr;
    }
`;
const Avatar = styled.div`
    position: relative;
    overflow: hidden;
    padding: 1rem;
    width: 12rem;
    height: 12rem;
    border-radius: 100%;
    background: #efefef;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const Meta = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;

    h1 {
        font-family: 'Poppins';
    }
`;
const CardContainer = styled.div`
    width: auto;
    height: 12rem;
    width: 19rem;

    @media (max-width: 992px) {
        display: none;
    }
`;

export type ProfileBannerProps = {};
export const ProfileBanner: FunctionComponent<ProfileBannerProps> = ({}) => {
    const { user } = useUser();

    return (
        <Contaier>
            <Content>
                <Avatar>
                    <Image src={MissingAvatarImage} alt="Avatar" />
                </Avatar>
                <Meta>
                    <Title>{user.name}</Title>
                    <SubTitle>{user.status}</SubTitle>
                </Meta>
                <CardContainer>
                    <Card />
                </CardContainer>
            </Content>
        </Contaier>
    );
};
