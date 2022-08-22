import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit {
  public ommitHeaders: string[] = [];

  constructor() { }

  private defineOmitHeaders() {
    this.ommitHeaders.push('/login'); 
    const roles = JSON.parse(localStorage.getItem('user') || '').roles;

    if(!roles.includes('ROLE_ADMIN')) {
      this.ommitHeaders.push('/user-list');
    }
    return;
  }


  ngOnInit(): void {
    this.defineOmitHeaders();
  }

}
