import { useMutation, useQuery } from '@apollo/client';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { Dispatch, useContext, useEffect, useState } from 'react';

import { AuthContext } from '~/context';
import { TOGGLE_MODAL } from '~/graphql/mutations';
import { MODAL } from '~/graphql/queries';
import { ActionProps, ActionType } from './reducer';

export type HookStateProps = {
  authDetails?: {
    name?: string;
    username: string;
    password: string;
    email?: string;
    code?: string;
  };
  actionType?: 'sign-in' | 'sign-up';
};

const useHook = (dispatch: Dispatch<ActionProps>) => {
  const authContext = useContext(AuthContext);
  const [toggleModal] = useMutation(TOGGLE_MODAL);
  const { data } = useQuery(MODAL);
  const [state, setState] = useState<HookStateProps>({});

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user: CognitoUser) =>
        authContext.setUserInfo({
          accessToken: user.getSignInUserSession().getAccessToken().getJwtToken(),
          username: user.getUsername(),
        })
      )
      .catch(() => {});
  }, []);

  const errorHandler = ({ code, message }) => {
    switch (code) {
      case 'UserNotConfirmedException':
        dispatch({ type: ActionType.SHOW_VERIFY_USER });
        return;
      default:
        console.error(`sign-in-error`, { code, message });
        alert(`Authentication failed! <strong>${code}</strong>: ${message}`);
    }
  };

  const handleSignIn = () => {
    const { authDetails } = state;
    if (!authDetails || !authDetails.username || !authDetails.password) {
      return;
    }

    Auth.signIn(authDetails.username, authDetails.password)
      .then((cognitoUser: CognitoUser) => {
        toggleModal({
          variables: {
            open: false,
          },
        });
        authContext.setUserInfo({
          accessToken: cognitoUser.getSignInUserSession().getAccessToken().getJwtToken(),
          username: cognitoUser.getUsername(),
        });
      })
      .catch(errorHandler);
  };

  const handlers = {
    handleInputChange: ({ target }) =>
      setState({
        ...state,
        authDetails: {
          ...state.authDetails,
          [target.name]: target.value,
        },
      }),
    handleModalHide: () => {},
    handleModalShow: () => {
      toggleModal({
        variables: {
          open: true,
        },
      });
      dispatch({ type: ActionType.SHOW_SIGN_IN });
    },
    handleSignIn,
    handleSignOut: () => {
      Auth.signOut().then(() => {
        setState({});
        window.location.href = '/';
      });
    },
    handleSignUp: () => {
      const { authDetails } = state;
      if (!authDetails || !authDetails.username || !authDetails.password) {
        return;
      }

      const { username, password, email, name } = authDetails;
      Auth.signUp({ username, password, attributes: { email, name } })
        .then(() => dispatch({ type: ActionType.SHOW_VERIFY_USER }))
        .catch(errorHandler);
    },
    handleVerifyUser: () => {
      const { authDetails } = state;
      Auth.confirmSignUp(authDetails.username, authDetails.code).then(handleSignIn).catch(errorHandler);
    },
  };

  return {
    handlers,
    state,
    showModal: data?.modal.open,
  };
};

export default useHook;
