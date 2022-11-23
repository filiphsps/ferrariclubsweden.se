import { FunctionComponent } from 'react';
import Image from 'next/image';
import Logo from '../../public/img/logo.png';
import styled from 'styled-components';
import { useUser } from '../hooks/useUser';

const Contaier = styled.div`
    height: 100%;
    width: 100%;
    background: var(--color-primary);
    border-radius: 0.75rem;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.45);
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
    gap: 1rem;
    color: var(--color-block-body);
`;
const MetaItem = styled.div``;
const MetaLabel = styled.div`
    text-transform: uppercase;
    font-family: 'Ferrari';
    font-size: 0.75rem;
`;
const MetaContent = styled.div`
    text-transform: uppercase;
    font-size: 1.15rem;
`;

const Header = styled.header`
    display: flex;
`;
const LogoContainer = styled.div`
    position: relative;
    height: 55%;
    width: auto;
    aspect-ratio: 1 / 1;

    img {
        object-fit: contain;
        height: 100%;
        width: 100%;
    }
`;

export type CardProps = {};
export const Card: FunctionComponent<CardProps> = ({}) => {
    const { user } = useUser();

    return (
        <Contaier>
            <Content>
                <Header>
                    <LogoContainer>
                        <Image src={Logo} alt="Logo" />
                    </LogoContainer>
                </Header>
                <Meta>
                    <MetaItem>
                        <MetaLabel>Member no.</MetaLabel>
                        <MetaContent>123-456-789</MetaContent>
                    </MetaItem>
                    <MetaItem>
                        <MetaLabel>Vaild till</MetaLabel>
                        <MetaContent>2023/10/15</MetaContent>
                    </MetaItem>
                </Meta>
            </Content>
        </Contaier>
    );
};
