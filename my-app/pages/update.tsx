import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../globals.css";
// import Link from 'next/link';

export default function UpdatePage() {
  const router = useRouter();
  const { id } = router.query; // Extract the id from the query parameters

  const [task, setTask] = useState("");
  const [state, setState] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const handleRedirect = () => {
    router.push("/");
  };

  const handleClick = async () => {
    // Check if id and input values are defined and not empty
    if (id && task && state) {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, task, state }),
      };
  
      const response = await fetch(`http://localhost:4000/update/${id}`, options);
      if (response.ok) {
        const data = await response.json();

        const updatedData = data;
        
  
        setUpdateMessage(
          `Data updated successfully: task - ${task}, state - ${state}`
        );
      } else {
        setUpdateMessage("Failed to update data");
      }
    } else {
      setUpdateMessage("Please fill in all the input fields");
    }
  };
  
  
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:4000/${id}`);
  //       const data = await response.json();
  //       setTask(data[0].task);
  //       setState(data[0].state);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  // 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:4000/${id}`);
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              setTask(data[0].task);
              setState(data[0].state);
            }
          } else {
            console.error("Failed to fetch data:", response.status);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [id]);

  return (
    <section className="Update">
      <h1 className="text-xl font-semibold">Modify a Task here</h1>
      <div className="main flex justify-end mb-12">
        <button onClick={handleRedirect}>Go back to Home</button>
      </div>
      <div className="Form flex justify-center space-x-4">
        <input
          type="text"
          placeholder="Modify a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Modify a state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <button type="submit" id="btnSub" onClick={handleClick}>
          Update
        </button>
      </div>
      <p>{updateMessage}</p>
    </section>
  );
}

//         <Link href={`/Home`}>
//            <button >Go back to Home</button>
//         </Link>
        
