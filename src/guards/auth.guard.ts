import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('tokenPortal');

    if (token && !this.tokenExpirado(token)) {
      console.log("sucesso dashboarad");
      return true;
    }
      console.log("erro dashboarad");

    this.router.navigate(['/']);
    return false;
  }

  private tokenExpirado(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      const now = Math.floor(new Date().getTime() / 1000);
      return now >= exp;
    } catch (e) {
      return true;
    }
  }
}