import ToggleButton from "./ToggleButton"
import type { SimulationState } from "../types/SimulationState";

interface props {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
};

const FAST_SPEED = 0.0015;
const SLOW_SPEED = 0.001;

export default function ControlPanel ({state, setState}:props) {
  return (
    <div className="flex justify-evenly items-center mt-6 p-4 w-[600px] flex-wrap">
      <ToggleButton className="text-white"
        onClick={()=>{
          update("isRunning", !state.isRunning, setState);
        }}
        inactive="Pause"
        active="Play"
      />
      <ToggleButton className="text-white"
        onClick={()=>{
          update("speed", state.speed >= FAST_SPEED ? SLOW_SPEED : FAST_SPEED, setState);
        }}
        inactive="Fast"
        active="Slow"
      />
      <ToggleButton className="text-white"
        onClick={()=>{
          update("showDebug", !state.showDebug, setState);
        }}
        inactive="Show Debug"
        active="Hide Debug"
      />
    </div>
  );
}

function update<K extends keyof SimulationState>(
  key:K,
  value:SimulationState[K],
  setState:React.Dispatch<React.SetStateAction<SimulationState>>
) {
  setState(prev => ({ ...prev, [key]: value }));
}

