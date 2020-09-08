import { Dispatch, createContext } from 'react';
import { HookStateProps } from '~/components/authentication/hook';
import { ActionProps, ReducerStateProps } from '~/components/authentication/reducer';

export type UserInfo = {
  accessToken: string;
  username: string;
};

type AuthContextProps = {
  setUserInfo: (userInfo: UserInfo) => void;
  userInfo?: UserInfo;
};

type ModalContextProps = {
  dispatch: Dispatch<ActionProps>;
  handlers: any;
  hookState: HookStateProps;
  reducerState: ReducerStateProps;
};

export const AuthContext = createContext({} as AuthContextProps);

export const ModalContext = createContext({} as ModalContextProps);
