import { gql } from '@apollo/client';

export const TOGGLE_MODAL = gql`
  mutation toggleModal($open: boolean!) {
    toggleModal(open: $open) @client {
      open
    }
  }
`;
