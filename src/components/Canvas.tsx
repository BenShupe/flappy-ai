import { useRef, useEffect } from "react";
import type { SimulationState } from "../types/SimulationState";

import Game from "../core/game";

interface Props {
  state: SimulationState,
  width?: number,
  height?: number,
  className?: string,
}

const FONT_TYPE = '25px sans-serif'
Game.initialize();
export default function Canvas({
  state,
  width = 400,
  height = 400,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) throw new Error("Canvas Context does not exist!");

    let last = performance.now();

    const loop = (t: number) => {
      const dt = calcDelta(t, last)*state.speed;
      last = t;

      renderFrame(ctx, dt, state, width, height);

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [state, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} className={className} />
}

function calcDelta(t:number, last:number) {
  return t-last;
}

function renderFrame(
  ctx: CanvasRenderingContext2D,
  dt: number,
  state: SimulationState,
  width: number,
  height: number
) {
  clearCanvas(ctx, width, height);

  
  if (state.isRunning) Game.update(dt);
  Game.render(ctx);
}

function clearCanvas(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
}

function formatSpeed(speed: number) {
  return `x${speed}`;
}