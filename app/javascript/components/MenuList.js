import React from "react";
import MenuItems from "./MenuItem";

export default function MenuList({ requests }) {
  const renderRequest = () => {
    return requests.map((request) => <MenuItems request={request} />);
  };

  return (
    <div>
      {requests.length > 0 ? (
        renderRequest()
      ) : (
        <p className="text-center">Nothing to republish</p>
      )}
    </div>
  );
}
