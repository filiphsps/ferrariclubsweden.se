import type { ReactNode } from 'react';
import styled from 'styled-components';

const Contaier = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: var(--color-light-block);

    @media (min-width: 992px) {
        padding: 1rem;
        margin-bottom: 1rem;
        background: none;
        border-bottom: 0.15rem solid var(--color-light-block);
    }
`;

const Title = styled.h1`
    margin: 0;
    font-family: var(--font-secondary);
    font-size: clamp(2rem, 8vw, 5rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0;
    text-transform: uppercase;

    color: var(--color-body-lighter);

    @media (min-width: 992px) {
        font-size: 2.25rem;
    }
`;

type PageHeaderProps = {
    title: ReactNode;
};
const PageHeader = ({ title }: PageHeaderProps) => {
    return (
        <Contaier>
            <Title>{title}</Title>
        </Contaier>
    );
};

export { PageHeader };
