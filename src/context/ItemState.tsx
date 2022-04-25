import React, {useMemo, useReducer} from 'react';
import ItemContext from './ItemContext';

const initialState = {
  id: '',
  name: '',
  subtitle: '',
  info: '',
  image: '',
};

type State = {
  id: string;
  name: string;
  subtitle: string;
  info: string;
  image: string;
};

type Action =
  | {type: 'SET_ID'; id: string}
  | {type: 'SET_NAME'; name: string}
  | {type: 'SET_SUBTITLE'; subtitle: string}
  | {type: 'SET_INFO'; info: string}
  | {type: 'SET_IMAGE'; image: string}
  | {type: 'RESET_STATE'};

const ItemState = (props: any) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    (prevState, action) => {
      switch (action.type) {
        case 'SET_ID':
          return {
            ...prevState,
            id: action.id,
          };
        case 'SET_NAME':
          return {
            ...prevState,
            name: action.name,
          };
        case 'SET_SUBTITLE':
          return {
            ...prevState,
            subtitle: action.subtitle,
          };
        case 'SET_INFO':
          return {
            ...prevState,
            info: action.info,
          };
        case 'SET_IMAGE':
          return {
            ...prevState,
            image: action.image,
          };
        case 'RESET_STATE':
          return {
            ...prevState,
            ...initialState,
          };
      }
    },
    initialState,
  );

  const contextValue = useMemo(
    () => ({
      id: state.id,
      name: state.name,
      subtitle: state.subtitle,
      info: state.info,
      image: state.image,
      setId: (id: string) => dispatch({type: 'SET_ID', id}),
      setName: (name: string) => dispatch({type: 'SET_NAME', name}),
      setSubtitle: (subtitle: string) =>
        dispatch({type: 'SET_SUBTITLE', subtitle}),
      setInfo: (info: string) => dispatch({type: 'SET_INFO', info}),
      setImage: (image: string) => dispatch({type: 'SET_IMAGE', image}),
      resetState: () => dispatch({type: 'RESET_STATE'}),
    }),
    [state, dispatch],
  );

  return (
    <ItemContext.Provider value={contextValue}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
