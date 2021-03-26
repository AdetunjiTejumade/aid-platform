import React, { useState, useEffect } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import { AuthContext } from "./App";
function Navbar() {
    // const user = React.useContext(AuthContext)
    // console.log(user);
  return (
    <AuthContext.Consumer>
        <div>
      <div className="md:flex justify-between text-blue-500 p-6">
        {/* logo */}
        <div className="">
          <Link to="/">HELPING HANDS</Link>
        </div>

        <nav className="md:block ">
          <Link to="/map" className="pr-5 block md:inline uppercase">
            Map
          </Link>
          <Link to="/create_new" className="pr-5 block md:inline uppercase">
            Add Request
          </Link>

          <Link to="/request_helps" className="pr-5 uppercase block md:inline">
            Request Helps
          </Link>
          <Link to="/sign_up" className="bg-blue-500 text-white p-6 md:inline">
            SIGN UP
          </Link>
          {/* <a
            className="bg-blue-500 text-white p-6 block md:inline"
            
          >
            Log out
          </a> */}

          {/* <Link to="/login" className="bg-blue-500 text-white p-6">
                Login
              </Link> */}
          {/*  */}
        </nav>
      </div>
      </div>
    </AuthContext.Consumer>
  );
}

export default Navbar;
