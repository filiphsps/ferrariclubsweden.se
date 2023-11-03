import Link from 'next/link';
import styled from 'styled-components';

const Contaier = styled.footer`
    grid-area: footer;
    background: var(--color-block);
    color: var(--color-block-body);
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 1.5rem;
`;

const Trademark = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 0.75rem;
    line-height: 1.5;
    opacity: 0.75;

    span {
        display: block;
        max-width: 28rem;
    }
`;

const Copyrights = styled.div`
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.65rem;
    text-transform: uppercase;
    opacity: 0.75;
    background: var(--color-body);
    font-family: 'Ferrari';

    span {
        line-height: 1.25;
    }

    @media (max-width: 992px) {
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
`;

export type FooterProps = {};
export const Footer = ({}: FooterProps) => {
    return (
        <Contaier>
            <Content>
                <Trademark>
                    <span>Ferrari is a trademark of Ferrari S.p.A. used under license.</span>
                    <span>
                        Ferrari S.p.A. - A company under Italian law, having its registered office at Via Emilia Est No.
                        1163, Modena, Italy, Companies’ Register of Modena, VAT and Tax number 00159560366 and share
                        capital of Euro 20,260,000
                    </span>
                </Trademark>
            </Content>
            <Copyrights>
                <span>
                    A Website by <Link href="https://nordcom.io/">Nordcom Group Inc.</Link>
                </span>
                <span>&copy; 1972-{new Date().getFullYear()} Ferrari Club Sweden.</span>
            </Copyrights>
        </Contaier>
    );
};
