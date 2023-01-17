import React from "react";
import "../Scss/WelcomePage.scss";
import Svg from "../assets/welcomesvg.svg";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const navigate = useNavigate();

  const register = () => {
    console.log("register");
    if (!name || !email || !password) {
      console.log(name, email, password);
      alert("Please fill all the fields");
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(user));

          navigate("/home");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setError(errorMessage);
          setLoading(false);
          // ..
        });
    }
  };
  const login = () => {
    if (!email || !password) {
      alert("Please fill all the fields");
    } else {
      setError("");
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/home");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setError(errorMessage);
          setLoading(false);
          // ..
        });
    }
  };

  return (
    <div className="w-full h-screen flex flex-row justify-center">
      {showEmailVerification && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium">Email Verification</h2>
            <p className="text-gray-600">Please Verify Your Email!</p>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600"
              onClick={() => showEmailVerification(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="w-1/2 h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl mb-10 text-cyan-600 ">Task Mate</h1>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && !loading && <p className="text-red-500">{error}</p>}
        {showLogin ? (
          <div className="form flex flex-col lg:w-1/2 w-full login">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                name="password"
                id="password"
                class="mt-1 block w-full h-14 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="mt-10 mb-5 bg-cyan-600 text-white h-14 rounded-md hover:bg-cyan-700 transition-colors"
              onClick={login}
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <button
              className="bg-green-600 text-white h-14 rounded-md hover:bg-green-700 transition-colors"
              onClick={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
            >
              Register
            </button>
            <p className="mt-5 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors text-center">
              Use Pomodoro Only
            </p>
          </div>
        ) : (
          <div className="form flex flex-col lg:w-1/2 w-full register">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div class="mt-1 flex rounded-md shadow-sm h-10">
              <input
                type="text"
                name="name"
                id="name"
                class="mt-1 block w-full h-14 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mt-10"
            >
              Email address
            </label>
            <div class="mt-1 flex rounded-md shadow-sm h-10">
              <input
                type="text"
                name="email"
                id="email"
                class="mt-1 block w-full h-14 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                name="password"
                id="password"
                class="mt-1 block w-full h-14 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="mt-10 mb-5 bg-green-600 text-white h-14 rounded-md hover:bg-green-700 transition-colors"
              onClick={register}
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>
            <button
              className="bg-cyan-600 text-white h-14 rounded-md hover:bg-cyan-700 transition-colors"
              onClick={() => {
                setShowLogin(true);
                setShowRegister(false);
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>

      <div className="bg-cyan-50 lg:w-1/2 h-screen p-10 hidden lg:block w-0">
        <img src={Svg} alt="svg" className="w-full h-full" />
      </div>
    </div>
  );
};

export default WelcomePage;
