import { UserAvatar } from '../user/user-avatar';
import { WPPostComment } from '@/api/post';
import styled from 'styled-components';

const Contaier = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Header = styled.header`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.5rem;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    color: var(--color-body-lighter);
`;
const Name = styled.div`
    color: var(--color-block);
    font-weight: 700;
    font-size: 1rem;
    text-transform: uppercase;
`;
const Date = styled.div`
    color: var(--color-block);
    font-weight: 500;
    font-size: 0.85rem;
    text-transform: uppercase;
`;

const Content = styled.main`
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1.5;

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

type CommentProps = {
    data: WPPostComment;
};
export const Comment = ({ data }: CommentProps) => {
    const { author, content, date } = data;

    return (
        <Contaier>
            <Header>
                <UserAvatar size="2.5rem" url={author.avatar?.url} />
                <Details>
                    <Name>{author.name}</Name>
                    <Date>{date}</Date>
                </Details>
            </Header>

            <Content
                dangerouslySetInnerHTML={{
                    __html: content
                }}
            />
        </Contaier>
    );
};
