import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './shared/_components';
import { SecurityInterceptorService } from './shared/_service/authentication/security-interceptor.service';
import { ErrorInterceptorService } from './shared/_service/authentication/error-service.service';
import { RegistrationComponent } from './shared/_components/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
