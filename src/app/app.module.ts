import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { DefaultButtonComponent } from './components/buttons/default-button/default-button.component';
import { DefaultInputComponent } from './components/inputs/default-input/default-input.component';
import { InterceptorsService } from './services/http/interceptors.service';
import { ErrorComponent } from './components/popups/error/error.component';
import { SuccessComponent } from './components/popups/success/success.component';
import { UserComponent } from './pages/user/user/user.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AnnotationComponent } from './pages/annotation/annotation.component';
import { DefaultFieldComponent } from './components/fields/default-field/default-field.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultButtonComponent,
    DefaultInputComponent,
    RegisterComponent,
    NavbarComponent,
    UserListComponent,
    ErrorComponent,
    SuccessComponent,
    UserComponent,
    LogoutComponent,
    AnnotationComponent,
    DefaultFieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorsService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
