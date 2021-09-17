import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import {  delay,  map,  tap } from 'rxjs/operators';
import { User } from '../model/login.model';
import { baseUrl,accesstoken,refreshtoken } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userInfo: BehaviorSubject<any> = new BehaviorSubject([]);
  jwtHelper = new JwtHelperService();
  public currentUser = this.userInfo.asObservable();
  isUserLoggedIn: boolean = false;
  userList: Array<User> = [];
  userObject: User = new User();

  constructor(private http: HttpClient
    ) {
    this.loadUserInfo();
    this.currentUser = this.userInfo.asObservable();    
   }


   getEmployee():Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}`).pipe(map(
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
