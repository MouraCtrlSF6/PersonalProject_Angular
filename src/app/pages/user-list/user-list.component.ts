import { Component, OnInit } from '@angular/core';
import { Pageable } from 'src/app/interfaces/pageable';
import { UserDto } from 'src/app/interfaces/userDto';
import { UserService } from '../../services/user/user.service';

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

  private handleRequest(payload: any = ""): Promise<Pageable> {
    return new Promise((resolve, reject) => {
      this.service.list(payload).subscribe((response: any) => resolve(response),
      (err:any) => reject(err))
    });
  }

  public async ngOnInit(): Promise<any> {
    try {
      const response: Pageable = await this.handleRequest();

      this.users = response?.content.map(user => ({
        name: user?.name,
        registerDate: this.formatDate(user?.registerDate)
      }))

      return;
    } catch(err: any) {
      console.error(err.message);
    }
  }

}
