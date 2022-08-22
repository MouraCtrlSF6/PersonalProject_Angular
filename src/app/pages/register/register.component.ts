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
    cpf: ""
  };

  public errors: any[] = [];
  public displaySuccess: boolean = false;
  public errorMessage: string = "";
  public successMessage: string = "";

  constructor(private service: UserService, private router: Router) {}

  public inputHandle($event: string, attribute: string): void {
    this.togglePopups();
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
      if(!this.validateFields()) {
        const message = `Fields ${this.errors.join(", ")} can not be empty.`
        this.displayErrors(message);
        return;
      }

      if(!this.validatePassword()) {
        const message = this.errors.join(' AND ');
        this.displayErrors(message);
        return;
      }

      const payload = JSON.parse(JSON.stringify(this.form));
      delete payload.confirmPassword;

      await this.handleRequest(payload);

      this.successMessage = `User ${payload.name} successfully registered.`;
      this.displaySuccess = true;

      return;
    } catch(err: any) {
      this.errors.push(true);
      this.errorMessage = "CPF já existente";
      console.error(err.message);
    }
  }

  private displayErrors(message: string): void {
    this.errorMessage = message;
    return;
  }

  private togglePopups(): void {
    this.errors = [];
    this.displaySuccess = false;
    return;
  }

  private clearFields() {
    Object.keys(this.form).forEach((key: any) => {
      this.form[key] = "";
    });
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
      ...errors.map(error => error.description)
    ];

    return !this.errors.length;
  }

  private validateFields(): boolean {
    return Object.keys(this.form).reduce((group, item) => {
      if(!this.form[item].length) {
        this.errors.push(item)
        group = false;
      }

      return group;
    }, true);
  }

  ngOnInit(): void {}
} 
