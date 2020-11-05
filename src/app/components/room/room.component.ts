import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocketHandlerService } from 'src/app/services/socket-handler.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  game: Game;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private ws: SocketHandlerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const context = this;
    this.ws.getRoom(this.route.snapshot.paramMap.get('id'), context);
    
  }

  setRoom(room: Game): void {
    this.game = room;
  }

  isHost(): boolean {
    return (this.game && this.game.host === this.auth.getName());
  }

  isMember(): boolean {
    return (this.game && this.game.players.includes(this.auth.getName()));
  }

  leaveRoom(): void {
    this.ws.leaveRoom(this.route.snapshot.paramMap.get('id'));
  }

  joinRoom(): void {
    this.ws.joinRoom(this.route.snapshot.paramMap.get('id'));
  }

  startGame(): void {
    this.ws.startGame(this.game.id);
  }

  handleStartGame(game: Game): void {
    this.router.navigate(['/game', game.id]);    
  }
}
