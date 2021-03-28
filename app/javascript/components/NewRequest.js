import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "./App";

function RequestForm() {
  const {state, dispatch } = React.useContext(AuthContext);
  console.log(state);
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [requestType, setRequestType] = useState("one_time_task");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [fulfilled, setFulfilled] = useState();
  const [currentUser, setCurrentUser] = useState();

//   const token = JSON.parse(localStorage.getItem("token"));
//   useEffect(() => {
//     getCurrentUser()
//   }, [])
//   const getCurrentUser = async () => {
//     axios.get("http://localhost:3000/users", {
//       headers: {
//         Authorization: `Basic ${token}`,
//       },
//     }).then(res => {
//       if(state.isAuthentication){
//         const user = JSON.parse(localStorage.getItem("user"));
//         const curUser = response.data.find((item) => item.email === user.email)
        
//         setCurrentUser(curUser)
//       }
//       console.log(res);
//     })
// };
  // HEADERS

  // const header = JSON.parse(localStorage.getItem("header"));
  const token = JSON.parse(localStorage.getItem("token"));
  const sendRequest = (params) => {
    axios
      .post("http://localhost:3000/requests", params, { 
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
      user_id : state.currentUser.id,
    };
    sendRequest(params)
  }, [lng]);
  //41,aina aladi street,Alagbado,lagos,nigeria We need volunteers to help us in cleaning the community center
  const onSubmit = () => {
    const getCoordinates = () => {
      const url = `http://api.positionstack.com/v1/forward?access_key=699a6449c786b9542657783c908f666a&query=${address}`;
      axios
        .get(url)
        .then((result) => {
          setLat((prev) => result.data.data[0].latitude);
          setLng((prev) => result.data.data[0].longitude);
          console.log(result.data.data[0].latitude);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCoordinates();
  };
  return (
    <div className="pb-12">
      <header className="bg-blue-500 px-12 h-36 grid content-center">
        <h1 className="font-bold text-5xl text-white">Request Help</h1>
      </header>

      <form className="pt-20 px-20" onSubmit={handleSubmit(onSubmit)}>
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
              required: true,
              maxLength: 300,
            })}
            placeholder="Describe your request"
            className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
            onChange={(e) => setDescription(e.target.value)}
          />
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
              required: true,
              maxLength: 300,
            })}
            placeholder="Your address"
            className="mt-4 py-4 border-t-0 border-l-0 border-r-0 border-2 border-solid border-gray-300 outline-none w-full focus:border-blue-600 focus:opacity-75 border-opacity-0 group-hover:border-opacity-75"
            onChange={(e) => setAddress(e.target.value)}
          />
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
        <button
          type="submit"
          className="block px-14 font-*semibold outline-none py-4 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RequestForm;
