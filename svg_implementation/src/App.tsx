import { useEffect, useState } from "react";
import { APITester } from "./APITester";
import { DiscIcon } from "./components/svg/svgDisc";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {

  const [cy, setCy] = useState(0);
  
  useEffect(()=>{
    setInterval(()=>setCy(curr => (curr + 0.30) % 150), 40);
  }, [])

  return (
    <div className="app">
      <div className="logo-container">
        <img src={logo} alt="Bun Logo" className="logo bun-logo" />
        <img src={reactLogo} alt="React Logo" className="logo react-logo" />
      </div>

      <div>
        <DiscIcon fill="red" cy={cy - 20} />
      </div>

      <h1>Bun + React</h1>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <APITester />
    </div>
  );
}

export default App;
