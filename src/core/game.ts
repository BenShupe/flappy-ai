import { CANVAS_WIDTH, PIPE_DISTANCE_BETWEEN } from "../global/constants";
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
        this.handleCollisions();
        this.birds.forEach(bird => {
            if(bird.alive) bird.update(dt);
        });
        this.pipes.forEach(pipe => pipe.update(dt));
        this.spawnPipes();
    }

    public static spawnPipes() {
        const LAST_PIPE_POSITION = this.getLastPipe()?.getX();
        if(!LAST_PIPE_POSITION) return
        const LAST_PIPE_DISTANCE = CANVAS_WIDTH-(LAST_PIPE_POSITION+Pipe.WIDTH);
        if(LAST_PIPE_DISTANCE >= PIPE_DISTANCE_BETWEEN) {
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
        const closestPipe = this.getClosestPipe();
        if(!closestPipe) return;

        this.birds.forEach(bird => {
            if(this.isColliding(bird, closestPipe)) bird.kill();
        })
    }

    private static isColliding(bird: Bird, pipe: Pipe): boolean {
        const birdTop = bird.y;
        const birdBottom = bird.y + bird.hitSize;
        const birdLeft = bird.x;
        const birdRight = bird.x + bird.hitSize;
    
        const pipeLeft = pipe.getX();
        const pipeRight = pipe.getX() + Pipe.WIDTH;
        const gapTop = pipe.getGapPosition();
        const gapBottom = pipe.getGapPosition() + Pipe.AIR_GAP;
    
        const overlapsHorizontally = birdRight > pipeLeft && birdLeft < pipeRight;
    
        const hitsTopPipe = birdTop < gapTop;
        const hitsBottomPipe = birdBottom > gapBottom;
    
        const overlapsVerticallyOutsideGap = hitsTopPipe || hitsBottomPipe;
    
        return overlapsHorizontally && overlapsVerticallyOutsideGap;
    }
}