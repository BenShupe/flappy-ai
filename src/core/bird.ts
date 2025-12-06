import NeuralNetwork from "./NeuralNetwork"
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRAVITY_PX_PER_MS_SQUARED } from "../global/contants";

interface Config{
  x?: number;
  y?: number;
  velocity?: number;
  brain?: NeuralNetwork;
  fitness?: number;
  alive?: boolean;
  hitSize?: number
};

export default class Bird {

  x: number;
  y: number;
  velocity: number;
  brain: NeuralNetwork;
  fitness: number;
  alive: boolean;
  hitSize: number;

  public static readonly DEFAULT_HIT_SIZE = 50;
  public static readonly DEFAULT_X_POSITION = CANVAS_WIDTH/3;

  constructor({x, y, velocity, brain, fitness, alive, hitSize}:Config = {}) {
    this.x= x ?? 200;
    this.y= y ?? 200;
    this.velocity= velocity ?? 0;
    this.brain = brain ?? NeuralNetwork.empty;

    this.fitness = fitness ?? 0;
    this.alive = alive ?? true;
    this.hitSize = hitSize ?? Bird.DEFAULT_HIT_SIZE;
  }

  render(ctx:CanvasRenderingContext2D) {
    this.drawHitbox(ctx);
  }

  drawHitbox(ctx:CanvasRenderingContext2D) {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.hitSize, this.hitSize);
  }

  flap(strength:number = 0.45) {
    this.velocity = -strength;
  }

  update(dt:number) {
    // eulers method
    this.velocity += GRAVITY_PX_PER_MS_SQUARED*dt;//px/ms
    this.y = this.y + this.velocity*dt;//px
    if(!this.isInBounds) this.alive = false;
    else this.stay_in_bounds();
  }

  stay_in_bounds():void {
    if(this.isInBounds()) return;
    
    this.velocity = 0;
    if(this.y < 0) this.y = 0;
    if(this.y > CANVAS_HEIGHT-this.hitSize) this.y = CANVAS_HEIGHT-this.hitSize;
  }

  isInBounds():boolean {
    return this.y >= 0 && this.y+this.hitSize <= CANVAS_HEIGHT;
  }

  clone() {
    return new Bird({
      x: this.x,
      y: this.y,
      velocity: this.velocity,
      brain: this.brain.copy(),
      fitness: this.fitness,
      alive:this.alive,
    });
  }
}