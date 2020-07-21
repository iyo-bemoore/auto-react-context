import React, { useReducer } from "react";
export default (reducer, actions, initialState) => {
  const Context = /*#__PURE__*/ React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundActions = {};

    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return /*#__PURE__*/ React.createElement(
      Context.Provider,
      {
        value: {
          state,
          ...boundActions,
        },
      },
      children
    );
  };

  return {
    Context,
    Provider,
  };
};
