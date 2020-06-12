import React, { useReducer } from 'react';

export default (reducer, actions, initialState) => { // we can use this function and now just pass in these 3 variables.
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {};

    for (let key in actions) { // we iterate because all teh actions from a context do want to get bound to the same dispatch so the actions get processed by the same reducer.
      boundActions[key] = actions[key](dispatch); // this loops through all actions that came from the file, and passes dispatch into it, and sets the return function on the boundActions object.
    }

    return <Context.Provider value={{ state: state, ...boundActions}}>
      {children}
    </Context.Provider>

  };

  return { Context, Provider } // this is a reusable Context and Provider.
}