import React, {memo, useContext} from 'react';
import {Portal, Snackbar} from 'react-native-paper';
import ToastContext from '../context/ToastContext';

const Toast = memo(() => {
  const {toastVisible, toastText, hideToast} = useContext(ToastContext);

  const onDismiss = () => {
    hideToast();
  };

  return (
    <Portal>
      <Snackbar visible={toastVisible} onDismiss={onDismiss}>
        {toastText}
      </Snackbar>
    </Portal>
  );
});

Toast.displayName = 'Toast';
export default Toast;
