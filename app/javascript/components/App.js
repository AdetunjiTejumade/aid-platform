import React, { useState, useEffect, createContext } from "react";
import Routes from "../routes/Index";
import axios from "axios";
// import { AuthContext } from "../contexts/auth";
export const AuthContext = createContext();
export const UserLocation = createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("token") || false,
  user: null,
  token: null,
  currentUser: null,
  allRequests:null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ALLREQUESTS":
      return {
        ...state,
        allRequests: action.payload,
      }
    case "CURRENTUSER":
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
      };
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.values));
      localStorage.setItem("token", JSON.stringify(action.payload.data.jwt));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.values,
        token: action.payload.data.jwt,
      };
    case "SIGNUP":
      console.log("hey im ma do it");
      localStorage.setItem("user", JSON.stringify(action.payload.values));
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload.data.token.token)
      );
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.values,
        token: action.payload.data.token.token,
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
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getCurrentUser();
    getAllRequests();
  }, []);

  const getAllRequests = async () => {
    axios.get("http://localhost:3000/requests", {
      headers: {
        Authorization: `Basic ${token}`,
      },
    }).then(res => {
      console.log(res.data);
      dispatch({
        type: "ALLREQUESTS",
        payload: res.data,
      });
    })
  };
  const getCurrentUser = async () => {
    axios
      .get("http://localhost:3000/users", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        if (state.isAuthentication !== "") {
          const user = JSON.parse(localStorage.getItem("user"));
          const curUser = res.data.find((item) => item.email === user.email);
          console.log(curUser);
          dispatch({
            type: "CURRENTUSER",
            payload: curUser,
          });
        }
        //console.log(res);
      });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Routes />
    </AuthContext.Provider>
  );
}
export default App;
