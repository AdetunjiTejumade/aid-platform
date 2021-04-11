import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
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

    // console.log(event.target.files[0]);
  };

  const uploadFile = (file, user) => {
    const upload = new DirectUpload(
      file,
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

              setTimeout(() => {
                window.location.reload();
              }, 3500);
              history.push("/map");
            },

            (error) => {
              console.log("Error", error);
            }
          );

        return res;
      }
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
      .post("https://helping-neighbours.herokuapp.com/auth/signup/", {
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

        console.log(res);
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

        {/* add transitions */}

        <form className="pt-20 px-20" onSubmit={handleSubmit(onSubmit)}>
          <div className="group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
            <label className=" block text-2xl ">
              Your first name{" "}
              <span className="text-red-500" title="This field is required">
                *
              </span>
            </label>
            <input
              name="firstname"
              ref={register({
                required: true,
              })}
              className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
              onChange={handleFirstName}
            />
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
              ref={register({
                required: true,
              })}
              className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
              onChange={handleLastName}
            />
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

          <div className="mt-14 mb-14 group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
            <label className=" block text-2xl ">
              Confirm Password{" "}
              <span className="text-red-500" title="This field is required">
                *
              </span>
            </label>
            <input
              name="confirm password"
              type="password"
              ref={register({
                required: true,
              })}
              className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
              // onChange={handleInputChange}
            />
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
              // ref={register({
              //   required: true,
              // })}
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
          <div className="text-right">
            <p className="">
              Already have an account?<Link to="/login">Login</Link>
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
