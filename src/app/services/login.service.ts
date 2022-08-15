import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private url = `${process.env.BACK_URL}/login`
  private url = "http://localhost:8080/auth"

  constructor(private httpClient: HttpClient) { }

  public login(formLogin: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      })
    };

    console.log("formLogin: ", formLogin);

    return this.httpClient
      .post(this.url,JSON.stringify(formLogin), httpOptions)
  }
}
