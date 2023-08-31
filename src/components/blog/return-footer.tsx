import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import styled from 'styled-components';

const Contaier = styled.section`
    display: flex;
    flex-direction: column;
    --action-height: 2rem;
    padding: 1rem;
    background: var(--color-section-header);
    border-top: 0.15rem solid var(--color-light-block);

    @media (min-width: 992px) {
        padding: 1rem;
        margin-top: 1rem;
        background: none;
    }
`;

const ReturnAction = styled(Link)`
    display: flex;
    justify-content: start;
    align-items: center;
    height: var(--action-height);

    line-height: 1;
    font-size: 0.95rem;
    font-family: var(--font-primary);
    text-transform: uppercase;
    font-weight: 500;

    color: var(--color-body-lighter);

    svg,
    span {
        display: block;
    }

    svg {
        font-size: 0.95rem;
        margin: -0.05rem 0 0 -0.3rem;
    }
`;

type ReturnFooterProps = {
    path: string;
};
export const ReturnFooter = ({ path }: ReturnFooterProps) => {
    // TODO: Use router.back if previous destination is the target path.

    return (
        <Contaier>
            <ReturnAction href={path}>
                <FiChevronLeft />
                <span>Tillbaka</span>
            </ReturnAction>
        </Contaier>
    );
};
