import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:8080/users"

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
})

  constructor(private httpClient: HttpClient) {}

  public register(formLogin: any): Observable<any> {
    const httpOptions: any = { headers: this.headers };

    return this.httpClient
      .post(this.url,JSON.stringify(formLogin), httpOptions);
  }

  public listAll() {
    const httpHeaders: any = { headers: this.headers };

    return this.httpClient.get( this.url, httpHeaders );
  }
}
