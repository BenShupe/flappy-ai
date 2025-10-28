import { useRef, useEffect } from "react";
import type { SimulationState } from "../types/SimulationState";

interface Props {
  state: SimulationState,
  width?: number,
  height?: number,
  className?: string,
}

export default function Canvas({
  state,
  width = 400,
  height = 400,
  className = "",
}: Props) {
  const { isRunning, speed, showDebug } = state;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(null);
  

  const render = (ctx: CanvasRenderingContext2D, dt: number) => {
    ctx.clearRect(0, 0, width, height);

    // ctx.fillStyle="red";
    // ctx.fillRect(200, 200, 10, 10);
    
    if(showDebug) {
      ctx.fillStyle = "#fff";
      ctx.font = "16px monospace";
      ctx.fillText(`FPS: ${Math.round(10 / dt)}  `, 10, 20);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = (time - lastTime) * speed;
      lastTime = time;
      render(ctx, dt);
      frameRef.current = requestAnimationFrame(animate);
    };

    if (isRunning) frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isRunning, speed, showDebug]);

  return <canvas ref={canvasRef} width={width} height={height} className={className}/>
}