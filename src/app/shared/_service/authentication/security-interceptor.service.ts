import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityInterceptorService implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tempRequest = Object.assign(request);
    const tocken = this.authenticationService.currentUserValue;
    if (tocken) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${tocken}`
            },
            body: tempRequest.body
        });
    }
    return next.handle(request);
  }
}
