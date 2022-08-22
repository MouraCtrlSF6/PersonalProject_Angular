import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() additionalHeaders: any[] = [];
  @Input() omit: any[] = [];

  public headerList: any[] = [
    {
      route: "/login",
      name: "Back to Login"
    },
    { 
      route: '/user',
      name: 'Home'
    },
    {
      route: "/user-list",
      name: "User List"
    },
    { 
      route: '/annotation', 
      name: 'Annotations'
    }
  ];

  public headers: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.headerList = [
      ...this.headerList,
      ...this.additionalHeaders
    ];

    this.headers = this.headerList.filter(header => {
      const removeCases = [
        this.router.url === header.route,
        this.router.url === "/" && header.route === "/login",
        this.omit.includes(header.route)
      ];

      return !removeCases.find(remove => !!remove);
    })
  }
}
