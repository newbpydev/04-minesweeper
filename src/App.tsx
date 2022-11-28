import { useState } from "react";
import { Legend } from "./components/Legend";

// import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Legend />
    </div>
  );
}

export default App;
