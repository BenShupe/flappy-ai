import NeuralNetwork from "./NeuralNetwork"

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
    this.x= x || 200;
    this.y= y || 200;
    this.velocity= velocity || 0;
    this.brain = brain || new NeuralNetwork(1, 1, 1);
    this.fitness = fitness || 0;
    this.alive = alive || true;
    this.hitSize = hitSize || 50;
  }

  render(ctx:CanvasRenderingContext2D) {
    this.drawHitbox(ctx)
  }

  drawHitbox(ctx:CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.hitSize, this.hitSize);
  }

  flap(strength:number = 1) {
    this.velocity = -strength;
  }

  update(dt:number) {
    const gravity = 1;
    // eulers method
    this.velocity += gravity*dt;
    this.y = this.y + this.velocity*dt;
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