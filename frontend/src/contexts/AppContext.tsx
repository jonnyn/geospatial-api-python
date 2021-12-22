import React, { createContext, useReducer, FC } from "react";

const initialState: AppState = {
  currency: "usd",
  error: null,
};

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "UPDATE_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };
    default:
      throw new Error();
  }
};

export const AppContext = createContext<any>(null);

export const AppContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
