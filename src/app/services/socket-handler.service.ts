import { Injectable, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Game } from '../models/game';


@Injectable({
  providedIn: 'root'
})
export class SocketHandlerService {

  constructor(
    private ws: WebSocketService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { 
    this.init();
  }


  init(): void {
    this.initAuth();
    this.initLobby();
    this.initGame();
  }

  // ------------------ auth ------------------

  initAuth(): void {
    this.ws.listen('LOGIN').subscribe(resp => this.loginHandle(resp));
  }

  login(name): void {
    this.ws.emit('LOGIN', name);
  }
  loginHandle(resp: any): void {
    if (resp.success === true) {
      this.auth.login(resp.name);
      this.toastr.success('Success', 'Logged as ' + name + '!');
      this.router.navigate(['/lobby']);
    } else {
      this.toastr.error('Failed', 'Name might be taken!');
    }
  }

  // ------------------ lobby ------------------
  initLobby(): void {
    this.ws.listen('LOBBY_GAMES').subscribe((resp: Game[]) => this.handleGames(resp));
    this.ws.listen('LOBBY_GAME').subscribe((resp: Game) => this.setRoom(resp));
    this.ws.listen('LOBBY_JOIN_GAME').subscribe((resp: Game) => this.setRoom(resp));
  }

  private gamesContext;
  getGames(context: any): void {
    this.gamesContext = context;
    this.ws.emit('LOBBY_GAMES', null);
  }
  handleGames(games: Game[]): void {
    this.gamesContext.handleGames(games);
  }
  hostGame(): void {
    this.ws.emit('LOBBY_HOST_GAME', null);
  }
  private roomContext;
  getRoom(id: string, context: any): void {
    console.log(id);
    this.roomContext = context;
    this.ws.emit('LOBBY_GAME', id);
  }
  setRoom(game: Game): void {
    this.roomContext.setRoom(game);
  }
  joinRoom(id: string): void {
    this.ws.emit('LOBBY_JOIN_GAME', id);
  }
  

  // ------------------ game ------------------
  initGame(): void {
  }
}
