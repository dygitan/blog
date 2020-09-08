import { gql } from '@apollo/client';

export * as PostQuery from './post';

export const MODAL = gql`
  query {
    modal @client {
      open
    }
  }
`;
