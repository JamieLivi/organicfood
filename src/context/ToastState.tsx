import React, {useMemo, useReducer} from 'react';
import ToastContext from './ToastContext';

type State = {
  toastVisible: boolean;
  toastText: string;
};

type Action = {type: 'POP_TOAST'; toastText: string} | {type: 'HIDE_TOAST'};

const ToastState = (props: any) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    (prevState, action) => {
      //   console.log('toastimagestate reducer')

      switch (action.type) {
        case 'POP_TOAST':
          return {
            ...prevState,
            toastVisible: true,
            toastText: action.toastText,
          };
        case 'HIDE_TOAST':
          return {
            ...prevState,
            toastVisible: false,
            toastText: '',
          };
      }
    },
    {
      toastVisible: false,
      toastText: '',
    },
  );

  const contextValue = useMemo(
    () => ({
      toastVisible: state.toastVisible,
      toastText: state.toastText,
      popToast: (text: string) =>
        dispatch({type: 'POP_TOAST', toastText: text}),
      hideToast: () => dispatch({type: 'HIDE_TOAST'}),
    }),
    [state, dispatch],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}
    </ToastContext.Provider>
  );
};

export default ToastState;
