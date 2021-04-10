import React from "react";

function Counter() {
  return (
    <div className="grid grid-cols-3 mx-20 mt-16 gap-3">
      <div className="bg-blue-400 text-white text-center py-6 rounded">
        <p className="text-4xl">03</p>
        <p className="text-xl">Pending Requests</p>
      </div>
      <div className="bg-blue-400 text-white text-center py-6 rounded">
        <p className="text-4xl">05</p>
        <p className="text-xl">Volunteers</p>
      </div>
      <div className="bg-blue-400 text-white text-center py-6 rounded">
        <p className="text-4xl">10</p>
        <p className="text-xl">Satisfied users</p>
      </div>
    </div>
  );
}
export default Counter;
