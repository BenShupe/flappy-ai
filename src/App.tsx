import { useState } from "react";
import Canvas from "./components/Canvas"
import ControlPanel from "./components/ControlPanel"

function App() {

  const [isRunning, setIsRunning] = useState(true);
  const [speed, setSpeed] = useState(1);

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col justify-center items-center p-6">
      <Canvas
        isRunning={isRunning}
        speed={speed}
        width={600}
        height={600}
        className={isRunning?"border-2 rounded-lg border-blue-400":"border-2 rounded-lg border-red-400"}
      />
      <ControlPanel
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        speed={speed}
        setSpeed={setSpeed}
      />
    </div>
  )
}


export default App;