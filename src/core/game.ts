import { CANVAS_WIDTH, PIPE_DISTANCE } from "../global/contants";
import Bird from "./bird";
import Pipe from "./pipe";

export default class Game {

    static birds:Bird[] = [new Bird()];
    static pipes:Pipe[] = [new Pipe({x:CANVAS_WIDTH})];

    public static render(ctx:CanvasRenderingContext2D) {
        this.birds.forEach(bird => bird.alive ? bird.render(ctx) : null);
        this.pipes.forEach(pipe => pipe.render(ctx));
    }


    public static initialize() {
        document.addEventListener('keydown', e=>{
            if(e.key !== " ") return;
            this.birds[0].flap();
        })
    }

    public static update(dt:number) {
        this.birds.forEach(bird => {
            if(!bird.alive) return;
            bird.update(dt);
        });
        this.pipes.forEach(pipe => pipe.update(dt));
        this.spawnPipes();
    }

    public static spawnPipes() {
        const LAST_PIPE_POSITION = this.getLastPipe()?.getX();
        if(!LAST_PIPE_POSITION) return
        const LAST_PIPE_DISTANCE = CANVAS_WIDTH-(LAST_PIPE_POSITION+Pipe.WIDTH);
        // console.log(LAST_PIPE_POSITION);
        if(LAST_PIPE_DISTANCE >= PIPE_DISTANCE) {
            this.pipes.push(new Pipe({x:CANVAS_WIDTH}))
        };
    }

    private static getLastPipe():Pipe | undefined {
        return this.pipes[this.pipes.length-1];
    }

    private static getClosestPipe():Pipe | undefined {
        return this.pipes.find(p => p.getX() + Pipe.WIDTH > Bird.DEFAULT_X_POSITION);
    }

    private static handleCollisions() {

    }

    private static  () {

    }
}