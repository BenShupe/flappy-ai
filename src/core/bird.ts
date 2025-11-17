import NeuralNetwork from "./NeuralNetwork"
import { GRAVITY_PX_PER_MILLISECOND } from "./game";

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

  constructor({x, y, velocity, brain, fitness, alive, hitSize}:Config = {}) {
    this.x= x ?? 200;
    this.y= y ?? 200;
    this.velocity= velocity ?? 0;
    this.brain = brain ?? new NeuralNetwork(1, 1, 1);

    this.fitness = fitness ?? 0;
    this.alive = alive ?? true;
    this.hitSize = hitSize ?? 50;
  }

  render(ctx:CanvasRenderingContext2D) {
    this.drawHitbox(ctx);
  }

  drawHitbox(ctx:CanvasRenderingContext2D) {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.hitSize, this.hitSize);
  }

  flap(strength:number = 0.55) {
    this.velocity = -strength;
  }

  update(dt:number) {
    // eulers method
    this.velocity += GRAVITY_PX_PER_MILLISECOND*dt;//px/ms
    this.y = this.y + this.velocity*dt;//px
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