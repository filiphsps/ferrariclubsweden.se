import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Contaier = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(33.3%, 1fr));

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
`;

const BlockBackground = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    transition: 1s ease-in-out;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center center;
    }
`;
const BlockContent = styled.div`
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100%;
    width: 100%;
    padding: 1rem;
    color: var(--color-block-body);

    font-family: 'Ferrari', sans-serif;
    font-size: 2rem;
    text-transform: uppercase;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.75);

    a {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 100%;
        width: 100%;

        &:hover {
            color: var(--color-block-body);
            text-decoration: underline;
        }
    }
`;

const Block = styled.div`
    overflow: hidden;
    position: relative;
    display: flex;
    aspect-ratio: 4 / 2.5;

    &:hover {
        ${BlockBackground} {
            transition: 5s ease-out;
            transform: scale(1.25);
        }
    }
`;

export type ImageBlocksProps = {
    id?: string;
    blocks: Array<{
        background: JSX.Element;
        children: JSX.Element | JSX.Element[];
    }>;
};
export const ImageBlocks: FunctionComponent<ImageBlocksProps> = ({
    id,
    blocks
}) => {
    return (
        <Contaier id={id}>
            {blocks.map((block, index) => (
                <Block key={index}>
                    <BlockContent>{block.children}</BlockContent>
                    <BlockBackground>{block.background}</BlockBackground>
                </Block>
            ))}
        </Contaier>
    );
};
