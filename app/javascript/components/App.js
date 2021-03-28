import React, { createContext } from "react";
import Routes from "../routes/Index";
// import { AuthContext } from "../contexts/auth";
export const AuthContext = createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("token") || false,
  user: null,
  token: null,
  //currentUser: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.values));
      localStorage.setItem("token", JSON.stringify(action.payload.data.jwt));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "SIGNUP":
      console.log("hey im ma do it");
      localStorage.setItem("user", JSON.stringify(action.payload.values));
      localStorage.setItem("token", JSON.stringify(action.payload.data.token.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
function App(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Routes />
    </AuthContext.Provider>
  );
}
export default App;
