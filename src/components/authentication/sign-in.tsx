import { useContext } from 'react';

import { Button, TextField } from '~/components';
import { ModalContext } from '~/context';
import { ActionType } from '~/components/authentication/reducer';

export default function SignIn() {
  const { dispatch, hookState, handlers } = useContext(ModalContext);
  return (
    <div className="">
      <div className="mb-3">
        <TextField
          label="Username"
          name="username"
          onChange={handlers.handleInputChange}
          placeholder="Enter your username"
          type="text"
          value={hookState.authDetails?.username || ''}
        />
      </div>
      <div className="mb-3">
        <TextField
          label="Password"
          name="password"
          onChange={handlers.handleInputChange}
          onKeyUp={(e) => e.key === 'Enter' && handlers.handleSignIn()}
          placeholder="Enter your password"
          type="password"
          value={hookState.authDetails?.password || ''}
        />
      </div>
      <hr className="mt-5" />
      <div className="d-flex align-items-center justify-content-between">
        <p className="p-0 m-0">
          Need account?
          <Button
            label="Create an account"
            variant="link"
            onClick={() => dispatch({ type: ActionType.SHOW_SIGN_UP })}
          />
        </p>
        <Button label="SIGN IN" onClick={handlers.handleSignIn} />
      </div>
    </div>
  );
}
