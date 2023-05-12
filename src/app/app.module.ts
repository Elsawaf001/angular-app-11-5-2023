import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "./user-authentication/service/authentication.service";
import {AuthenticationGuard} from "./user-authentication/guard/authentication.guard";
import {AuthenticationInterceptor} from "./user-authentication/interceptor/authentication.interceptor";
import {UserService} from "./user-authentication/service/user.service";
import {OrderAppModule} from "./order-app/order-app.module";
import {NotificationModule} from "./notification/notification.module";
import {NotificationService} from "./notification/service/notification.service";
import {LoginComponent} from './user-authentication/components/login/login.component';
import {RegisterComponent} from './user-authentication/components/register/register.component';
import {UserComponent} from './user-authentication/components/user/user.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ActivityComponent} from './order-app/components/activity/activity.component';
import {IndustrialOrderComponent} from './order-app/components/industrial-order/industrial-order.component';
import {LicenceAreaComponent} from './order-app/components/licence-area/licence-area.component';
import {OrderSubscriberComponent} from './order-app/components/order-subscriber/order-subscriber.component';
import {RealStateOrderComponent} from './order-app/components/real-state-order/real-state-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ActivityComponent,
    IndustrialOrderComponent,
    LicenceAreaComponent,
    OrderSubscriberComponent,
    RealStateOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    OrderAppModule,
    NotificationModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService, AuthenticationGuard, UserService, NotificationService, {
    provide: HTTP_INTERCEPTORS
    , useClass: AuthenticationInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
