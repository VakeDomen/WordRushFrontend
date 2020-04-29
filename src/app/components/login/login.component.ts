import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketHandlerService } from 'src/app/services/socket-handler.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name: string;

  constructor(
    private toastr: ToastrService,
    private sh: SocketHandlerService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.logoutSilent();
  }
  

  login(): void {
    if (!this.name) {
      this.toastr.error("Choose a name!");
    } else {
      this.sh.login(this.name);
    }
  }

}
