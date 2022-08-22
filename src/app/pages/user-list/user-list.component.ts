import { Component, OnInit } from '@angular/core';
import { Pageable } from 'src/app/interfaces/pageable';
import { formatDate } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { UserDetailsDto } from 'src/app/interfaces/userDetailsDto';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: any[] = [];

  public page: number = 0;
  public size: number = 4;
  public sort: string = "name";

  public listInfos: any = {}

  constructor(private service: UserService) {}

  private handleRequest(method: string = "list", payload: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      switch(method) {
        case "list":
          this.service.list(payload).subscribe((response: any) => resolve(response),
          (err:any) => reject(err));
          break;
        case "find":
          this.service.find(payload).subscribe((response: any) => resolve(response),
          (err:any) => reject(err));
          break;
        default:
          reject(new Error("Method not supported"));
      }
    });
  }

  public generateUsersInfo(userList: any[]): Promise<any[]> {
    const users: Promise<any>[] = userList.map(async (user) => {
      const userDetails: UserDetailsDto = await this.handleRequest("find", user?.id);

      return {
        name: user?.name,
        registerDate: "Registered at: " + formatDate(userDetails?.registerDate, "dd/MM/yy hh:mm:ss", "en"),
        lastAccessAt: "Last access at: " + formatDate(userDetails?.lastAccessAt, "dd/MM/yy hh:mm:ss", "en"),
        roles: "Roles: " + userDetails?.roles.map((role: any) => role.role).join(", ")
      }
    });

    return Promise.all(users);
  }

  public async pageResults(page: number, size: number, sort: string): Promise<any> {
    try {
      if(page > this.listInfos.totalPages - 1) return;
      if(page < 0) return;

      [this.page, this.size, this.sort] = [page, size, sort];

      const response: Pageable = await this.handleRequest("list", { page, size, sort });

      this.listInfos = {
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        isLastPage: response.last,
        isFirstPage: response.first,
      }

      this.users = await this.generateUsersInfo(response?.content);
      return;
    } catch(error: any) {
      console.error(error.message);
    }
  }

  public async ngOnInit(): Promise<any> {
    try {
      return await this.pageResults(this.page, this.size, this.sort);
    } catch(err: any) {
      console.error(err.message);
    }
  }
}
