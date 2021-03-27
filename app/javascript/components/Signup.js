import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "./App";
import { DirectUpload } from "activestorage";

function SignUp() {
  const { dispatch } = React.useContext(AuthContext);
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
  });

  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    document: {},
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = (event) => {
    if (event.target.name === "document") {
      setData({
        ...data,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
  };
  //   rails/active_storage/direct_uploads
  const uploadFile = (file, user) => {
    const upload = new DirectUpload(
      file,
      "http://localhost:3000/active_storage/direct_uploads"
    );
    upload.create((error, blob) => {
      if (error) {
        console.log(error);
      } else {
        axios
          .put(`http://localhost:3000/users/${user.user.id}`, {
            auth: {
              avatar: blob.signed_id,
            },
          })
          .then((res) => res.json)
          .catch((error) => console.log(error));
      }
    });
  };
  const onSubmit = () => {
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    console.log(data);
    axios
      .post("http://localhost:3000/auth/signup", {
        auth: {
          first_name: data.firstname,
          last_name: data.lastname,
          email: data.email,
          password: data.password,
        },
      })
      .then((response) => {
        dispatch({
          type: "SIGNUP",
          payload: response.data,
        });
      })
      .then((res) => uploadFile(data.document, res.data))
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>

        {/* <div className="mt-14 mb-14 group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
                    <label className=" block text-2xl ">Gender <span className="text-red-500" title="This field is required">*</span></label>
                    <input
                        name="gender"
                        // type="" make radio
                        // ref={register({
                            // required: true,
                        // })}
                        className="mt-2 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 opacity-0 group-hover:opacity-75"
                    />
                </div> */}
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
            onChange={handleInputChange}
          />
        </div>
        {data.errorMessage && (
          <span className="form-error">{data.errorMessage}</span>
        )}
        <button
          type="submit"
          className="block mb-6 px-14 font-semibold outline-none py-4 bg-blue-500 text-white rounded"
        >
          {data.isSubmitting ? "Loading..." : "Submit"}
        </button>
        <div className="text-right">
          <p className="">
            Already have an account?<Link to="/login">Login</Link>
          </p>
        </div>
        {/* {message && (
          <p className={successful ? "text-green-500" : "text-red-500"}>
            {message}
          </p>
        )} */}
      </form>
    </div>
  );
}

export default SignUp;
