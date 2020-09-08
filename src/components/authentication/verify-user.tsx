import { useContext } from 'react';
import { Button, TextField } from '~/components';
import { ModalContext } from '~/context';

export default function VerifyUser() {
  const { handlers, hookState } = useContext(ModalContext);
  return (
    <>
      <p>An email with a verification code was just sent to {hookState.authDetails?.email}</p>
      <TextField
        label="Code"
        name="code"
        onChange={handlers.handleInputChange}
        onKeyUp={(e) => e.key === 'Enter' && handlers.handleVerifyUser()}
        placeholder="Enter verification code"
        type="text"
      />
      <div className="text-right mt-3">
        <Button label="CONFIRM" onClick={handlers.handleVerifyUser} />
      </div>
    </>
  );
}
