import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../../notification/service/notification.service";
import {NotificationType} from "../../../notification/service/notification-type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  private titleSubject = new BehaviorSubject<string>('Users');
public titleAction$ = this.titleSubject.asObservable();
public users!:User[];
public refreshing : boolean = false;
private subscriptions:Subscription[] = [];


constructor(private userService:UserService, private notificationService : NotificationService) {

}

public getUsers(showNotification : boolean):void{
  this.refreshing = true;
  this.subscriptions.push(
    this.userService.getUsers().subscribe(
    (response:User[]) => {
      this.userService.addUsersToLocalCache(response);
      this.users = response;
      this.refreshing = false;
      if (showNotification) {
        this.notificationService.notify(NotificationType.success, `${response.length} User(s) Loaded Successfully`)
      }
    } ,
    (errorResponse : HttpErrorResponse) => {this.notificationService.notify(NotificationType.error, errorResponse.error.message)}
  ))



}




  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "Communication with server Failed");
    }

  }

public changeTitle(title : string){
  this.titleSubject.next(title);
}

  ngOnInit(): void {
  this.getUsers(true);
  }
}
