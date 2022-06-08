import React, { useContext} from "react";
import { AllRequestContext, AllVolunteerContext } from "../contexts/ContextFile";

function Counter() {
  const { allRequest } = useContext(AllRequestContext);

  return (
    <div className="grid grid-cols-3 mx-6 md:mx-20 mt-16 gap-3">
      <div className="bg-blue-400 text-white text-center py-6 rounded">
        <p className="text-4xl">{unfufilledRequest}</p>
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
