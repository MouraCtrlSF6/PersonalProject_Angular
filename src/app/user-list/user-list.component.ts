import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: any[] = [];

  constructor(private service: UserService) {}

  private formatDate(date: string): string {
    const datePart = new Date(date).toLocaleDateString("en").toString();
    const timePart = new Date(date).toLocaleTimeString("en").toString();

    return `${datePart} ${timePart}`
  }

  ngOnInit(): void {
    this.service.listAll().subscribe(data => {
      const response: any = {
        data: new Array(data)
      };

      response.data = response.data[0];

      this.users = response.data.map((user: any) => ({
        name: user.name,
        registerDate: this.formatDate(user.registerDate)
      }));
    })
  }

}
