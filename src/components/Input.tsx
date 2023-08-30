import styled from 'styled-components';

export const Input = styled.input`
    appearance: none;
    -webkit-appearance: none;
    display: block;
    padding: 0.75rem 0px;
    border-bottom: 0.1rem solid var(--color-light-block);
    font-size: 1rem;
    font-weight: 500;
    outline: none;
    border-radius: none;
    background: transparent;

    &:active,
    &:focus,
    &:hover {
        border-color: var(--color-primary);
    }
`;
