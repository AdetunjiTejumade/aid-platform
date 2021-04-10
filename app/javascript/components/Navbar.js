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
  const [toggle, setToggle] = useState(false);
  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div>
        <div className="flex justify-between text-blue-500 md:hidden p-6">
          <Link to="/">HELPING HANDS</Link>

          <div className="">
            <button
              className={
                toggle ? "hidden" : "block text-xl font-semibold"
              }
              onClick={Toggle}
            >
              ☰
            </button>
            <button
              className={
                toggle ? "block text-3xl font-semibold" : "hidden"
              }
              onClick={Toggle}
            >
              &times;
            </button>
          </div>
        </div>
        <div className={toggle ? "block md:hidden transition" : "hidden"}>
          <nav className="overlay-content font-extrabold text-3xl text-blue-500 px-6 mb-6">
            {userData.isLoggedIn ? (
              <>
                <Link to="/map" className="md:mr-12 block md:inline">
                  Map
                </Link>
                <Link to="/new" className="md:mr-12 block md:inline">
                  Add Request
                </Link>
                <Republish />
                <ChatDialogue />
                <Link
                  to="/logout"
                  onClick={Logout}
                  className="bg-blue-500 text-white p-6 md:mr-12 block md:inline"
                >
                  Log out
                </Link>
              </>
            ) : (
              <Link
                to="/signup"
                className="bg-blue-500 text-white p-6 md:mr-12 block md:inline"
              >
                SIGN UP
              </Link>
            )}
          </nav>
        </div>
      </div>
      <div>
        <div className="md:flex justify-between text-blue-500 p-6 items-baseline hidden md:block">
          {/* logo
           */}
          <div className="">
            <Link to="/">HELPING HANDS</Link>
          </div>
          <nav className="md:block ">
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
              <Link
                to="/signup"
                className="bg-blue-500 text-white p-6 md:block"
              >
                SIGN UP
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
