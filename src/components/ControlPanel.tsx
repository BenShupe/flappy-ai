type props = {
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
};

function ControlPanel ({isRunning, setIsRunning, speed, setSpeed}:props) {
  return (
    <div className="flex justify-evenly items-center mt-6 p-4 rounded-sm w-[600px] border-2 border-gray-400">
      <button className="text-white" onClick={()=>{setIsRunning(!isRunning)}}>
        {isRunning?"PAUSE":"PLAY"}
      </button>
      <button className="text-white" onClick={()=>{speed>1?setSpeed(1):setSpeed(1.5)}}>
        {speed>1?"SLOWDOWN":"FAST"}
      </button>
    </div>
  );
}
export default ControlPanel;