import type { ReactNode } from 'react';
import styled from 'styled-components';

const Contaier = styled.section`
    z-index: 10;
    position: sticky;
    top: 0;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--color-section-header);
    border-bottom: 0.15rem solid var(--color-light-block);

    @media (min-width: 992px) {
        position: relative;
        align-items: end;
        padding: 1rem;
        margin-bottom: 1rem;
        background: none;
    }
`;

const Title = styled.h1`
    margin: 0;
    font-family: var(--font-secondary);
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0;
    text-transform: uppercase;

    color: var(--color-block);

    @media (min-width: 992px) {
        color: var(--color-body-lighter);
        font-size: 2.5rem;
    }
`;

const Actions = styled.div`
    button {
        // TODO: Move this to a proper place.
        border: 0.15rem solid var(--color-body-lighter);
        background: none;
        color: var(--color-body-lighter);
        box-shadow: none;
    }
`;

type PageHeaderProps = {
    title: ReactNode;
    actions?: ReactNode;
};
export const PageHeader = ({ title, actions }: PageHeaderProps) => {
    return (
        <Contaier>
            <Title>{title}</Title>
            <Actions>{actions || null}</Actions>
        </Contaier>
    );
};
