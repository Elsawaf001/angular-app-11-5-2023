import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {CustomHttpResponse} from "../model/custom-http-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host : string = environment.apiUrl;

  constructor(private http : HttpClient) { }

  public getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public adduser(formData :FormData ):Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/add` , formData);
  }

  public updateUser(formData :FormData ):Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/update` , formData);
  }

  public resetPassword(email : string):Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetPassword/${email}`);
  }

  public updateProfileImage(formData:FormData) : Observable<HttpEvent<User> | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/updateProfileImage` , formData , {
      reportProgress: true ,
      observe : "events"
    });
  }

  public deleteUser(userId : number) : Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`);

  }

  public addUsersToLocalCache(users : User[]):void {
    localStorage.setItem('users',JSON.stringify(users));
  }

  public getUsersToLocalCache():(User[] | null){

    if (localStorage.getItem('users')){
      return JSON.parse(localStorage.getItem('users') ?? '');
    }
    return null;
  }

  public createUserFormData(loggedInUser : string , user : User , profileImage : File) : FormData {
    const formData  = new FormData();
    formData.append("currentUsername" , loggedInUser);
    formData.append("newFirstName" , user.firstName);
    formData.append("newLastName" , user.lastName);
    formData.append("newUserName" , user.userName);
    formData.append("newEmail" , user.email);
    formData.append("role" , user.role);
    formData.append("isActive" , JSON.stringify(user.isActive));
    formData.append("isNotLocked" , JSON.stringify(user.isNotLocked));
    formData.append("profileImage" , profileImage);
    return formData;
  }

}
