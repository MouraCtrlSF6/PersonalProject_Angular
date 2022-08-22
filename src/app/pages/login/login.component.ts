import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { AuthDto } from '../../interfaces/authDto'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: any = {
    name: "",
    password: ""
  };

  public errors: any[] = [];
  public displaySuccess: boolean = false;
  public errorMessage: string = "";
  public successMessage: string = "";
  
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

  public validate(): void { 
    const validations: any[] = [  
      (form: any) => Object.keys(form).filter((field: string) => !form[field] || !form[field].length)
    ];

    validations.forEach(validation => this.errors.push(...validation(this.form)));

    if(this.errors.length) {
      this.errorMessage = `Fields ${this.errors.join(", ")} can not be empty.`
      return;
    }

    this.send();
    return;
  }

  public async send(): Promise<any> {
    try {
      const response: AuthDto = await this.handleRequest(this.form);
      const publicUserInfo: any = {
        id: response?.user?.id,
        name: response?.user?.name,
        registeredAt: response?.user?.registerDate,
        roles: response?.user?.roles.map((role: any) => role.role)
      };

      localStorage.setItem("token", response?.token);
      localStorage.setItem("user", JSON.stringify(publicUserInfo));

      this.successMessage = `Logged in as ${publicUserInfo.name}`;
      this.displaySuccess = true;

      setTimeout(() => { 
        this.displaySuccess = false; 
        this.router.navigateByUrl("user");
      }, 1000);
    } catch(error: any) {
      console.error(error);
      this.errors.push(true);
      this.errorMessage = (error.error || error.message)
        .replace("Error: ", "");
    }

    return;
  }

  public inputHandle($event: string, attribute: string): void {
    this.clearErrors();
    this.form[attribute] = $event;
  }

  private clearErrors() {
    this.errors = [];
  }

  ngOnInit(): void {}
}
