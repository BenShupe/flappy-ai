import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../global/contants"

interface Config {
  x : number,
  gap_position?:number,
}

export default class Pipe {
  public static readonly AIR_GAP = 1/3*CANVAS_WIDTH;
  public static readonly WIDTH = 70;
  public static PIPE_SPEED_PX_PER_MS = -0.125;

  private x:number;
  private gapPosition:number;

  constructor({x: x, gap_position}:Config) {
    this.x = x;
    this.gapPosition = gap_position ?? randomGap();
  }

  render(ctx: CanvasRenderingContext2D): void {
    const TOP_PART_POSITION = 0;
    const TOP_PART_HEIGHT = this.gapPosition;
    const BOTTOM_PART_POSITION = this.gapPosition + Pipe.AIR_GAP;
    const BOTTOM_PART_HEIGHT = CANVAS_HEIGHT - BOTTOM_PART_POSITION;
  
    const createGradient = (y: number, height: number) => {
      const gradient = ctx.createLinearGradient(this.x, y, this.x + Pipe.WIDTH, y);
      gradient.addColorStop(0, "#3F3F46"); // left highlight
      gradient.addColorStop(0.5, "#2B2B30"); // base
      gradient.addColorStop(0.75, "#1E1E22"); // right shadow
      return gradient;
    };
  
    // Top pipe
    ctx.fillStyle = createGradient(TOP_PART_POSITION, TOP_PART_HEIGHT);
    ctx.fillRect(this.x, TOP_PART_POSITION, Pipe.WIDTH, TOP_PART_HEIGHT);
  
    // Bottom pipe
    ctx.fillStyle = createGradient(BOTTOM_PART_POSITION, BOTTOM_PART_HEIGHT);
    ctx.fillRect(this.x, BOTTOM_PART_POSITION, Pipe.WIDTH, BOTTOM_PART_HEIGHT);
  
    // Outline
    // ctx.strokeStyle = "#000000";
    // ctx.lineWidth = 1;
    // ctx.strokeRect(this.x, TOP_PART_POSITION, Pipe.WIDTH, TOP_PART_HEIGHT);
    // ctx.strokeRect(this.x, BOTTOM_PART_POSITION, Pipe.WIDTH, BOTTOM_PART_HEIGHT);
  }
  
  

  update(dt:number) {
    this.x += Pipe.PIPE_SPEED_PX_PER_MS*dt;
  }

  isOffscreen() {
    return this.x >= CANVAS_WIDTH;
  }

  getX() {
    return this.x;
  }
}

function randomGap():number {
  const LOWER_LIMIT = 50;
  const UPPER_LIMIT = CANVAS_HEIGHT-Pipe.AIR_GAP-50;
  return Math.floor(Math.random()*(UPPER_LIMIT-LOWER_LIMIT)+LOWER_LIMIT);
}