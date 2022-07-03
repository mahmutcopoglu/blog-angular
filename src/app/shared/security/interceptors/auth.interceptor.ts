import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { BehaviorSubject, Observable, throwError } from 'rxjs';
  import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
      null
    );
  
    constructor(private loginService: LoginService, private http: HttpClient) { }
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const accessToken = this.loginService.getAccessToken();
      const refreshToken = this.loginService.getRefreshToken();
  
      if (accessToken) {
        request = this.addToken(request, accessToken);
      }
      return next.handle(request).pipe(
        catchError((error) => {
          
          if (error instanceof HttpErrorResponse) {
            if (
              (error.status === 401 ||
                this.loginService.isTokenExpired(accessToken)) &&
              !this.loginService.isTokenExpired(refreshToken)
            ) {
              this.loginService.doLogout();
              return this.handle401Error(request, next);
              
  
            } else {
              const errorMessage = error.error.errorMessage;
              return throwError(errorMessage);
            }
          } else {
            const errorMessage = error.error.errorMessage;
            return throwError(errorMessage);
          }
        })
      );
    }
  
    private addToken(request: HttpRequest<any>, token: string) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
  
        return this.loginService.getAccessTokenWithRefreshToken().pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token.accessToken);
            return next.handle(this.addToken(request, token.accessToken));
          })
        );
      } else {
        return this.refreshTokenSubject.pipe(
          filter((token) => token != null),
          take(1),
          switchMap((accessToken) => {
            return next.handle(this.addToken(request, accessToken));
          })
        );
      }
    }
  }