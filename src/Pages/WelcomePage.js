import React from "react";
import "../Scss/WelcomePage.scss";
import Svg from "../assets/welcomesvg.svg";

const WelcomePage = () => {
  return (
    <div className="w-full h-screen flex flex-row justify-center">
      <div className="w-1/2 h-screen flex flex-col justify-center items-center">
        <div className="form flex flex-col lg:w-1/2 w-full">
          <h1 className="text-5xl mb-10 text-cyan-600 ">Task Mate</h1>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div class="mt-1 flex rounded-md shadow-sm h-10">
            <input
              type="text"
              name="email"
              id="email"
              class="mt-1 block w-full h-14 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              placeholder="Email"
            />
          </div>

          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mt-10"
          >
            Password
          </label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="password"
              id="password"
              class="mt-1 block w-full h-14 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              placeholder="Password"
            />
          </div>
          <button className="mt-10 mb-5 bg-cyan-600 text-white h-14 rounded-md hover:bg-cyan-700 transition-colors">
            Login
          </button>
          <button className="bg-green-600 text-white h-14 rounded-md hover:bg-green-700 transition-colors">
            Register
          </button>
        </div>
      </div>
      <div className="bg-cyan-50 lg:w-1/2 h-screen p-10 hidden lg:block w-0">
        <img src={Svg} alt="svg" className="w-full h-full" />
      </div>
    </div>
  );
};

export default WelcomePage;
