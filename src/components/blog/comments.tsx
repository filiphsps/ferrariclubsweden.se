import { Comment } from '@/components/blog/comment';
import { PostCommentsApi } from '@/api/post';
import styled from 'styled-components';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

const Contaier = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const Thread = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem 0;
`;
const ThreadChildren = styled.div`
    padding-left: 1rem;
    border-left: 0.15rem solid var(--color-section-header);

    &:empty {
        display: none;
    }
`;

type CommentsProps = {
    slug: string;
    parent?: number;
};
export const Comments = ({ slug, parent }: CommentsProps) => {
    const { status: sessionStatus } = useSession();

    const {
        data: comments,
        error: commentsError,
        isLoading: isCommentsLoading,
        mutate: mutateComments
    } = useSWR(
        [
            'PostsCommentsApi',
            {
                slug,
                parent: parent || null
            }
        ],
        ([, props]) => PostCommentsApi(props),
        {}
    );
    useEffect(() => {
        if (sessionStatus === 'loading') return;

        mutateComments();
    }, [sessionStatus]);

    if (isCommentsLoading) return <>Laddar kommentarer...</>;

    if (!comments?.length) return null;

    return (
        <Contaier>
            {comments?.map((thread) => (
                <Thread key={thread.id}>
                    <Comment data={thread} />

                    <ThreadChildren>
                        <Comments slug={slug} parent={thread.databaseId} />
                    </ThreadChildren>
                </Thread>
            ))}
        </Contaier>
    );
};
