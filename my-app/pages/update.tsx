import React from "react";
import { useRouter } from "next/router";
import '../globals.css';

export default function UpdatePage() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/"); // Replace "/" with the actual URL of your home page
  };

  return (
    <section className="Update bg-pink-200">
      <div className="main flex flex-row justify-between">
        <h1 className="text-purple-500 text-xl">Update Page</h1>
      <button onClick={handleRedirect}>Go back to Home</button>
      </div>
      <h2>Modify a Task here</h2>
      
    </section>
  );
}
