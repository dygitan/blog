import { gql, useMutation } from '@apollo/client';

import { Comment } from '~/graphql/models';

const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      id
    }
  }
`;
const useHook = () => {
  const [deleteComment] = useMutation<{ deleteComment: any }>(DELETE_COMMENT);
  const events = {
    onClickDelete: (postId: string, comment: Comment) => {
      deleteComment({
        variables: {
          id: comment.id,
        },
        update: (cache) => {
          cache.evict({ id: cache.identify(comment) });
          cache.modify({
            id: cache.identify({
              __typename: 'Post',
              id: postId,
            }),
            fields: {
              comments(commentsRef, { readField }) {
                return {
                  ...commentsRef,
                  items: commentsRef.items.filter((comment) => {
                    console.log(`item ${readField('id', comment)} ~ ${comment.id}`, comment);
                    return readField('id', comment) !== comment.id;
                  }),
                };
              },
            },
          });
        },
      }).catch((error) => console.log(`hello`, error));
    },
  };

  return {
    events,
  };
};

export default useHook;
