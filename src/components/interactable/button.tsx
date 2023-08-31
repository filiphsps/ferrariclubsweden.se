import styled from 'styled-components';

export const PrimaryButton = styled.button`
    appearance: none;
    -webkit-appearance: none;
    display: block;
    padding: 0.6rem 1.15rem;
    background: var(--color-block);
    color: var(--color-block-body);
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 1;
    outline: none;
    border-radius: 0.5rem;
    border: none;
    text-align: center;
    text-transform: uppercase;
    transition: 250ms ease-in-out;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.45);

    @media (min-width: 992px) {
        padding: 0.5rem 1.25rem;
        font-size: 1rem;
    }

    &:hover:enabled {
        background: var(--color-primary);
    }

    &:disabled {
        opacity: 0.5;
    }
`;
