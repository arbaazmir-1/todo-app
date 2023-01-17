import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import Task from "../Components/Task";
import { useNavigate } from "react-router-dom";
import Pomodoro from "../Components/Pomodoro";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDataFetched, setDataFetched] = useState(false);
  const [newTaskLoading, setNewTaskLoading] = useState(false);
  const navigate = useNavigate();

  const addTasks = async () => {
    if (!task) {
      alert("Please fill the field");
    } else {
      try {
        //create a temporary id
        const id = Math.floor(Math.random() * 100000000000000000000000000000);
        setTasks((prev) => [{ id: id, task: task }, ...prev]);
        setNewTaskLoading(true);
        const docRef = await addDoc(collection(db, user.uid), {
          task: task,
        });

        setTask("");
        setNewTaskLoading(false);
        //delete the temporary id and replace it with the id from firebase
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks((prev) => [{ id: docRef.id, task: task }, ...newTasks]);
      } catch (e) {
        setNewTaskLoading(false);
        console.log(e);
      }
    }
  };
  const deleteTaskFromArray = async (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    const deleted = await deleteDoc(doc(db, user.uid, id));
    console.log(deleted);
  };
  const getData = async () => {
    setLoading(true);
    setTasks([]);

    const querySnapshot = await getDocs(
      collection(db, user.uid),
      orderBy("createdAt", "desc")
    );
    querySnapshot.forEach((doc) => {
      setTasks((prev) => [...prev, { id: doc.id, task: doc.data().task }]);
    });
    setLoading(false);
  };

  const updateTodo = async (id, todo) => {
    try {
      //update the task in the array

      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { id: id, task: todo };
        } else {
          return task;
        }
      });
      setTasks(newTasks);

      const docRef = doc(db, user.uid, id);
      await updateDoc(docRef, {
        task: todo,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    getData();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <div className="w-full h-full flex flex-col justify-center lg:flex-row md:flex-row ">
        <div className="tasks w-full h-full flex flex-col items-center lg:w-3/4 md:w-3/4">
          <div className="addTask w-3/4 h-16 bg-white flex flex-row items-center p-2 m-10 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
            <input
              type="text"
              placeholder="Add Task"
              className="w-3/4 h-14 bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1 outline-none"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              className="ml-5 bg-cyan-600 text-white h-14 rounded-md hover:bg-cyan-700 transition-colors w-1/4"
              disabled={newTaskLoading}
              onClick={addTasks}
            >
              {newTaskLoading ? "Adding..." : "Add"}
            </button>
          </div>
          <div className="tasksList w-full h-full flex flex-col items-center overflow-y-scroll lg:w-3/4 md:w-3/4">
            {loading && !error ? (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-cyan-200 h-12 w-12 mb-4 animate-pulse"></div>
                <p>Loading</p>
              </div>
            ) : (
              tasks?.map((task, index) => {
                return (
                  <Task
                    key={index}
                    task={task}
                    deleteTask={deleteTaskFromArray}
                    updateTask={updateTodo}
                  />
                );
              })
            )}
            {tasks.length === 0 && !loading && (
              <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-2xl text-gray-500">No Tasks</h1>
              </div>
            )}
          </div>
        </div>

        <div className="pomodoro w-full h-full bg-cyan-500 lg:w-1/4 md:w-1/4 sm:w-full">
          <Pomodoro />
        </div>
      </div>
      {/* fixed button to logout   */}
      <div className="fixed bottom-0 right-0 m-5">
        <button
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
