import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Badge from "@material-ui/core/Badge";
// import ToolTip from "./utils/ToolTip";
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
      <div className="">
        <div className="flex justify-between text-blue-500 md:hidden p-6 items-center">
          <Link to="/">HELPING HANDS</Link>

          {/* <div className="">
            <button
              className={toggle ? "hidden" : "block text-xl font-semibold"}
              onClick={Toggle}
            >
              ☰
            </button>
            <button
              className={toggle ? "block text-3xl font-semibold" : "hidden"}
              onClick={Toggle}
            >
              &times;
            </button>
          </div> */}
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn" onClick={Toggle}><span className=" navicon"></span></label>
        </div>
        <div className={toggle ? "block menu md:hidden" : "h-0 hidden"}>
          <nav className="overlay-content font-extrabold text-3xl text-blue-500 px-6 mb-6">
            {userData.isLoggedIn ? (
              <>
                <Tooltip title="Unfufilled Request" placement="left">
                  <Badge badgeContent={unfufilledRequest} color="primary">
                    <HelpOutlineIcon className="text-blue-500" />
                  </Badge>
                </Tooltip>
                <Link
                  to="/map"
                  className="md:mr-12 block md:inline my-3 md:my-0 hover:bg-gray-300"
                  onClick={Toggle}
                >
                  Map
                </Link>
                <Link
                  to="/new"
                  className="md:mr-12 block md:inline my-3 md:my-0"
                  onClick={Toggle}
                >
                  Add Request
                </Link>
                <Republish />
                <ChatDialogue />
                <Link
                  to="/logout"
                  onClick={Logout}
                  className="bg-blue-500 text-white p-6 md:mr-12 block md:inline uppercase"
                >
                  Log out
                </Link>
              </>
            ) : (
              <Link
                to="/signup"
                className="bg-blue-500 text-white p-6 md:mr-12 block md:inline uppercase"
                onClick={Toggle}
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
                <Tooltip
                  title="Unfufilled Request"
                  placement="left"
                  className="mr-5"
                >
                  <Badge badgeContent={unfufilledRequest} color="primary">
                    <HelpOutlineIcon className="text-blue-500" />
                  </Badge>
                </Tooltip>
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
                  className="bg-blue-500 text-white p-6 md:inline mt-2 md:mt-0 uppercase"
                >
                  Log out
                </Link>
              </>
            ) : (
              <Link
                to="/signup"
                className="bg-blue-500 text-white p-6 md:block mt-2 md:mt-0"
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
