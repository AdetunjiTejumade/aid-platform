import React from "react";

// import InstagramIcon from "@material-ui/icons/Instagram"
function Footer() {
  return (
    <div className="grid grid-cols-2 px-20 text-white relative bg-gray-800 h-36 mt-20 content-center text-center ">
      {/* absolute bottom-0  bottom-full */}
      <div>
        <h2 className="uppercase">Helping hands</h2>
      </div>
      <div className="">
        <p>1001,Wall Street NY</p>
        {/* <InstagramIcon></InstagramIcon> */}
      </div>
    </div>
  );
}
export default Footer;
