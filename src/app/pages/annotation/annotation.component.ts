import { Component, OnInit } from '@angular/core';
import { AnnotationDto } from 'src/app/interfaces/annotationDto';
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

  constructor(private service: AnnotationService) { }

  private defineOmitHeaders(): void{
    this.ommitHeaders.push('/login');
    const roles = JSON.parse(localStorage.getItem('user') || '').roles;

    if(!roles.includes('ROLE_ADMIN')) {
      this.ommitHeaders.push('/user-list');
    }
    return;
  }

  private handleRequest(method: string = "list", params: any = {}): Promise<AnnotationDto[]> {
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

  public async createAnnotation(): Promise<any> {
    try {
      const response = await this.handleRequest("register", this.annotationForm);
      console.log("response: ", response);
    } catch(error: any) {
      console.error(error.message);
    }
  }

  public async ngOnInit(): Promise<any> {
    try {
      this.defineOmitHeaders();

      const response: AnnotationDto[] = await this.handleRequest("list");

      console.log("Response: ", response);

    } catch(error: any) {
      console.error(error.message);
    }
  }

}
