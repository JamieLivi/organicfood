/* eslint-disable @typescript-eslint/no-unused-vars */
import {createContext} from 'react';

export default createContext({
  signedIn: false,
  setSignedIn: (arg: any) => {},
});
