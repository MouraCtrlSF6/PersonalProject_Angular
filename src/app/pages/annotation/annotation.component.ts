import { Component, OnInit } from '@angular/core';
import { AnnotationDto } from 'src/app/interfaces/annotationDto';
import { Pageable } from 'src/app/interfaces/pageable';
import { AnnotationService } from 'src/app/services/annotation/annotation.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit {
  public ommitHeaders: string[] = [];
  public annotations: AnnotationDto[] = [];
  public annotationForm: any = {
    content: "",
  };
  public popups: any = {
    success: {
      text: "",
      display: false
    },
    error: {
      text: "",
      display: false
    }
  }
  public pagination: any = {
    page: 0,
    size: 3,
    sort: 'userAnnotationId',
  }
  public listInfos: any = {}

  constructor(private service: AnnotationService) { }

  private defineOmitHeaders(): void{
    this.ommitHeaders.push('/login');
    const roles = JSON.parse(localStorage.getItem('user') || '').roles;

    if(!roles.includes('ROLE_ADMIN')) {
      this.ommitHeaders.push('/user-list');
    }
    return;
  }

  private handleRequest(method: string = "list", params: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      switch(method) {
        case "list":
          this.service.list(params).subscribe((response) => resolve(response),
          (error) => reject(error));
          break;
        case "find":
          this.service.find(params).subscribe((response) => resolve(response),
          (error) => reject(error));
          break;
        case "register":
          this.service.register(params).subscribe((response) => resolve(response),
          (error) => reject(error));
          break;
        default:
          reject(new Error("Method not supported"));
      }
    })
  }

  public inputHandle($event: string, field: string): void {
    this.annotationForm[field] = $event;
  }

  public async createAnnotation(): Promise<any> {
    try {
      const response: AnnotationDto = await this.handleRequest("register", this.annotationForm);

      this.popUp("Annotation successfully created!", "success");

      return await this.pageResults(
        this.pagination.page,
        this.pagination.size,
        this.pagination.sort
      );
    } catch(error: any) {
      console.error(error.message);
      this.popUp(error.message, "error");
    }
  }

  private popUp(text: string, type: string): void {
    this.popups[type].text = text;
    this.popups[type].display = true;

    setTimeout(() => {
      this.popups[type].text = "";
      this.popups[type].display = false;
    }, 1500)

    return;
  }

  public async loadAnnotations(): Promise<any> {
    try {
      const response: Pageable<AnnotationDto> = await this.handleRequest("list", this.pagination);

      this.listInfos = {
        totalPages: response.totalPages || 1,
        totalElements: response.totalElements,
        isLastPage: response.last,
        isFirstPage: response.first,
      }

      return response;
    } catch(error: any) {
      console.error(error.message);
      this.popUp(error.message, "error");
    }
  }

  public async pageResults(page: number, size: number, sort: string): Promise<any> {
    try {
      if(page > this.listInfos.totalPages - 1) return;
      if(page < 0) return;

      [
        this.pagination.page,
        this.pagination.size,
        this.pagination.sort
      ] = [page, size, sort];

      const response = await this.loadAnnotations();
      this.annotations = response?.content;
      return;
    } catch(error: any) {
      console.error(error.message);
    }
  }

  public async ngOnInit(): Promise<any> {
    try {
      this.defineOmitHeaders();
      return await this.pageResults(
        this.pagination.page,
        this.pagination.size,
        this.pagination.sort
      );
    } catch(error: any) {
      console.error(error.message);
    }
  }
}
