import React from "react";
import { useState, useEffect } from "react";
const Pomodoro = () => {
  const [timeMinutes, setTimeMinutes] = useState(25);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [timer, setTimer] = useState(`${timeMinutes}:${timeSeconds}0`);
  const [timerExists, setTimerExists] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerFinish, setTimerFinished] = useState(false);

  const timerStarted = () => {
    setTimerOn(true);
    setTimerPaused(false);
    setTimerExists(true);
    setTimerFinished(false);
  };
  const timerStopped = () => {
    setTimerOn(false);
    setTimerPaused(true);
    setTimerExists(true);
    setTimerFinished(false);
  };
  const timerReset = () => {
    setTimerOn(false);
    setTimerPaused(false);
    setTimerFinished(false);
    setTimeMinutes(25);
    setTimeSeconds(0);
    setTimerExists(false);
  };
  const timerFinished = () => {
    setTimerOn(false);
    setTimerPaused(false);
    setTimerFinished(true);
    setTimeMinutes(25);
    setTimeSeconds(0);
    setTimerExists(false);
  };

  useEffect(() => {
    if (timerOn && !timerPaused) {
      const interval = setInterval(() => {
        if (timeSeconds > 0) {
          setTimeSeconds((prevSeconds) => prevSeconds - 1);
        } else if (timeMinutes > 0) {
          setTimeMinutes((prevMinutes) => prevMinutes - 1);
          setTimeSeconds(59);
        } else {
          timerFinished();

          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerOn, timerPaused, timeMinutes, timeSeconds, timerFinished]);
  useEffect(() => {
    setTimer(`${timeMinutes}:${timeSeconds < 10 ? "0" : ""}${timeSeconds}`);
  }, [timeMinutes, timeSeconds]);
  return (
    <>
      <div className="timer w-full h-20">
        <div className="timer__time w-full h-full flex justify-center items-center mt-5">
          <h1 className="text-5xl text-white">{timer}</h1>
        </div>
      </div>
      <div className="timer__buttons w-full h-20 flex justify-center items-center">
        <button
          className="bg-green-500 text-white h-12 w-12 rounded-full mr-5 hover:bg-green-600 transition-colors flex justify-center items-center"
          onClick={
            timerExists ? (timerOn ? timerStopped : timerStarted) : timerStarted
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
        <button
          className="bg-red-500 text-white h-12 w-12 rounded-full mr-5 hover:bg-red-600 transition-colors flex justify-center items-center"
          onClick={timerOn ? timerStopped : timerReset}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button
          className="bg-yellow-500 text-white h-12 w-12 rounded-full mr-5 hover:bg-yellow-600 transition-colors flex justify-center items-center"
          onClick={timerReset}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <div className="times w-full h-fit p-5">
        <button
          className="w-full h-20 bg-white flex flex-row justify-between items-center p-5 rounded shadow-md hover:shadow-lg transition-shadow m-2"
          onClick={() => {
            setTimeMinutes(25);
            setTimeSeconds(0);
            setTimerExists(false);
            timerStarted();
          }}
        >
          <h1 className="text-2xl">25:00</h1>
        </button>
        <button
          className="w-full h-20 bg-white flex flex-row justify-between items-center p-5 rounded shadow-md hover:shadow-lg transition-shadow m-2 "
          onClick={() => {
            setTimeMinutes(15);
            setTimeSeconds(0);
            setTimerExists(false);
            timerStarted();
          }}
        >
          <h1 className="text-2xl">15:00</h1>
        </button>
        <button
          className="w-full h-20 bg-white flex flex-row justify-between items-center p-5 rounded shadow-md hover:shadow-lg transition-shadow m-2"
          onClick={() => {
            setTimeMinutes(5);
            setTimeSeconds(0);
            setTimerExists(false);
            timerStarted();
          }}
        >
          <h1 className="text-2xl">5:00</h1>
        </button>
      </div>

      <div className="customTime__input w-full h-20 flex justify-center items-center">
        <input
          type="number"
          className="w-20 h-10 rounded shadow-md text-center"
          placeholder="25"
          onChange={(e) => {
            if (!timerExists) {
              setTimeMinutes(e.target.value);
              setTimeSeconds(0);
            }
          }}
        />

        <button
          className="bg-green-500 text-white h-12 w-12 rounded-full ml-5 hover:bg-green-600 transition-colors flex justify-center items-center"
          onClick={() => {
            if (!timerExists) {
              setTimerExists(true);
              timerStarted();
            }
          }}
        >
          Set
        </button>
      </div>
    </>
  );
};

export default Pomodoro;
