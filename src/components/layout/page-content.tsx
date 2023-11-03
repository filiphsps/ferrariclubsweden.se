import type { ReactNode } from 'react';
import styled from 'styled-components';

const Contaier = styled.section`
    padding: 1rem;
    min-height: calc(100vh - 16rem);
    min-height: calc(100dvh - 16rem);

    @media (min-width: 992px) {
        min-height: unset;
    }
`;

type PageContentProps = {
    children: ReactNode;
};
export const PageContent = ({ children }: PageContentProps) => {
    return <Contaier>{children}</Contaier>;
};
