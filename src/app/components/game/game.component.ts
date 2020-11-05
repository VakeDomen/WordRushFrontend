import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocketHandlerService } from 'src/app/services/socket-handler.service';
import { Game } from 'src/app/models/game';
import { VersusGame } from '../../gameModes/versusGame';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  [x: string]: any;

  game: Game;
  @ViewChild('canvas') canvas: ElementRef;
  public canvasContext: CanvasRenderingContext2D;


  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private ws: SocketHandlerService,
  ) { }

  ngOnInit(): void {
    const context = this;
    this.ws.getRoom(this.route.snapshot.paramMap.get('id'), context);
  }

  setRoom(room: Game): void {
    this.game = room;
    this.bootstrapGame();
  }

  bootstrapGame(): void {
    this.canvasContext = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    switch (this.game.mode) {
      case 'VERSUS':
        new VersusGame(this.canvas, this.canvasContext, this.game);
        break;
    
      default:
        new VersusGame(this.canvas, this.canvasContext, this.game);
        break;
    }
  }
}
