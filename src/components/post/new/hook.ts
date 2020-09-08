import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import { useContext, useState } from 'react';

import { AuthContext } from '~/context';
import * as Fragments from '~/graphql/fragments';
import { Post, Status } from '~/graphql/models';
import { PostQuery } from '~/graphql/queries';

type StateProps = {
  title?: string;
  description?: string;
};

type CreatePostInput = {
  title: string;
  description: string;
  status: Status;
};

const CREATE_POST = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostFields
    }
  }
  ${Fragments.POST}
`;

const useHook = () => {
  const authContext = useContext(AuthContext);
  const [createPost] = useMutation<{ createPost: Post }, { input: CreatePostInput }>(CREATE_POST);
  const [state, setState] = useState<StateProps>({});

  const events = {
    onInputChange: ({ target }) => setState({ ...state, [target.name]: target.value }),
    onClickPost: () => {
      createPost({
        variables: {
          input: {
            title: state?.title,
            description: state?.description,
            status: Status.ACTIVE,
          },
        },
        refetchQueries: [{ query: PostQuery.ALL }],
      }).then(({ data: { createPost } }) => Router.push('/post/[id]', `/post/${createPost.id}`));
    },
  };

  return {
    events,
    state,
  };
};

export default useHook;
