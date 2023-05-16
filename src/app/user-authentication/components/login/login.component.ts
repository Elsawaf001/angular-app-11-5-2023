import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../notification/service/notification.service";
import {Subscription} from "rxjs";
import {User} from "../../model/user";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationType} from "../../../notification/service/notification-type";
import {HeaderType} from "../../../enums/header-type";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {
  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private notificationService: NotificationService ,private toastr:ToastrService) {
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  public onLogin(user: User): void {
    this.showLoading = true;
    console.log(user)
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          console.log("token is " + token);
          if (token != null) {
            this.authenticationService.saveToken(token);
            if (response.body != null) {
              this.authenticationService.addUserToLocalCache(response.body);
            }
            this.router.navigateByUrl('/user/management').then(() => {
              console.log('You are Logged in');
            }).catch((error) => {
              console.log('Navigation failed', error);
            });
            this.showLoading = false;
          }
        },

        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          // this.toastr.error("Communication with server Failed" , "Login Error")
          this.sendErrorNotification(NotificationType.error, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    )
  }


  ngOnInit(): void {
    // if user logged , i will navigate him to user page , if not , he will be back to login page
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/user/management').then(() => {
        console.log('You are already Logged on');
      }).catch((error) => {
        console.log('Navigation failed', error);
      });
    } else {
      this.router.navigateByUrl('/login').then(() => {
        console.log("You Need to log in")
      })
    }
  }

  private sendErrorNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "Communication with server Failed");
    }
  }
}
