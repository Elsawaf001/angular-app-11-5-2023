import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../user-authentication/components/login/login.component";
import {RegisterComponent} from "../user-authentication/components/register/register.component";
import {UserComponent} from "../user-authentication/components/user/user.component";
import {ActivityComponent} from "../order-app/components/activity/activity.component";
import {IndustrialOrderComponent} from "../order-app/components/industrial-order/industrial-order.component";
import {LicenceAreaComponent} from "../order-app/components/licence-area/licence-area.component";
import {OrderSubscriberComponent} from "../order-app/components/order-subscriber/order-subscriber.component";


const routes: Routes = [
  {path: "login", component: LoginComponent} ,
  {path: "register", component: RegisterComponent} ,
  {path: "user/management", component: UserComponent} ,
  {path: "activity" , component:ActivityComponent} ,
  {path: "order" , component:IndustrialOrderComponent} ,
  {path: "licence" , component : LicenceAreaComponent} ,
  {path: "subscriber" , component :OrderSubscriberComponent},
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
