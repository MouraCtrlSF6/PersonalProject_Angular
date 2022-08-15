import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

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

  public send(): void {
    this.loginService
      .login(this.form)
      .subscribe((response) => {
        console.log("response data: ", response);
      })

    return;
  }

  public inputHandle($event: string, attribute: string): void {
    this.form[attribute] = $event;
  }

  ngOnInit(): void {}

}
