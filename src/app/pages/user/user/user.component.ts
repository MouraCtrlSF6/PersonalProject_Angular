import { Component, OnInit } from '@angular/core';
import { UserDetailsDto } from 'src/app/interfaces/userDetailsDto';
import { UserService } from 'src/app/services/user/user.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public infos: UserDetailsDto = {
    id: 0,
    name: "", 
    cpf: "", 
    roles: [],
    registerDate: "",
    updatedate: "", 
    lastAccessAt: ""
  };
  public ommitHeaders: string[] = [];

  constructor(private service: UserService) {}

  private handleRequest({ id }: any): Promise<UserDetailsDto> {
    return new Promise((resolve, reject) => {
      this.service.find(id).subscribe((response: any) => resolve(response),
      (error: any) => reject(error));
    })
  }

  private defineOmitHeaders() {
    this.ommitHeaders.push('/login'); 
    const roles = JSON.parse(localStorage.getItem('user') || '').roles;

    if(!roles.includes('ROLE_ADMIN')) {
      this.ommitHeaders.push('/user-list');
    }
    return;
  }

  async ngOnInit(): Promise<any> {
    try {
      this.defineOmitHeaders();

      const userInfo: any = JSON.parse(localStorage.getItem('user') || "");
      const response: UserDetailsDto = await this.handleRequest(userInfo);

      this.infos = response;
      this.infos.registerDate = formatDate(this.infos.registerDate, "dd/MM/yyyy hh:mm:ss", "en");
      this.infos.roles = this.infos.roles.map(role => role.role);
    } catch(error: any) {
      console.error(error.error || error.message);
    }
  }
}
