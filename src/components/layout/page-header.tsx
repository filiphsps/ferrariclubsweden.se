import type { ReactNode } from 'react';
import styled from 'styled-components';

const Contaier = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: var(--color-section-header);
    border-bottom: 0.15rem solid var(--color-light-block);

    @media (min-width: 992px) {
        padding: 1rem;
        margin-bottom: 1rem;
        background: none;
    }
`;

const Title = styled.h1`
    margin: 0;
    font-family: var(--font-secondary);
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0;
    text-transform: uppercase;

    color: var(--color-body-lighter);

    @media (min-width: 992px) {
        font-size: 2.5rem;
    }
`;

type PageHeaderProps = {
    title: ReactNode;
};
export const PageHeader = ({ title }: PageHeaderProps) => {
    return (
        <Contaier>
            <Title>{title}</Title>
        </Contaier>
    );
};
