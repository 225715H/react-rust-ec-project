import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    axios
      .get("/api/hello")
      .then((res) => res.data)
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error(err);
        setMessage("Failed to fetch from backend.");
      });
  }, []);

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
