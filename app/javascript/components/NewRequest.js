import React, { useState, useContext, useRef, useLayoutEffect } from "react";
import {
  AllRequestContext,
  UserIdContext,
  ErrorContext,
} from "../components/contexts/ContextFile";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Footer from "./pages/Footer";

function RequestForm() {
  let { error, setError } = useContext(ErrorContext);
  const csrf = document.querySelector('meta[name="csrf-token"]').content;
  const { allRequest, setAllRequest } = useContext(AllRequestContext);

  const { userId } = useContext(UserIdContext);

  const [title, setTitle] = useState("");
  const [requestType, setRequestType] = useState("one_time_task");
  const [address, setAddress] = useState("");
  const [fulfilled, setFulfilled] = useState();
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [descriptionErr, setDescriptionErr] = useState([]);

  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
  });
  const [loading, setLoading] = useState(false);
  const handleType = (e) => {
    setRequestType(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleFulfilled = (e) => {
    setFulfilled(e.target.value);
  };
  const handleTitle = (e) => {
    setFulfilled(e.target.value);
  };

  const token = JSON.parse(localStorage.getItem("token"));
  const csrf = document.querySelector('meta[name="csrf-token"]').content;
  const sendRequest = async (params) => {
    setLoading(true);
    let res = axios
<<<<<<< HEAD
      .post("https://helping-neighbours.herokuapp.com/requests/", params, {
=======
      .post("http://127.0.0.1:3000/requests", params, {
>>>>>>> main
        headers: {
          "X-CSRF-Token": csrf,
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        let tempRequest = [response.data, ...allRequest];
        setAllRequest(tempRequest);
        setDescription("");
        setRequestType("");

        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || error.statusText);
        setLoading(false);
      });
    return res;
  };

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const params = {
      title,
      description,
      address,
      request_type: requestType,
      lat,
      lng,
      fulfilled,
      user_id: userId,
    };
    sendRequest(params);
  }, [lng]);

  //41,aina aladi street,Alagbado,lagos,nigeria We need volunteers to help us in cleaning the community center
  const onSubmit = () => {
    const getCoordinates = () => {
      // const url = `http://api.positionstack.com/v1/forward?access_key=699a6449c786b9542657783c908f666a&query=${address}`;
      const url = `https://api.opencagedata.com/geocode/v1/json?key=4d0dbb0e5630425db93445f959182b5a&q=${address}`;
      axios
        .get(url)
        .then((result) => {
          setLat((prev) => result.data.results[0].geometry.lat);
          setLng((prev) => result.data.results[0].geometry.lng);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCoordinates();
  };
  return (
    <>
      <div className="pb-12">
        <header className="bg-blue-500 px-12 h-36 grid content-center">
          <h1 className="font-bold text-5xl text-white">Request Help</h1>
        </header>

        <form
          className="pt-20 px-12 md:px-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
            <label className=" block text-2xl ">
              Title{" "}
              <span className="text-red-500" title="This field is required">
                *
              </span>
            </label>
            <textarea
              name="title"
              ref={register({
                required: true,
                maxLength: 300,
              })}
              placeholder="Request title"
              className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div className="mt-14 group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
            <label className=" block text-2xl ">
              Description{" "}
              <span className="text-red-500" title="This field is required">
                *
              </span>
            </label>
            <textarea
              name="description"
              ref={register({
                required: "Decription cannot be empty",
                maxLength: {
                  value: 300,
                  message: "Decription cannot be more than 300 charaters",
                },
              })}
              placeholder="Describe your request"
              className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <span className="text-red-600">{errors.description.message}</span>
            )}
          </div>

          <div className="mt-14 group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
            <label className=" block text-2xl ">
              Address{" "}
              <span className="text-red-500" title="This field is required">
                *
              </span>
            </label>
            <textarea
              name="address"
              ref={register({
                required: "Address cannot be empty",
                maxLength: {
                  value: 300,
                  message: "Decription cannot be more than 300 charaters",
                },
              })}
              placeholder="Your address"
              className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
              <span className="text-red-600">{errors.address.message}</span>
            )}
          </div>

          <div className="mt-14 group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
            <label className=" block text-2xl ">
              Type{" "}
              <span className="text-red-500" title="This field is required">
                *
              </span>
            </label>
            <select
              name="request_type"
              ref={register({
                required: true,
              })}
              className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
              onChange={(e) => String(setRequestType(e.target.value))}
            >
              <option value="one_time_task">One time task</option>
              <option value="material_need">Material needs</option>
              {/* <option value="As mentioned above">As mentioned above</option> */}
            </select>
            {errors.request_type && (
              <span className="text-red-600">Select a request type</span>
            )}
          </div>

          <div className="mt-14 mb-12 group opacity-50 hover:opacity-100 text-gray-400 focus-within:opacity-100 focus-within:text-blue-700">
            <label className="text-2xl mr-2">Fulfilled</label>
            <input
              name="status"
              type="radio"
              value="true"
              ref={register({
                required: true,
              })}
              className="mr-4"
              onChange={(e) => setFulfilled(true)}
            />
            <label className="text-2xl mr-2">Unfulfilled</label>
            <input
              type="radio"
              name="status"
              value="false"
              ref={register({
                required: true,
              })}
              onChange={(e) => setFulfilled(false)}
            />
          </div>
          <div>{error && <span className="form-error">{error}</span>}</div>

          <button
            type="submit"
            className="block px-14 font-semibold outline-none py-4 bg-blue-500 text-white rounded"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
      <>
        <Footer />
      </>
    </>
  );
}

export default RequestForm;
