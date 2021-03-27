import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "./App";
import axios from "axios";
function Login() {
  const { state, dispatch } = React.useContext(AuthContext);
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
  });
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = React.useState(initialState);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    // event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    axios
      .post("http://localhost:3000/auth/signin", {
        auth: {
          email: data.email,
          password: data.password,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          return res;
        }
        throw res;
      })
      .then((resJson) => {
        dispatch({
          type: "LOGIN",
          payload: resJson.data
        });
        setData({
          isSubmitting: false,
        })
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

  return (
    <div className="pb-12">
      <header className="bg-blue-500 px-12 h-36 grid content-center">
        <h1 className="font-bold text-5xl text-white">Login</h1>
      </header>
      <form className="pt-20 px-20" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-14 group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
          <label className=" block text-2xl ">
            E-mail{" "}
            <span className="text-red-500" title="This field is required">
              *
            </span>
          </label>
          <input
            name="email"
            type="email"
            ref={register({
              required: true,
            })}
            placeholder="Enter your email address"
            className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-14 mb-14 group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
          <label className=" block text-2xl ">
            Password{" "}
            <span className="text-red-500" title="This field is required">
              *
            </span>
          </label>
          <input
            name="password"
            type="password"
            ref={register({
              required: true,
            })}
            className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
            onChange={handleInputChange}
          />
        </div>
        {data.errorMessage && (
          <span className="form-error">{data.errorMessage}</span>
        )}

        <button
          type="submit"
          disabled={data.isSubmitting}
          className="block mb-14 px-14 font-semibold outline-none py-4 bg-blue-500 text-white rounded"
        >
          {data.isSubmitting ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
