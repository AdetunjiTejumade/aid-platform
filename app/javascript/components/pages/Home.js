import React, { useContext, Fragment } from "react";
import Counter from "./Counter";
import Footer from "./Footer";
import pic1 from "../../../assets/images/volunteering.svg";
import pic2 from "../../../assets/images/04.svg";
import pic3 from "../../../assets/images/03.svg";
import { Link, useHistory } from "react-router-dom";

function Home() {

  return (
    <div>
      <div className="pb-12">
        <header className="h-screen bg-indigo-600 pt-36 px-3 md:px-20 bg-image">
          <div className="w-max">
            <p className="header-text md:text-5xl font-bold bg-blue-500 py-3 text-white px-5 md:px-6 w-max">
              Letting you focus on
            </p>
            <p className="header-text md:text-5xl font-bold bg-blue-500 py-3 text-white px-5 md:px-6 w-max">
              making an impact
            </p>
            <p className="header-text md:text-5xl font-bold bg-white py-3 text-blue-400 px-5 md:px-6 w-max ">
              on a family's life
            </p>
          </div>

          <div className="mt-8 md:flex">
            <Link className="bg-white px-3 mb-4 md:mb-0 md:mr-4 py-2 rounded-3xl font-bold uppercase text-blue-500 w-max block" to="/map">
              Become a Volunteer
              {/* add an icon here  */}
            </Link>
            <Link className="bg-white px-3 py-2 rounded-3xl font-bold uppercase text-blue-500 w-max mt-3 md:mt-0" to="/new">
              Request Help
            </Link>
          </div>
        </header>
        <div className="mt-12 mx-6 md:mx-20">
          <h1 className="text-center text-4xl capitalize font-bold">
            Volunteer to help your <br />
            community
          </h1>
          <div className="flex justify-center mt-3">
            <hr className="w-36 border-t-2 border-blue-500"></hr>
          </div>

          <div className="md:grid grid-cols-3 pt-6 gap-4">
            <div className="mt-6">
              <div className="py-3">
                <img src={pic1} className="w-100 h-16" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Direct Help</h2>
              <p className="mt-3">
                Quis esse cillum voluptate qui reprehenderit consequat
                incididunt labore. Quis ea dolore nulla consequat incididunt
                adipisicing veniam consequat fugiat reprehenderit quis irure.
                Ipsum quis qui.
              </p>
            </div>
            <div className="mt-6">
              <div className="py-3">
                <img src={pic2} className="w-100 h-16" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Direct Help</h2>
              <p className="mt-3">
                Quis esse cillum voluptate qui reprehenderit consequat
                incididunt labore. Quis ea dolore nulla consequat incididunt
                adipisicing veniam consequat fugiat reprehenderit quis irure.
                Ipsum quis qui.
              </p>
            </div>
            <div className="mt-6">
              <div className="py-3">
                <img src={pic3} className="w-100 h-16" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Direct Help</h2>
              <p className="mt-3">
                Quis esse cillum voluptate qui reprehenderit consequat
                incididunt labore. Quis ea dolore nulla consequat incididunt
                adipisicing veniam consequat fugiat reprehenderit quis irure.
                Ipsum quis qui.
              </p>
            </div>
          </div>
        </div>
        {/* <>
          <Counter />
        </> */}
      </div>
      <>
        <Footer />
      </>
    </div>
  );
}
export default Home;
