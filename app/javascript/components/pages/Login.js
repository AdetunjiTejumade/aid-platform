import React, {  useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { UserContext,  ErrorContext } from '../contexts/ContextFile';
import axios from "axios";
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  let { error, setError } = useContext(ErrorContext);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
  });
  const history = useHistory();
  const { setUserData } = useContext(UserContext);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };


  const onSubmit = (event) => {

    setLoading(true);

  const data = {
    email: email,
    password: password,
  }
  let res = axios
      .post("http://localhost:3000/auth/signin", {
        auth: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        setUserData({
          token: response.data.jwt,
          isLoggedIn: true,
          user: data,
        });
        localStorage.setItem("token", JSON.stringify(response.data.jwt));
        localStorage.setItem("user", JSON.stringify(data));
        setTimeout(() => {
          window.location.reload();
        }, 3500);
        history.push("/map");
        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || error.statusText);
        setLoading(false);
      });
      return res
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
            onChange={handleEmail}
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
            onChange={handlePassword}
          />
        </div>
        {error && (
          <span className="form-error">{error}</span>
        )}

        <button
          type="submit"
          disabled={loading}
          className="block mb-14 px-14 font-semibold outline-none py-4 bg-blue-500 text-white rounded"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
