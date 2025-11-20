import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import JumbleWordGame from "./components/JumbleWordGame";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <JumbleWordGame />
    </>
  );
}

export default App;
