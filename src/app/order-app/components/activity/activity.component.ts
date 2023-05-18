import {Component, OnInit} from '@angular/core';
import {ActivityService} from "../../service/activity.service";
import {Activity} from "../../model/activity";
import {NotificationService} from "../../../notification/service/notification.service";
import {Subscription} from "rxjs";
import {NotificationType} from "../../../notification/service/notification-type";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit{
  isReadOnly:boolean = true;
selectedActivity! : Activity;
setClear:boolean = false;

newActivityName! :string;
  newActivityAddress! :string;




  activities : Activity[]=[];

  private subscriptions : Subscription[]=[];



  constructor(private activityService:ActivityService , private notificationService : NotificationService) {

  }


  getActivities(){
    this.subscriptions.push(
      this.activityService.getAllActivities().subscribe({
        next: (response : Activity[]) =>{response.forEach(activity =>this.activities.push(activity))
        this.sendNotification(NotificationType.success, "تم تحميل الانشطة بنجاح")
        },
        error: (errorResponse) => {this.sendNotification(NotificationType.success, errorResponse.error.message)}
      })
    )
  }



  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "Communication with server Failed");
    }

  }

addNewActivity(){

}

  onEdit(){
    this.isReadOnly = false;

  }

  onSave(){
    let currentActivityName = this.selectedActivity?.activityName;
    let newName = this.newActivityName;
    let newAddress = this.newActivityAddress;
    this.activityService.updateActivity(currentActivityName , newName , newAddress).subscribe(
      {
        next : value =>{  this.selectedActivity = value ;
          this.sendNotification(NotificationType.success, "تم تعديل النشاط بنجاح")},
        error : err => {this.sendNotification(NotificationType.error,err.error.message)}
      }
    )
  }

  ngOnInit(): void  {
    this.getActivities();

  }


}
