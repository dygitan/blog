import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { v1 as uuid } from 'uuid';

import { AuthContext } from '~/context';
import { Fragments } from '~/graphql';
import { Comment, Post } from '~/graphql/models';
import { PostQuery } from '~/graphql/queries';

type PostById = {
  getPost: Post;
};

const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $content: String!) {
    createComment(input: { postId: $postId, content: $content }) {
      ...CommentFields
    }
  }
  ${Fragments.COMMENT}
`;

const useHook = () => {
  const router = useRouter();
  const { id } = router.query;

  const authContext = useContext(AuthContext);
  const { data } = useQuery<PostById>(PostQuery.BY_ID, { variables: { id } });
  const [createComment] = useMutation<{ createComment: Comment }>(CREATE_COMMENT);

  const [comment, setComment] = useState();
  const events = {
    onClickAddComment: () => {
      if (!comment) {
        return;
      }

      setComment(undefined);
      createComment({
        variables: {
          postId: id,
          content: comment,
        },
        optimisticResponse: {
          createComment: {
            __typename: 'Comment',
            id: `optimistic-${uuid}`,
            content: comment,
            createdAt: new Date(),
            owner: authContext.userInfo?.username,
          },
        },
        update: (cache, response) => {
          if (response.data?.createComment) {
            const newCommentRef = cache.writeFragment({
              fragment: Fragments.COMMENT,
              fragmentName: 'CommentFields',
              data: response.data?.createComment,
            });

            cache.modify({
              id: cache.identify(data?.getPost),
              fields: {
                comments(commentsRef) {
                  return {
                    ...commentsRef,
                    items: [newCommentRef, ...commentsRef.items],
                  };
                },
              },
            });
          }
        },
      });
    },
    onInputChange: ({ target }) => {
      setComment(target.value);
    },
  };

  return {
    comment,
    comments: data?.getPost?.comments?.items || [],
    events,
    post: data?.getPost,
  };
};

export default useHook;
