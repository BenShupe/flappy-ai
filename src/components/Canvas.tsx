import { useRef, useEffect } from "react";
import type { SimulationState } from "../types/SimulationState";
import Bird from "../core/bird";

interface Props {
  state: SimulationState,
  width?: number,
  height?: number,
  className?: string,
}

const FONT_TYPE = '25px sans-serif'
const bird = new Bird();
addEventListener("keydown", e=>{
  if(e.key!==" ")return;
    e.preventDefault();
    bird.flap();
});

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
      const dt = calcDelta(t, last);
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

  drawSpeed(ctx, state.speed, { x: width - 40, y: 30 });
  if (state.showDebug) drawDebug(ctx, dt, { x: 10, y: 20 });

  if(state.isRunning) bird.update(dt);
  bird.render(ctx);
}

function clearCanvas(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
}

function drawText(
  ctx: CanvasRenderingContext2D,
  opt: {
    text: string,
    x: number,
    y: number,
    font?:string,
    color?:string
  }
) {
  let {text, x, y, font = FONT_TYPE, color = "white"} = opt;
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
}

function drawSpeed(ctx: CanvasRenderingContext2D, speed: number, pos: { x:number; y:number }) {
  drawText(ctx, {
    text:formatSpeed(speed),
    ...pos
  });
}

function drawDebug(ctx: CanvasRenderingContext2D, dt: number, pos: { x:number, y:number }){
  drawText(ctx, {
    text:formatFps(dt),
    ...pos
  });
} 

function formatSpeed(speed: number) {
  return `x${speed}`;
}

function formatFps(dt: number) {
  let frames_per_second: number = 1000 / dt;
  return `FPS: ${Math.round(frames_per_second)}`;
}