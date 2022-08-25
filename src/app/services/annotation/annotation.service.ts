import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  private static URL: string = "http://localhost:8080/annotations";

  constructor(private httpClient: HttpClient) {}

  public list(params: any): Observable<any> {
    let stringParams: string = "";
    const defaultValues: any = {
      page: 0,
      size: 4,
      sort: 'user_id',
      user_id: null,
      user_name: null
    }

    Object.keys(params).forEach(param => {
      stringParams += `${param}=${params[param] || defaultValues[param]}&`
    })
    const url = `${AnnotationService.URL}?${stringParams}`
    return this.httpClient.get(url);
  }

  public find(id: number): Observable<any> {
    const url = `${AnnotationService.URL}/${id}`;
    return this.httpClient.get(url);
  }

  public register(payload: any): Observable<any> {
    return this.httpClient.post(AnnotationService.URL, payload);
  }
}
