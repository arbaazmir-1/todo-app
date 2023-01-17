import React from "react";
import Pomodoro from "../Components/Pomodoro";
import { Link } from "react-router-dom";
const PomodoroPage = () => {
  return (
    <div className="pomodoroContainer flex flex-col justify-center items-center">
      <Pomodoro />
      <Link to="/">
        <button
          className="pomodoroButton
        bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300
        
        "
        >
          Go Back
        </button>
      </Link>
    </div>
  );
};

export default PomodoroPage;
