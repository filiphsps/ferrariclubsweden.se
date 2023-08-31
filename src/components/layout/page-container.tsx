import { ReactNode } from 'react';
import styled from 'styled-components';

const Contaier = styled.section`
    width: 100%;
    height: 100%;
    max-width: var(--size-page-width);
    margin: 0px auto;

    @media (min-width: 992px) {
        padding: 2rem 0;
    }
`;

type PageContainerProps = {
    children: ReactNode;
};
export const PageContainer = ({ children }: PageContainerProps) => {
    return <Contaier>{children}</Contaier>;
};
