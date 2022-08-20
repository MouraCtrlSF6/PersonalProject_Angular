import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { AuthDto } from '../../interfaces/authDto'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public form: any = {
    name: "",
    password: ""
  };

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  private handleRequest(payload: any) {
    return new Promise<AuthDto>((resolve, reject) => {
      this.loginService
        .login(payload)
        .subscribe((response: AuthDto) => {
          resolve(response);
        }, (error: any) => reject(error));
    })
  }

  public async send(): Promise<any> {
    try {
      const response: AuthDto = await this.handleRequest(this.form);
      const publicUserInfo: any = {
        name: response?.user?.name,
        registeredAt: response?.user?.registerDate,
      };

      localStorage.setItem("token", response?.token);
      localStorage.setItem("user", JSON.stringify(publicUserInfo));

      console.log("Logged in as", publicUserInfo.name);
    } catch(error: any) {
      console.error("Error: ", error.message);
    }

    return;
  }

  public inputHandle($event: string, attribute: string): void {
    this.form[attribute] = $event;
  }

  ngOnInit(): void {}

}
