import { HttpClient } from '@angular/common/http';
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

  public list(params: any = {}): Observable<any> {
    const stringParams: string =
      `page=${params.page || '0'}&size=${params.size || '4'}&sort=${params.sort || 'name'}`

    const url = `${UserService.URL}?${stringParams}`

    return this.httpClient.get(url);
  }

  public find(id: number): Observable<any> {
    const url = `${UserService.URL}/${id}`;
    return this.httpClient.get(url);
  }
}
