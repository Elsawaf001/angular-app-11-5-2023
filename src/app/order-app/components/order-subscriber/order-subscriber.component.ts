import {Component, OnInit} from '@angular/core';
import {OrderSubscriber} from "../../model/order-subscriber";
import {OrderSubscriberService} from "../../service/order-subscriber.service";
import {NotificationType} from "../../../notification/service/notification-type";
import {NotificationService} from "../../../notification/service/notification.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-order-subscriber',
  templateUrl: './order-subscriber.component.html',
  styleUrls: ['./order-subscriber.component.css']
})
export class OrderSubscriberComponent implements OnInit{

subscribersDataSource : OrderSubscriber[] = [];

  private subscriptions:Subscription[] = [];



constructor(private service : OrderSubscriberService , private notificationService : NotificationService) {
}





getAllSubscribers(){
  this.subscriptions.push( this.service.getAll().subscribe({
    next: (response ) =>{
      response.forEach(subscriber => this.subscribersDataSource.push(subscriber));
      this.sendNotification(NotificationType.success,   "تم تحميل عدد " +response.length + " مشترك بنجاح")
      localStorage.setItem('orderSubscribers',JSON.stringify(response));
    } ,
    error: err => this.sendNotification( NotificationType.error, err.error.message)
  }))

}



  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "Communication with server Failed");
    }

  }

  ngOnInit(): void {
  this.getAllSubscribers()

  }
}
