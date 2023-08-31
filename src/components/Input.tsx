import styled from 'styled-components';

export const Input = styled.input`
    appearance: none;
    -webkit-appearance: none;
    display: block;
    padding: 0.75rem 1rem;
    color: var(--color-block-body);
    border: 0.05rem solid var(--color-light-block);
    font-weight: 500;
    outline: none;
    border-radius: 0.5rem;
    background: transparent;

    &:active,
    &:focus,
    &:hover {
        border-color: var(--color-primary);
    }
`;
