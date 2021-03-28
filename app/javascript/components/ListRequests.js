import React, { Fragment } from "react";
import { AuthContext } from "./App";
import { Link } from "react-router-dom";

function ListRequest() {
  const { state, dispatch } = React.useContext(AuthContext);
  const items = state.allRequests;
  const currentUser = state.currentUser.id;
  //console.log(items);
  //TODO show requests by current user at the top and others down
  return (
    <div className="px-2">
      <h1 className="text-4xl">my requests</h1>

      {items.map((items, index) => {
        const {
          title,
          description,
          request_type,
          fulfilled,
          id,
          user_id,
        } = items;
        if (currentUser === user_id) {
          return (
            <div className="mb-12" key={index}>
              <Link to={`/request_helps/${id}`}>{title}</Link>
              <p>{description}</p>
            </div>
          );
        }
      })}
      <h1 className="text-4xl mt-8">Other requests</h1>
      {items.map((items, index) => {
        const {
          title,
          description,
          request_type,
          fulfilled,
          id,
          user_id,
        } = items;
        if (currentUser !== user_id) {
          return (
            <div className="mb-12" key={index}>
              <Link to={`/request_helps/${id}`}>{title}</Link>
              <p>{description}</p>
            </div>
          );
        }
      })}
    </div>
  );
}
export default ListRequest;
