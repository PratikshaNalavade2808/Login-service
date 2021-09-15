import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {  delay,  map,  tap } from 'rxjs/operators';
import { User } from '../../Login/login.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userInfo: BehaviorSubject<any> = new BehaviorSubject([]);
  jwtHelper = new JwtHelperService();
  public currentUser = this.userInfo.asObservable();
  isUserLoggedIn: boolean = false;
  userEmail: any;
  userPassword: any;
 userList: Array<User> = []
  userObject: User =new User();

  constructor(private http: HttpClient
    ) {
    this.loadUserInfo();
    this.currentUser = this.userInfo.asObservable();
    
   }


   getEmployee():Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3001/login/").pipe(map(
      (data) => {
      return data;
      }
    ))
   }

   login(email: string, password: string){
     this.getEmployee().subscribe((res: any) => {
      res.forEach((res: any)=>{
        this.userObject.email = res.email;
        this.userObject.password = res.password;
        this.userList.push(this.userObject);
      })
     })
 
    this.isUserLoggedIn = email === this.userList[0].email && password === this.userList[0].password;
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false"); 
    return of(this.isUserLoggedIn).pipe(
    delay(1000),
    tap(val => { 
      console.log("Is User Authentication is successful: " + val); 
            })
        );
       
      }


   loadUserInfo() {
    let userdata = this.userInfo.getValue();
    if (!userdata) {
     const access_token = localStorage.getItem('access_token');
     if (access_token) {
      const decryptedUser = this.jwtHelper.decodeToken(access_token);
        const data = {
          access_token: access_token,
          refresh_token: localStorage.getItem("refresh_token"),
          username: decryptedUser.username,
          userid: decryptedUser.sub,
          tokenExpirtion: decryptedUser.exp
        };
       this.userInfo.next(data);
     }
    }
    }

    userLogin(){
      const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const refreshtoken = "dummy";

    localStorage.setItem("access_token",accesstoken);
    localStorage.setItem("refresh_token",refreshtoken);

    const decryptedUser = this.jwtHelper.decodeToken(accesstoken);
    console.log(decryptedUser);

    const data= {
      access_token: accesstoken,
      refresh_token: refreshtoken,
      username: decryptedUser.name,
      userid: decryptedUser.sub,
      tokenExpirtion: decryptedUser.iat
    }

    this.userInfo.next(data);
    }

    logout() {
      localStorage.removeItem('currentUser');
      this.userInfo.next(null);
    }

    
}
