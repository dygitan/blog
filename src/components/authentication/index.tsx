import { useContext, useReducer } from 'react';

import { Button, Modal } from '~/components';
import { AuthContext, ModalContext } from '~/context';
import SignIn from './sign-in';
import SignUp from './sign-up';
import VerifyUser from './verify-user';

import useHook from './hook';
import reducer, { initialState, ActionType, ViewType } from './reducer';

export default function Header() {
  const authContext = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { handlers, state: hookState, showModal } = useHook(dispatch);

  const username = authContext.userInfo?.username;

  const buttonProps = {
    label: `SIGN ${username ? 'OUT' : 'IN'}`,
    onClick: () => (username ? handlers.handleSignOut() : handlers.handleModalShow()),
  };

  let modalTitle;

  const currentView = (() => {
    switch (state.currentView) {
      case ViewType.SIGN_UP:
        modalTitle = 'Create new acount';
        return <SignUp />;
      case ViewType.VERIFY_USER:
        modalTitle = 'Confirm new acount';
        return <VerifyUser />;
      default:
        modalTitle = 'Sign in to your account';
        return <SignIn />;
    }
  })();

  return (
    <ModalContext.Provider value={{ dispatch, handlers, hookState, reducerState: state }}>
      <Modal title={modalTitle} open={showModal} onHide={handlers.handleModalHide}>
        {currentView}
      </Modal>
      <div className="mb-3 text-right">
        {username && (
          <h6>
            Hello, <strong>{username}</strong>!
          </h6>
        )}
        <Button {...buttonProps} />
      </div>
    </ModalContext.Provider>
  );
}
