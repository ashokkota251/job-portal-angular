import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  helper = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  get currentUserValue(): string {
    return this.currentUserSubject?.value;
  }

  login(username: string, password: string) {
    return this.http.post<string>(environment.api_url + 'Users/authenticate', { Username: username, Password: password })
    .pipe(map((user: any) => {
        if (user && user.tocken) {
          localStorage.setItem('AccessToken', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return this.getUserInfoByToken(user.access);
        }
        return user;
    }));
  }

  employeeRegister(userUata: any) {
    return this.http.post<string>(environment.api_url + 'Registration/user', userUata)
    .pipe(map((user: any) => {
        return user;
    }));
  }

  getUserInfoByToken(access: string) {
    return this.helper.decodeToken(access);
  }

}
