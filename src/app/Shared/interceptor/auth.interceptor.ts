import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from '../auth-service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService : AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        var userData = this.authService.userInfo.getValue();
        
        if(userData && userData.userid) {
            const newReq = req.clone({
                headers: req.headers.set("Authorization",`bearer ${userData.access_token}`)
            });
            return next.handle(newReq);
        }
        return next.handle(req);
    }

}