import { gql, useMutation, useQuery } from '@apollo/client';

import { ListPostsResponse, Post } from '~/graphql/models';
import { PostQuery } from '~/graphql/queries';

const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(input: { id: $id }) {
      id
    }
  }
`;

const useHook = () => {
  const { data, loading } = useQuery<ListPostsResponse>(PostQuery.ALL);
  const [deletePost] = useMutation(DELETE_POST);
  const events = {
    onClickDeletePost: (post: Post) => {
      deletePost({
        variables: {
          id: post.id,
        },
        update: (cache) => {
          cache.evict({ id: cache.identify(post) });
          cache.modify({
            fields: {
              listPostsByStatus: (postsRef, { readField }) => {
                return {
                  ...postsRef,
                  items: postsRef.items.filter((postRef) => readField('id', postRef) !== post.id),
                };
              },
            },
          });
        },
      });
    },
  };
  return {
    events,
    loading,
    posts: data?.listPostsByStatus.items || [],
  };
};

export default useHook;
