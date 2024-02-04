import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;

  constructor() { 
    this.isLoggedIn = false;
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'Admin123') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  isSignIn(): boolean {
    return this.isLoggedIn;
  }
}
