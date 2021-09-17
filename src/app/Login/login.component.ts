import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Shared/auth-service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { User } from '../Shared/model/login.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../Shared/api-service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formValue : FormGroup;
  loginData = {
    email: '',
    password: ''
  };
  data:any = []
  userModelObject: User = new User();
  successfulMessage:string = "Successfully Added the employee";
 

  constructor(
    private authService: AuthService,
    private route: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formValue = new FormGroup({
     email: new FormControl("",[Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    })  
     }  
  

  onClickSubmit(data: any) {
    this.userModelObject.email = data.email;
    this.userModelObject.password  = data.password;

    this.authService.login(this.userModelObject.email, this.userModelObject.password )
       .subscribe( data => {  
         if(data) {
          this.authService.userLogin();
          this._snackBar.open(this.successfulMessage);
          this.route.navigate(['/register']); 
         } else {
          alert("user failed...Invalid Ceditenials");
          this.formValue.reset();
        }         
    });
 }
 
}
