import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activity} from "../model/activity";
import {CustomHttpResponse} from "../../user-authentication/model/custom-http-response";
import {User} from "../../user-authentication/model/user";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {


  private host: string = `${environment.apiUrl}/app`;

  constructor(private http : HttpClient) { }

  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.host}/activities`);
  }


  getActivityById(id: number): Observable<Activity> {
    // const data = new FormData();
    // data.append("id",id.toString())
    return this.http.get<Activity>(`${this.host}/activity/${id}`);
  }


  public createActivity(activity : Activity):Observable<Activity>{
    return this.http.post<Activity>(`${this.host}/createActivity` , activity);
  }

  public updateActivity(currentActivityName : string ,newName : string, address:string):Observable<Activity>{
    const formData = new FormData();
    formData.append("currentActivityName",currentActivityName);
    formData.append("newName" , newName)
    formData.append("newAddress" ,address);
    return this.http.post<Activity>(`${this.host}/updateActivity` , formData);
  }


  public deleteActivity(activityName : string) : Observable<CustomHttpResponse>{

    return this.http.delete<CustomHttpResponse>(`${this.host}/deleteActivity/${activityName}`);
  }

  public addActivityToLocalCache(activities:Activity[]){
    localStorage.setItem('activities',JSON.stringify(activities))
  }


  public getActivitiesToLocalCache():(Activity[] | null){

    if (localStorage.getItem('activities')){
      return JSON.parse(localStorage.getItem('activities') ?? '');
    }
    return null;
  }

}
