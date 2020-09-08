import { gql, useQuery } from '@apollo/client';

import { Modal } from '~/components';

const MY_MODAL = gql`
  query {
    modal @client {
      open
    }
  }
`;

export default function Layout({ children }) {
  const { data } = useQuery(MY_MODAL);

  return (
    <div>
      {children}
      <Modal open={data?.modal.open}>
        <h1>hello world</h1>
      </Modal>
    </div>
  );
}
