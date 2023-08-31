import Link from 'next/link';
import { WPPost } from '@/api/post';
import styled from 'styled-components';

const Contaier = styled.article`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 0.15rem solid var(--color-section-header);

    @media (min-width: 992px) {
        border: none;
        padding-bottom: 0;
    }
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const Title = styled.div`
    color: var(--color-body-lighter);
    font-weight: 400;
    font-size: 1.75rem;
    line-height: 1.15;

    @media (min-width: 992px) {
        font-size: 2.25rem;
        line-height: 1.35;
    }
`;
const Published = styled.div`
    color: var(--color-body-lighter);
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
    opacity: 0.75;

    @media (min-width: 992px) {
        font-size: 1.25rem;
    }
`;

const Content = styled.main`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;

    @media (min-width: 992px) {
        padding-left: 1rem;
        border-left: 0.15rem solid var(--color-section-header);
    }

    p {
        font-weight: inherit;
        font-size: inherit;
        line-height: inherit;
        margin-bottom: 0.25rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

type PostPreviewProps = {
    data: WPPost;
};
export const PostPreview = ({ data }: PostPreviewProps) => {
    const { slug, title, date, excerpt } = data;

    return (
        <Contaier>
            <Header>
                <Title>
                    <Link href={`/news/${slug}/`} title={title}>
                        {title}
                    </Link>
                </Title>
                <Published>
                    {new Date(Date.parse(date)).toLocaleDateString('sv-se', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </Published>
            </Header>

            <Content
                dangerouslySetInnerHTML={{
                    __html: excerpt || ''
                }}
            />
        </Contaier>
    );
};
