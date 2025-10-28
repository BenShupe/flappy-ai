import { useState } from "react";
import Canvas from "./components/Canvas";
import ControlPanel from "./components/ControlPanel";
import type { SimulationState } from "./types/SimulationState";

function App() {
  const [simState, setSimState] = useState<SimulationState>({
    isRunning: true,
    speed: 0.01,
    showDebug: false,
  });

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col justify-center items-center p-6">
      <Canvas
        state={simState}
        width={600}
        height={600}
        className={
          simState.isRunning
            ? "border-2 rounded-lg border-blue-400"
            : "border-2 rounded-lg border-red-400"
        }
      />
      <ControlPanel state={simState} setState={setSimState} />
    </div>
  );
}

export default App;