import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { DefaultButtonComponent } from './components/buttons/default-button/default-button.component';
import { DefaultInputComponent } from './components/inputs/default-input/default-input.component';
import { InterceptorsService } from './services/http/interceptors.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DefaultButtonComponent,
    DefaultInputComponent,
    RegisterComponent,
    NavbarComponent,
    UserListComponent,
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
