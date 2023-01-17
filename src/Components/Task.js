import React from "react";
import { useState } from "react";
const Task = ({ task, deleteTask, updateTask }) => {
  const [taskUpdate, setUpdateTask] = useState(false);
  const [taskName, setTaskName] = useState(task.task);
  const itemDelete = async () => {
    deleteTask(task.id);
  };
  const update = () => {
    if (taskName === "") {
      alert("Please enter a task");
    } else {
      updateTask(task.id, taskName);
      setUpdateTask(false);
    }
  };
  return (
    <div className="task w-full bg-cyan-50 h-20 flex flex-row items-center justify-between rounded shadow m-2 hover:shadow-xl transition-shadow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 m-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {taskUpdate ? (
        <>
          <input
            type="text"
            className="w-2/4 h-10 p-5 flex items-center text-2xl outline-none"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          />
          <button
            className="bg-green-600 text-white h-14 rounded-md hover:bg-green-700 transition-colors w-1/4"
            onClick={() => {
              update();
            }}
          >
            Update
          </button>
        </>
      ) : (
        <p
          className="w-3/4 h-full flex items-center text-2xl"
          onDoubleClick={() => {
            setUpdateTask(true);
          }}
        >
          {task.task}
        </p>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-10 h-10 m-5 hover:shadow-sm transition-shadow cursor-pointer"
        onClick={itemDelete}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </div>
  );
};

export default Task;
