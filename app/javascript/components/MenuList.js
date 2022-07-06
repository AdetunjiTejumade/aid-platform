import React from "react";
import MenuItems from "./MenuItem";

const MenuList = React.forwardRef(({ requests }, ref) => {
  const renderRequest = () => {
    return requests.map((request, index) => (
      <MenuItems request={request} ref={ref} key={index} />
    ));
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
});

export default MenuList;
