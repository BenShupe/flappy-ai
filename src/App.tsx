import { useEffect, useState } from "react";
import Canvas from "./components/Canvas";
import ControlPanel from "./components/ControlPanel";
import type { SimulationState } from "./types/SimulationState";
import { CANVAS_HEIGHT, CANVAS_WIDTH, SET_CANVAS_HEIGHT, SET_CANVAS_WIDTH } from "./global/contants";

function App() {
  const [simState, setSimState] = useState<SimulationState>({
    isRunning: true,
    speed: 1,
    showDebug: false,
  });

  const [canvasSize, setCanvasSize] = useState({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  });

  useEffect(() => {

    const size = Math.min(window.innerWidth - 200, window.innerHeight - 200);

    SET_CANVAS_HEIGHT(size);
    SET_CANVAS_WIDTH(size);

    setCanvasSize({
      width: size,
      height: size,
    });
  }, []);

  return (
    <div className="min-h-screen  bg-gray-100 dark:bg-neutral-950 polka bg-repeat
    flex flex-col justify-center items-center p-6 font-semibold font-sans dark:text-white not-dark:text-black">
      <Canvas
        state={simState}
        width={canvasSize.width}
        height={canvasSize.height}
        className={`
          not-dark:bg-neutral-100 shadow-md hover:shadow-lg dark:bg-neutral-800 rounded-xl
          ${simState.isRunning ? "border-blue-400" : "border-red-400"}
        `}
      />
      <ControlPanel state={simState} setState={setSimState} />
    </div>
  );
}

export default App;