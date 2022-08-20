import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static URL: string = "http://localhost:8080/users";

  constructor(private httpClient: HttpClient) {}

  public register(payload: any): Observable<any> {
    return this.httpClient.post(UserService.URL, JSON.stringify(payload));
  }

  public list(params: string = "") {
    return this.httpClient.get(UserService.URL);
  }

  public find(id: number) {
    const url = `UserService.URL/${id}`;
    return this.httpClient.get(url);
  }
}
