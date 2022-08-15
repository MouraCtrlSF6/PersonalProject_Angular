import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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
  };

  private errors: any[] = [];

  constructor(private service: UserService, private router: Router) {}

  public inputHandle($event: string, attribute: string): void {
    this.form[attribute] = $event;
    return;
  }

  public send(): void {
    if(!this.validateFields()) {
      this.displayErrors();
      this.clearErrors();
      return;
    }
    if(!this.validatePassword()) {
      this.displayErrors();
      this.clearErrors();
      return;
    }

    const payload = {
      name: this.form.name,
      password: this.form.password,
      cpf: this.form.cpf
    }

    this.service.register(payload).subscribe(
    (response) => {
      console.log("Success! Response: ", response?.data || response);
      this.router.navigateByUrl("login");
    },
    (error) => {
      console.error("Wops! An error has occurred: ", error?.message);
    })
  }

  private displayErrors(): void {
    this.errors.forEach((error: any) => console.error(error.description));
  }

  private clearErrors(): void {
    this.errors = [];
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
