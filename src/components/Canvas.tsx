import { useRef, useEffect } from "react";

interface props {
  isRunning: boolean;
  speed: number;
  width?: number;
  height?: number;
  className: string;
}

function Canvas({isRunning, speed, width=400, height=400, className}:props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const render = (ctx:CanvasRenderingContext2D, dt:number) => {
    ctx.clearRect(0, 0, width, height);

  }

  useEffect(()=>{
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();

    const animate = (time:number) => {
      const dt = (time - lastTime);
      lastTime = time;
      render(ctx, dt);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

  }, [isRunning, speed]);

  return <canvas ref={canvasRef} width={width} height={height} className={className}></canvas>
}

export default Canvas;