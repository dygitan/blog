import { gql } from '@apollo/client';
import { Fragments } from '~/graphql';

export const ALL = gql`
  {
    listPostsByStatus(status: ACTIVE, sortDirection: DESC) {
      items {
        ...PostFields
      }
    }
  }

  ${Fragments.POST}
`;

export const BY_ID = gql`
  query getPostById($id: ID!) {
    getPost(id: $id) {
      ...PostFieldsWithComments
    }
  }
  ${Fragments.POST_WITH_COMMENTS}
`;
