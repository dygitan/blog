import { gql } from '@apollo/client';

export const COMMENT = gql`
  fragment CommentFields on Comment {
    id
    content
    createdAt
    owner
  }
`;

export const POST = gql`
  fragment PostFields on Post {
    id
    title
    description
    createdAt
    owner
  }
`;

export const POST_WITH_COMMENTS = gql`
  fragment PostFieldsWithComments on Post {
    id
    title
    description
    createdAt
    owner
    comments {
      items {
        ...CommentFields
      }
    }
  }
  ${COMMENT}
`;
