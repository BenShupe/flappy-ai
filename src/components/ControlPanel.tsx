import ToggleButton from "./ToggleButton"
import type { SimulationState } from "../types/SimulationState";

interface props {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
};

const FAST_SPEED = 5;
const NORMAL_SPEED = 1;
// const SLOW_SPEED = 0.5;

export default function ControlPanel ({state, setState}:props) {

  return (
    <div className="flex justify-evenly items-center mt-6 p-4 w-[600px] flex-wrap">
      <ToggleButton className=""
        onClick={()=>{
          update("isRunning", !state.isRunning, setState);
        }}
        inactive="Pause"
        active="Play"
      />
      <ToggleButton className= ""
        onClick={(isActive)=>{
          update("speed", isActive ? FAST_SPEED : NORMAL_SPEED, setState);
        }}
        inactive="Fast OFF"
        active="Fast ON"
      />
      <ToggleButton className= ""
        onClick={()=>{
          update("showDebug", !state.showDebug, setState);
        }}
        inactive="Debug OFF"
        active="Debug ON"
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

