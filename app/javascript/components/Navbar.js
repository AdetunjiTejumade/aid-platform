import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
// import { Button, Tooltip } from "@afc-org/react-tailwind";
import ToolTip from "./utils/ToolTip";
import {
  AllRequestContext,
  UserContext,
  FirstNameContext,
  RequestFormContext,
} from "../components/contexts/ContextFile";
import Republish from "./Republish";
import ChatDialogue from "./ChatDialogue";

// import { AuthContext } from "./App";
function Navbar() {
  const { userData, setUserData } = useContext(UserContext);

  const { allRequest } = useContext(AllRequestContext);

  const { firstName } = useContext(FirstNameContext);

  const { showRequestForm, setShowRequestForm } = useContext(
    RequestFormContext
  );

  const unfufilledRequest = [...allRequest].length;

  const Logout = () => {
    setUserData({
      token: null,
      isLoggedIn: false,
      user: null,
    });

    setTimeout(() => {
      window.location.reload();
    }, 500);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    // <AuthContext.Consumer>
    <div>
      {/* align-items: baseline */}
      <div className="md:flex justify-between text-blue-500 p-6 items-baseline">
        {/* logo */}
        <div className="">
          <Link to="/">HELPING HANDS</Link>
        </div>

        <nav className="md:block ">
          {/* <ToolTip
            tooltipText="Unfufilled Request"
            className="pr-5 block md:inline uppercase"
          >
            ?
          </ToolTip> */}

          {userData.isLoggedIn ? (
            <>
              <Link to="/map" className="pr-5 block md:inline uppercase">
                Map
              </Link>
              <Link to="/new" className="pr-5 block md:inline uppercase">
                Add Request
              </Link>
              
                <Republish /> 
                
               <ChatDialogue />

             
              <Link
                to="/logout"
                onClick={Logout}
                className="bg-blue-500 text-white p-6 md:inline"
              >
                Log out
              </Link>
            </>
          ) : (
            <Link to="/signup" className="bg-blue-500 text-white p-6 md:block">
              SIGN UP
            </Link>
          )}
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
    // </AuthContext.Consumer>
  );
}

export default Navbar;
