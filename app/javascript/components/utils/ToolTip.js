import React from "react";

function Tooltip({ children, tooltipText }) {
  const tipRef = React.createRef(null);
  function handleMouseEnter() {
    tipRef.current.style.opacity = 1;
    tipRef.current.style.marginLeft = "20px";
  }
  function handleMouseLeave() {
    tipRef.current.style.opacity = 0;
    tipRef.current.style.marginLeft = "10px";
  }
  return (
    <div
      className="pr-5 block md:inline uppercase"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative mx-2"
        style={{ right: "5%", opacity: 0 }}
        ref={tipRef}
      >
        <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full">
          {tooltipText}
          <svg
            className="absolute text-black h-2 right-0 mr-3 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            //xml:space="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      </div>
      {children}
    </div>
  );
}
// absolute whitespace-no-wrap bg-gradient-to-r from-black to-gray-700 text-white
export default Tooltip;
