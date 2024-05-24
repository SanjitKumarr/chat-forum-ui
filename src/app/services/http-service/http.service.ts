import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public post(url:any, data:any, options?:any): Observable<any> {
    return this.httpClient.post<any>(url, data, options);
  }

  public get(url:any, options?:any): Observable<any> {
    return this.httpClient.get<any>(url, options);
  }

  public put(url:any, data:any, options?:any): Observable<any> {
    return this.httpClient.put<any>(url, data, options);
  }

  public delete(url:any): Observable<any> {
    return this.httpClient.delete<any>(url);
  }
}
