export enum ActionType {
  HIDE_MODAL = 'HIDE_MODAL',
  SHOW_MODAL = 'SHOW_MODAL',
  SHOW_SIGN_IN = 'SHOW_SIGN_IN',
  SHOW_SIGN_UP = 'SHOW_SIGN_UP',
  SHOW_VERIFY_USER = 'SHOW_VERIFY_USER',
}

export enum ViewType {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  VERIFY_USER = 'VERIFY_USER',
}

export type ActionProps = {
  type: ActionType;
  payload?: any;
};

export type ReducerStateProps = {
  currentView: ViewType;
  isOpen?: boolean;
};

export const initialState: ReducerStateProps = { currentView: ViewType.SIGN_IN };

export default function reducer(state: ReducerStateProps, action: ActionProps): ReducerStateProps {
  switch (action.type) {
    case ActionType.HIDE_MODAL:
      return {
        ...state,
        isOpen: false,
      };
    case ActionType.SHOW_MODAL:
      return {
        ...state,
        isOpen: true,
      };
    case ActionType.SHOW_SIGN_IN:
      return {
        ...state,
        currentView: ViewType.SIGN_IN,
      };
    case ActionType.SHOW_SIGN_UP:
      return {
        ...state,
        currentView: ViewType.SIGN_UP,
      };
    case ActionType.SHOW_VERIFY_USER: {
      return {
        ...state,
        currentView: ViewType.VERIFY_USER,
      };
    }

    default:
      throw new Error();
  }
}
