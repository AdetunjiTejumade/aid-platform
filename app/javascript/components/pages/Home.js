import React from "react";
import Volunteer from "../../../assets/images/volunteering.svg"
function Home () {
    return(
        <div className="pb-12">
        <header className="h-screen bg-indigo-600 pt-36 px-20 bg-image">
          <div className="w-max">
            <p className="text-5xl font-bold bg-blue-500 py-3 text-white px-6 w-max">
              Letting you focus on
            </p>
            <p className="text-5xl font-bold bg-blue-500 py-3 text-white px-6 w-max">
              making an impact
            </p>
            <p className="text-5xl font-bold bg-white py-3 text-blue-400 px-6 w-max">
              on a family's life
            </p>
          </div>
  
          <div className="mt-8 flex">
            <p className="bg-white px-3 mr-4 py-2 rounded-3xl font-bold uppercase text-blue-500">
              Become a Volunteer 
              {/* add an icon here  */}
            </p>
            <p className="bg-white px-3 py-2 rounded-3xl font-bold uppercase text-blue-500">
              Request Help
            </p>
          </div>
        </header>
        <div className="pt-12 mx-12">
          <h1 className="text-center text-4xl capitalize font-bold">
            Volunteer to help your <br />
            community
          </h1>
          <div className="flex justify-center mt-3">
            <hr className="w-36 border-t-2 border-blue-500"></hr>
          </div>
  
          <div className="grid grid-cols-3 pt-6">
            <div>
              <img src={Volunteer} className="w-100 h-5" />
            </div>
            <div>grid 2</div>
            <div>grid 3</div>
          </div>
        </div>
      </div>
    );
}
export default Home;