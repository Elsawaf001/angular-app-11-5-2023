import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../user-authentication/login/login.component";
import {RegisterComponent} from "../user-authentication/register/register.component";
import {UserComponent} from "../user-authentication/user/user.component";


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "user/management", component: UserComponent},
  {path: "", redirectTo: "/login", pathMatch: "full"}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
