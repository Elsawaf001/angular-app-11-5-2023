import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../notification/service/notification.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../model/user";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {HeaderType} from "../../../enums/header-type";
import {NotificationType} from "../../../notification/service/notification-type";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit , OnDestroy{
  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private notificationService: NotificationService ,private toastr:ToastrService) {
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  public onRegister(user: User): void {
    this.showLoading = true;
    console.log(user)
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (response: User) => {

            this.showLoading = false;
          this.sendNotification(NotificationType.success, ` Account By Username ${response.userName} Created Successfully , Password Has Been Sent To ${response.email}`);
          this.router.navigateByUrl('/user/management').then(() => {
            console.log('You are Logged in');
          }).catch((error) => {
            console.log('Navigation failed', error);
          });
        },

        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          // this.toastr.error("Communication with server Failed" , "Login Error")
          this.sendNotification(NotificationType.error, errorResponse.error.message);
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
    }
  }

  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "Communication with server Failed");
    }
}}

