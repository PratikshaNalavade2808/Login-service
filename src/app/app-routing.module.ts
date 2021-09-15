import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDasboardComponent } from './employee-dasboard/employee-dasboard.component';
import { LoginComponent } from './Login/login.component';
import { AuthRouteGuard } from './Shared/auth.route.guard';


const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full'},
  { path:'login', component: LoginComponent, canActivate: [AuthRouteGuard]},
  { path:'register', component: EmployeeDasboardComponent, canActivate: [AuthRouteGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
