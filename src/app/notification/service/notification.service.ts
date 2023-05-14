import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NotificationType} from "./notification-type";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: ToastrService) {
  }

  public notify(type: NotificationType, message: string) {
    if (type == NotificationType.error){
      this.notifier.error(message);
    }
   else if (type == NotificationType.success){  this.notifier.success(message);}
    else if (type == NotificationType.warning){    this.notifier.warning(message);}
      else if (type == NotificationType.info){this.notifier.info(message);}
      else { this.notifier.info(message);}


    }

  }



