import { useContext } from 'react';

import { Button, TextField } from '~/components';
import { ModalContext } from '~/context';
import { ActionType } from '~/components/authentication/reducer';

export default function SignIn() {
  const { dispatch, handlers, hookState } = useContext(ModalContext);
  return (
    <div className="">
      <div className="mb-3">
        <TextField
          label="Display Name"
          name="name"
          onChange={handlers.handleInputChange}
          placeholder="Enter your display name"
          value={hookState.authDetails?.name || ''}
        />
      </div>
      <div className="mb-3">
        <TextField
          label="Email"
          name="email"
          onChange={handlers.handleInputChange}
          placeholder="Enter your email"
          type="email"
          value={hookState.authDetails?.email || ''}
        />
      </div>
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
          onKeyUp={(e) => e.key === 'Enter' && handlers.handleSignUp()}
          placeholder="Enter your password"
          type="password"
          value={hookState.authDetails?.password || ''}
        />
      </div>
      <hr className="mt-5" />
      <div className="d-flex align-items-center justify-content-between">
        <p className="p-0 m-0">
          Already have an account?
          <Button label="Sign in" variant="link" onClick={() => dispatch({ type: ActionType.SHOW_SIGN_IN })} />
        </p>
        <Button label="SIGN UP" onClick={handlers.handleSignUp} />
      </div>
    </div>
  );
}
