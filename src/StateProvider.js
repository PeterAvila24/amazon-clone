import React, { createContext, useContext, useReducer} from "react";

//preps the data layer
export const StateContext = createContext();

//Wrap our app and provide the data layer
export const StateProvider = ({ reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//Pull info. from layout
export const useStateValue = () => useContext (StateContext);
