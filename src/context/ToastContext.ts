/* eslint-disable @typescript-eslint/no-unused-vars */
import {createContext} from 'react';

export default createContext({
  toastText: '',
  toastVisible: false,
  popToast: (text: string) => {},
  hideToast: () => {},
});
