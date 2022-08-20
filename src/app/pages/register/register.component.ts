import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/interfaces/userDto';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: any = {
    name: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    roles: ""
  };

  private errors: any[] = [];

  constructor(private service: UserService, private router: Router) {}

  public inputHandle($event: string, attribute: string): void {
    this.form[attribute] = $event;
    return;
  }

  private handleRequest(payload: any): Promise<UserDto> {
    return new Promise((resolve, reject) => {
      this.service.register(payload).subscribe((response: any) => resolve(response),
      (err:any) => reject(err))
    });
  }

  public async send(): Promise<any> {
    try {
      const validations = [
        () => this.validateFields(),
        () => this.validatePassword(),
      ];
      const errors = validations.find(validation => !validation())

      if(errors) {
        this.displayErrors();
        this.clearErrors();
        return;
      }
      const payload = JSON.parse(JSON.stringify(this.form));
      delete payload.confirmPassword;

      payload.roles = payload.roles
        .toUpperCase()
        .split(",")
        .map((role: string) => {
          role = role.trim();
          return role.startsWith("ROLE_")
            ? role
            : "ROLE_" + role;
        });

      console.log("Roles: ", payload.roles);

      const response: UserDto = await this.handleRequest(payload);
      console.log("User successfully registered! ", response);
    } catch(err: any) {
      console.error(err.message);
    }
  }

  private displayErrors(): void {
    this.errors.forEach((error: any) => console.error(error.description));
    return;
  }

  private clearErrors(): void {
    this.errors = [];
    return;
  }

  private validatePassword(): boolean {
    const validations = [
      {
        name: "invalid length",
        description: "Password must be of 8 or 12 characters length",
        exec: () => {
          return this.form.password.length >= 8 && this.form.password.length <= 12;
        }
      },
      {
        name: "dont match",
        description: "Provided passwords are not equal.",
        exec: () => {
          return this.form.password === this.form.confirmPassword;
        }
      }
    ];

    const errors = validations.filter(validation => !validation.exec());
    this.errors = [
      ...this.errors,
      ...errors.map(error => ({
        name: error.name,
        description: error.description
      }))
    ];

    return !this.errors.length;
  }

  private validateFields(): boolean {
    return Object.keys(this.form).reduce((group, item) => {
      if(!this.form[item].length) {
        this.errors.push({
          name: "not null",
          description: `Field ${item} must not be empty.`
        })
        group = false;
      }

      return group;
    }, true);
  }

  ngOnInit(): void {}
}
