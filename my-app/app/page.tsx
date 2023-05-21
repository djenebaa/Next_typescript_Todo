import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="Home flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold text-purple-500 mb-20">To-do List Typescript/React</h1>
      <div className="bg-purple-400 w-full h-screen flex flex-col items-center justify-center rounded-xl">
        <input
          type="text"
          className="rounded-xl p-2 border-2 border-purple-700"
          placeholder="Add a Task"
        />
        <input
          type="button"
          value="Add"
          className="bg-pink-600 rounded-full p-2 m-2 hover:bg-pink-400 transition 500 text-white"
        />
        {/* **************/}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-cyan-500 text-white">
          <table className="w-full border-collapse border border-slate-500 ">
            <thead>
              <tr>
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
              <tr>
                <td className="px-6 py-3">Task Name</td>
                <td className="px-6 py-3">Status</td>
                <td className="px-6 py-3">
                  <button
                    type="submit"
                    className="bg-pink-600 p-2 m-2 rounded-full hover:bg-pink-400 transition 500"
                  >
                    Delete
                  </button>
                  <Link href="/update">
                    <button type="submit" className="bg-green-600 p-2 rounded-full hover:bg-green-400 transition 500">
                      Update
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

