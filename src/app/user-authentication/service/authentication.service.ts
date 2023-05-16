import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host: string = environment.apiUrl;
  private token: string = '';
  private loggedInUsername: string = '';
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/user/login`, user,
      {observe: "response"});
  }


  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/register`, user);
  }

  public logout(): void {
    this.token = '';
    this.loggedInUsername = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('users')
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user : User): void {
    localStorage.setItem('user' , JSON.stringify(user));
  }

  public getUserFromLocalCache() : User {

    return JSON.parse(localStorage.getItem('user') ? 'user' : '') ;
  }

  public loadToken() :void {
    const tk = localStorage.getItem('token');
    if (tk != null) {
      this.token = tk;
    }
  }

  public getToken() :string | null | undefined {
    return this.token;
  }

  public isLoggedIn() : boolean{
    this.loadToken();
    if (this.token != null && this.token != "") {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub ;
          return true ;



        }   else{ this.logout();
          return false;}


      } else { this.logout();
        return false;}


    } else {
      this.logout();
      return false;
    }
  }
}
