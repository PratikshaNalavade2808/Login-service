import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuard implements CanActivate {

  constructor( private authService: AuthService,
    private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | 
    Promise<boolean | UrlTree> | boolean | UrlTree {    
    const userData = this.authService.userInfo.getValue();

     if(userData && userData.userid) {

      if(state.url.indexOf("/login") > -1) {
          this.route.navigate(["/register"]);
          return false;
      }
    }else {
      if(state.url.indexOf("/register") > -1) {    
          this.route.navigate(['/login']);
        
        return false;
    }
    }
    return true;
  }
  
}
