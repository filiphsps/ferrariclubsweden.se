import styled from 'styled-components';

const PrimaryButton = styled.button`
    appearance: none;
    -webkit-appearance: none;
    display: block;
    padding: 0.75rem 1.25rem;
    background: var(--color-block);
    color: var(--color-block-body);
    font-weight: 700;
    outline: none;
    border-radius: 0.5rem;
    border: none;
    text-align: center;
    text-transform: uppercase;
    transition: 150ms;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.45);

    &:hover {
        background: var(--color-primary);
    }
`;

export { PrimaryButton };
