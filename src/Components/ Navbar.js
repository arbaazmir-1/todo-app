import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="nav w-full h-10 bg-white flex flex-row justify-between items-center p-10">
        <h1 className="text-2xl">Task Mate</h1>
        <button className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
