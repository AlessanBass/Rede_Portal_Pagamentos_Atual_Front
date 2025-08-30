import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private readonly AuthService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.AuthService.getToken();
    const claims = this.AuthService.getClaims();

    if (token && !this.tokenExpirado(token)) {

      // lista de roles que a rota aceita
      const allowedRoles = route.data['roles'] as Array<string>;

      // verifica se o usuário tem algum role pedido na rota
      const autorizado = allowedRoles.some(role => claims.includes(role));

      if (autorizado) {
        return true;
      }
    }

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