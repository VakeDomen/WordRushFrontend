import { ElementRef } from '@angular/core';
import { Game } from '../models/game';
import { Player } from '../models/player';

export class VersusGame {

    private players: Player[];

    constructor(
        private canvas: ElementRef,
        private ctx: CanvasRenderingContext2D,
        private game: Game,
    ){
        this.initGame();
    }

    initGame(): void {
        this.initGameObjects();
        this.initCanvas();
        this.ctx.fill();
    }

    initGameObjects(): void {
        this.players = [];
        for (let i = 0 ; i < this.game.players.length ; i++) {
            this.players.push(new Player(this.game.players[i], i, this.game.players.length));
        }
    }

    initCanvas(): void {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        console.log(this.ctx.canvas.height, this.ctx.canvas.width);
        this.ctx.fillRect(0, 0, this.canvas.nativeElement.offsetHeight, this.canvas.nativeElement.offsetWidth);
        this.drawPlayers();
    }

    drawPlayers(): void {
        for (const player of this.players) {
            player.draw(
                this.ctx, 
                this.canvas.nativeElement.offsetHeight, 
                this.canvas.nativeElement.offsetWidth,
            );
        }
    }
}