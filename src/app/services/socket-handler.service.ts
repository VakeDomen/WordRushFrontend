import { Injectable, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class SocketHandlerService implements OnInit {

  constructor(
    private ws: WebSocketService,
    private auth: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
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
    } else {
      this.toastr.error('Failed', 'Name might be taken!');
    }
  }

  // ------------------ lobby ------------------
  initLobby(): void {
  }


  // ------------------ game ------------------
  initGame(): void {
  }
}
