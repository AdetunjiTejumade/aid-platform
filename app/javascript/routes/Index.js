import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/Signup"
// import Navbar from "../components/Navbar";
import { AuthContext } from "../components/App";

function Routes() {
  const { state } = useContext(AuthContext);
  console.log(state.isAuthenticated);
  return (
    <Router>
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
          {state.isAuthenticated ? (
            <Link to="/logout" className="bg-blue-500 text-white p-6 md:inline">
              Log out
            </Link>
          ) : (
            <Link
              to="/sign_up"
              className="bg-blue-500 text-white p-6 md:inline"
            >
              SIGN UP
            </Link>
          )}
        </nav>
      </div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/sign_up">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
