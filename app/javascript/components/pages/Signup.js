import axios from "axios";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { UserContext, ErrorContext } from "../contexts/ContextFile";
import Footer from "./Footer";
import { DirectUpload } from "activestorage";

function SignUp() {
  const history = useHistory();

  const { setUserData } = useContext(UserContext);
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
  });
  const csrf = document.querySelector('meta[name="csrf-token"]').content;
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState({});

  const [loading, setLoading] = useState(false);

  let { error, setError } = useContext(ErrorContext);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleAvatar = (event) => {
    setAvatar(event.target.files[0]);

  };

  const uploadFile = (file, user) => {
    const upload = new DirectUpload(
      file,
<<<<<<< HEAD
      "https://helping-neighbours.herokuapp.com/rails/active_storage/direct_uploads"
    );
    upload.create((error, blob) => {
      if (error) {
        // console.log(error)
      } else {
        let res = axios
          .patch(`https://helping-neighbours.herokuapp.com/${user.user.id}/`, {
            auth: {
              avatar: blob.signed_id,
            },
          },{
            headers: {
              "X-CSRF-Token": csrf,
            },
          })
          .then(
            (response) => {
              // console.log(response.data);
=======
      "http://127.0.0.1:3000/rails/active_storage/direct_uploads"
    );
    upload.create((error, blob) => {
      let res = axios
        .patch(
          `http://127.0.0.1:3000/users/${user.user.id}`,
          {
            auth: {
              avatar: blob.signed_id,
            },
          }
        )
        .then((response) => {
          console.log("I got here");
>>>>>>> main

          setTimeout(() => {
            window.location.reload();
          }, 3500);
          history.push("/map");
        })
        .catch((error) => {
          console.log("Error", error);
        });

      return res;
    });
  };
  const onSubmit = async (e) => {
    setLoading(true);

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    let res = await axios
<<<<<<< HEAD
      .post("https://helping-neighbours.herokuapp.com/auth/signup/", {
=======
      .post("http://127.0.0.1:3000/auth/signup", {
>>>>>>> main
        auth: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        },
      },{
        headers: {
          "X-CSRF-Token": csrf,
        },
      })
      .then((response) => {
        uploadFile(avatar, response.data);

        setUserData({
          token: response.data.token.token,
          isLoggedIn: true,
          user: data,
        });
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.token.token)
        );
        localStorage.setItem("user", JSON.stringify(data));

        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message || error.statusText);
        setLoading(false);
      });
    return res;
  };
  return (
    <>
      <div className="pb-12">
        {/* become a volunteer request */}
        <header className="bg-blue-500 px-12 h-36 grid content-center">
          <h1 className="font-bold text-5xl text-white">Sign Up</h1>
        </header>

        <form
          className="pt-20 px-12 md:px-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
            <label className=" block text-2xl ">
              Your first name{" "}
              <span className="text-red-500" title="This field is required">
                *
              </span>
            </label>
            <input
              name="firstname"
              placeholder="Enter your first name"
              ref={register({
                required: true,
              })}
              className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
              onChange={handleFirstName}
            />
            {errors.firstname && (
              <span className="text-red-600">First name cannot be empty </span>
            )}
          </div>

          <div className="mt-14 group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
            <label className=" block text-2xl ">
              Your last name{" "}
              <span className="text-red-500" title="This field is required">
                *
              </span>
            </label>
            <input
              name="lastname"
              placeholder="Enter your last name"
              ref={register({
                required: "Last name cannot be empty",
              })}
              className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
              onChange={handleLastName}
            />
            {errors.lastname && (
              <span className="text-red-600">Last name cannot be empty </span>
            )}
          </div>

          <div className="mt-14 group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
            <label className=" block text-2xl ">
              E-mail{" "}
              <span className="text-red-500" title="This field is required">
                *
              </span>
            </label>
            <input
              name="email"
              ref={register({
                required: "Email cannot be empty",
              })}
              placeholder="Enter your email address"
              className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
              onChange={handleEmail}
            />
            {errors.email && (
              <span className="text-red-600">Email cannot be empty</span>
            )}
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
              placeholder="Enter password"
              ref={register({
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
              onChange={handlePassword}
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>

          <div className="mt-14 mb-14 group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
            <label className=" block text-2xl ">
              Confirm Password{" "}
              <span className="text-red-500" title="This field is required">
                *
              </span>
            </label>
            <input
              name="password_repeat"
              type="password"
              placeholder="Confirm password"
              ref={register({
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
              className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
              // onChange={handleInputChange}
            />
            {errors.password_repeat && (
              <span className="text-red-600">
                {errors.password_repeat.message}
              </span>
            )}
          </div>

          <div className="mt-14 mb-14 group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
            <label className=" block text-2xl ">
              Valid id{" "}
              <span className="text-red-500" title="This field is required">
                *
              </span>
            </label>
            <input
              name="document"
              type="file"
              ref={register({
                required: true,
              })}
              className="mt-2 py-4"
              onChange={handleAvatar}
            />
          </div>
          {error && <span className="form-error">{error}</span>}
          <button
            type="submit"
            className="block mb-6 px-14 font-semibold outline-none py-4 bg-blue-500 text-white rounded"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
          <div className="">
            <p className="">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
      <>
        <Footer />
      </>
    </>
  );
}

export default SignUp;
