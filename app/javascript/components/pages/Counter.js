import React from "react";

function Counter() {
  return (
    <div className="grid grid-cols-3 mx-20 mt-16 gap-3">
      <div className="bg-blue-400 text-white text-center py-6 rounded">
        <p className="text-4xl">3</p>
        <p className="">Pending Requesting</p>
      </div>
      <div className="bg-blue-400 text-white text-center py-6 rounded">
        <p className="text-4xl">5</p>
        <p>Volunteers</p>
      </div>
      <div className="bg-blue-400 text-white text-center py-6 rounded">
        <p className="text-4xl">10</p>
        <p>Satisfied users</p>
      </div>
    </div>
  );
}
export default Counter;
