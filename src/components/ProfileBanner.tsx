import { FunctionComponent } from 'react';
import Image from 'next/image';
import MissingAvatarImage from '../../public/img/missing-avatar.png';
import { SubTitle } from './SubTitle';
import { Title } from './Title';
import styled from 'styled-components';

const Contaier = styled.section`
    width: 100%;
`;
const Content = styled.header`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    @media (max-width: 992px) {
        grid-template-columns: auto 1fr;
    }
`;
const Avatar = styled.div`
    position: relative;
    overflow: hidden;
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    background: #efefef;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const Meta = styled.div`
    h1 {
        font-family: 'Poppins';
        font-size: 1rem;
        line-height: 1rem;
    }
    h2 {
        font-size: 0.75rem;
        line-height: 0.75rem;
    }
`;

export type ProfileBannerProps = {};
export const ProfileBanner: FunctionComponent<ProfileBannerProps> = ({}) => {
    return (
        <Contaier>
            <Content>
                <Avatar>
                    <Image src={MissingAvatarImage} alt="Avatar" />
                </Avatar>
                <Meta>
                    <Title>{'Name'}</Title>
                    <SubTitle>{'status'}</SubTitle>
                </Meta>
            </Content>
        </Contaier>
    );
};
