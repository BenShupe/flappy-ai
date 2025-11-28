import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../components/Canvas"

interface Config {
  start_x : number,
  gap_position?:number,
}

export default class Pipe {
  public static readonly AIR_GAP = 1/3*CANVAS_WIDTH;
  public static readonly WIDTH = 50;

  private x:number;
  private gapPosition:number;

  constructor({start_x, gap_position}:Config) {
    this.x = start_x;
    this.gapPosition = gap_position ?? randomGap();
  }

  render(ctx:CanvasRenderingContext2D):void {
    ctx.fillStyle = "red";
    const TOP_PART_POSITION = 0;
    const TOP_PART_HEIGHT = this.gapPosition;
    const BOTTOM_PART_POSITION = this.gapPosition + Pipe.AIR_GAP;
    const BOTTOM_PART_HEIGHT = CANVAS_HEIGHT-BOTTOM_PART_POSITION;
    ctx.fillRect(this.x, TOP_PART_POSITION, Pipe.WIDTH, TOP_PART_HEIGHT);
    ctx.fillRect(this.x, BOTTOM_PART_POSITION, Pipe.WIDTH, BOTTOM_PART_HEIGHT);
  }
}

function randomGap():number {
  const LOWER_LIMIT = 50;
  const UPPER_LIMIT = 50;
  return Math.floor(Math.random()*(UPPER_LIMIT-LOWER_LIMIT)+LOWER_LIMIT);
}