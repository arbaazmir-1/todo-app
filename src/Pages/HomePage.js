import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import Task from "../Components/Task";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDataFetched, setDataFetched] = useState(false);

  const addTasks = async () => {
    if (!task) {
      alert("Please fill the field");
    } else {
      try {
        setTasks((prev) => [...prev, task]);
        const docRef = await addDoc(collection(db, user.uid), {
          task: task,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
  const getData = async () => {
    setLoading(true);
    setTasks([]);

    const querySnapshot = await getDocs(collection(db, user.uid));
    querySnapshot.forEach((doc) => {
      setTasks((prev) => [...prev, doc.data().task]);
    });
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <div className="w-full h-full flex flex-row justify-center">
        <div className="tasks w-3/4 h-full  flex flex-col items-center">
          <div
            className="addTask
              w-3/4 h-16 bg-white flex flex-row  items-center p-2 m-2 rounded shadow-md hover:shadow-lg transition-shadow"
          >
            <input
              type="text"
              placeholder="Add Task"
              className="
                w-3/4 h-14 bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1 outline-none"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              className="
                ml-5 bg-cyan-600 text-white h-14 rounded-md hover:bg-cyan-700 transition-colors w-1/4
            "
              onClick={addTasks}
            >
              Add
            </button>
          </div>
          <div className="tasksList w-3/4 h-full flex flex-col items-center overflow-y-scroll">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4"></div>
              </div>
            ) : (
              tasks.map((task, index) => {
                return <Task key={index} task={task} />;
              })
            )}
          </div>
        </div>

        <div className="pomodoro w-1/4 h-full bg-fuchsia-300"></div>
      </div>
      {/* fixed button to logout   */}
      <div className="fixed bottom-0 right-0 m-5">
        <button className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
