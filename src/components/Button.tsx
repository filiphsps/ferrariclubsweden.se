import styled from 'styled-components';

export const Button = styled.button`
    appearance: none;
    -webkit-appearance: none;
    display: block;
    padding: 1rem;
    background: var(--color-block);
    color: var(--color-block-body);
    font-size: 1rem;
    font-weight: 500;
    outline: none;
    border-radius: 0.5rem;
    border: none;
    text-align: center;
    transition: 150ms;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.45);

    &:hover {
        background: var(--color-primary);
    }
`;
