import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LicenceArea} from "../model/licence-area";
import {Observable} from "rxjs";
import {CustomHttpResponse} from "../../user-authentication/model/custom-http-response";

@Injectable({
  providedIn: 'root'
})
export class LicenceAreaService {

  private  host : string = `${environment.apiUrl}/app`;
  constructor(private http : HttpClient) { }

  public getAll() : Observable<LicenceArea[]>{
    return this.http.get<LicenceArea[]>(`${this.host}/licences`)
  }

  public addLicenceArea(name : string) : Observable<LicenceArea>{
    const formData = new FormData();
    formData.append("name" , name);
    return this.http.post<LicenceArea>(`${this.host}/licence` , formData);
  }

  public findLicenceArea(name:string):Observable<LicenceArea>{
    return this.http.get<LicenceArea>(`${this.host}/findLicence/${name}`);
  }

  public deleteLicenceArea(name : string):Observable<CustomHttpResponse>{
    return this.http.delete<CustomHttpResponse>(`${this.host}/${name}`);
  }
}
