import Image from 'next/image';
import Logo from '../../public/img/logo.png';
import { Session } from '@/api/auth';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';

const Contaier = styled.div`
    height: 100%;
    width: 100%;

    background: var(--color-primary);
    color: var(--color-block-body);
    border-radius: 1rem;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.45);
    aspect-ratio: 3.5 / 2;

    font-size: clamp(18px, 10vw, 10vw);

    @media (min-width: 992px) {
        font-size: 38px;
        max-width: 24rem;
    }
`;

const Content = styled.div`
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100%;
    padding: 1rem;
`;

const Meta = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
`;
const MetaItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
`;
const MetaLabel = styled.div`
    text-transform: uppercase;
    font-family: var(--font-primary);
    font-size: 28%;
    line-height: 1;
`;
const MetaContent = styled.div`
    text-transform: uppercase;
    font-size: 50%;
    font-weight: 600;
    line-height: 1;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
`;

const Name = styled.div`
    font-size: 1rem;
    font-size: 65%;
    font-weight: 600;
    font-family: var(--font-primary);
    line-height: 1.15;
    white-space: break-spaces;
    text-transform: uppercase;
`;

const LogoContainer = styled.div`
    position: relative;
    width: auto;
    height: 15vw;
    aspect-ratio: 1 / 1;

    @media (min-width: 992px) {
        height: 4rem;
    }

    img {
        object-fit: contain;
        height: 100%;
        width: 100%;
    }
`;

export type CardProps = {};
export const Card = ({}: CardProps) => {
    const { data } = useSession({ required: true });
    if (!data) return null;

    const { user } = data as Session;
    if (!user) return null;

    const from = new Date(Date.parse(user.registeredDate!));

    return (
        <Contaier>
            <Content>
                <Header>
                    <Name>{user.name?.replace(' ', '\n')}</Name>
                    <LogoContainer>
                        <Image src={Logo} alt="Logo" />
                    </LogoContainer>
                </Header>
                <Meta>
                    <MetaItem>
                        <MetaLabel>Från.</MetaLabel>
                        <MetaContent>{from.getFullYear().toString().replace('20', '')}</MetaContent>
                    </MetaItem>
                    <MetaItem>
                        <MetaLabel>Giltigt till.</MetaLabel>
                        <MetaContent>{new Date().getFullYear()}/12/31</MetaContent>
                    </MetaItem>
                </Meta>
            </Content>
        </Contaier>
    );
};
