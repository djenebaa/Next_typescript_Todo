"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";




const Home = () => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDeleteClick = (id: any) => {
    fetch(`http://localhost:4000/delete/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          // Record deleted successfully
          setData(data.filter((item: any) => item.id !== id)); // Remove the deleted item from the data state
        } else if (response.status === 404) {
          // Record not found
          console.log(`Record with id ${id} not found`);
        } else {
          // Error deleting record
          console.log("Error deleting record");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClick = async () => {
    const taskField = document.getElementById("task") as HTMLInputElement;
    const stateField = document.getElementById("state") as HTMLInputElement;
    const task = taskField.value;
    const state = stateField.value;
  
    if (task.trim() === "" || state.trim() === "") {
      // Input fields are empty, display an error message or perform necessary action
      setErrorMessage("Input fields cannot be empty");
      return;
    }
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: task, state: state }),
    };
  
    try {
      const response = await fetch("http://localhost:4000/create", options);
  
      if (response.ok) {
        // Task added successfully
        fetchData(); // Fetch updated data
        taskField.value = "";
        stateField.value = "";
        setErrorMessage("");
      } else {
        // Error adding task
        setErrorMessage("Error adding task");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error adding task");
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="Home flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold mb-20">To-do List Typescript/React</h1>
      <div className="bg-gray-900 w-full h-screen flex flex-col items-center justify-center rounded-xl space-y-4">
        <input
          type="text"
          className="AddValue"
          placeholder="Add a Task"
          id="task"
        />
        <input
          type="text"
          className="AddValue "
          placeholder="State"
          id="state"
        />
        <input
          onClick={handleClick}
          type="button"
          value="Add"
          className="bg-cyan-800 rounded-xl p-2 px-8 m-2 hover:bg-cyan-600 transition 500 text-white"
        />
        {errorMessage && (
          <p className="text-cyan-900 font-bold">{errorMessage}</p>
        )}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-cyan-500 text-white m-4">
          <table className="w-full border-collapse border border-slate-500 ">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Task Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-6 py-3">{item.id}</td>
                  <td className="px-6 py-3">{item.task}</td>
                  <td className="px-6 py-3">{item.state}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      type="submit"
                      className="bg-pink-500 hover:bg-pink-400 transition 500"
                    >
                      Delete
                    </button>
                    <Link href={`/update/?id=${item.id}`}>
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-400 transition 500"
                      >
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Home;
