/* eslint-disable @typescript-eslint/no-unused-vars */
import {createContext} from 'react';

export default createContext({
  id: '',
  name: '',
  subtitle: '',
  info: '',
  image: '',
  setId: (arg: string) => {},
  setName: (arg: string) => {},
  setSubtitle: (arg: string) => {},
  setInfo: (arg: string) => {},
  setImage: (arg: string) => {},
  resetState: () => {},
});
