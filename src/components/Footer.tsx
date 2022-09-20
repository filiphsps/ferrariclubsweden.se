import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Contaier = styled.header`
    grid-area: footer;
    background: var(--color-block);
    color: var(--color-block-body);
    padding: 1.5rem;
`;

export type FooterProps = {};
export const Footer: FunctionComponent<FooterProps> = () => {
    return <Contaier></Contaier>;
};
