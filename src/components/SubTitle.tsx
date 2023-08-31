import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Contaier = styled.h2`
    margin: 0px;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    font-family: var(--font-secondary);
    color: var(--color-body-lighter);
`;

export type SubTitleProps = {
    children: JSX.Element | Array<JSX.Element | String> | string | undefined;
};
export const SubTitle: FunctionComponent<SubTitleProps> = ({ children }) => {
    return <Contaier>{children}</Contaier>;
};
