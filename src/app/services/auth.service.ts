import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private name: string;

  constructor() { }

  login(name): void {
    this.name = name;
  }

  logout(): void {
    this.name = undefined;
  }

  isLoggedIn(): boolean {
    return !!name;
  }


}
