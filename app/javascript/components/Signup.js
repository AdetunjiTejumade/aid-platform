import React, { useState } from "react";
import { useForm } from "react-hook-form";

function SignUp() {
    return (
        <div className="pb-12">
      {/* become a volunteer requ */}
      <header className="bg-blue-500 px-12 h-36 grid content-center">
        <h1 className="font-bold text-5xl text-white">Sign Up</h1>
      </header>

      {/* add transitions */}

      <form className="pt-20 px-20">
        <div className="group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
          <label className=" block text-2xl ">
            Your first name{" "}
            <span className="text-red-500" title="This field is required">
              *
            </span>
          </label>
          <input
            name="firstname"
            // ref={register({
            //   required: true,
            // })}
            className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
            // onChange={(e) => setFirstname(e.target.value)}
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
            // ref={register({
            //   required: true,
            // })}
            className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
            // onChange={(e) => setLastname(e.target.value)}
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
            // ref={register({
            //   required: true,
            // })}
            placeholder="Enter your email address"
            className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
            // onChange={(e) => setEmail(e.target.value)}
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
            // ref={register({
            //   required: true,
            // })}
            className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
            // onChange={(e) => setPassword(e.target.value)}
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
            // ref={register({
            //   required: true,
            // })}
            className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
            // onChange={(e) => setComfirmPassword(e.target.value)}
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
            name="id"
            type="file"
            // ref={register({
            //   required: true,
            // })}
            className="mt-2 py-4"
          />
        </div>

        <button
          type="submit"
          className="block mb-6 px-14 font-semibold outline-none py-4 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
        <div className="text-right">
          <p className="">
            {/* Already have an account?<Link to={{pathname: '/login'}}>Login</Link> */}
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