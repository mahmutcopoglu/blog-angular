import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ResponseModel } from "../models/response.model";
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";

const ROOT_PATH = environment.requestRoot;

@Injectable()
export class LoginService {
    constructor(private http: HttpClient,
        private cookieService: CookieService,
        private jwtHelperService: JwtHelperService) { }

    getLogin(loginModel: any){
        return this.http.post<any>(ROOT_PATH + '/login', loginModel)
    }


    isLoggedIn(){
        return !!this.getAccessToken();
    }


    isAuthenticated():boolean {
        const token = this.getAccessToken();
        if(token==null || this.jwtHelperService.isTokenExpired(token)){
            return false;
        }
        return true;
    }

    getExpiration(): Date {
        const token = this.getAccessToken();
        const expiration = this.jwtHelperService.getTokenExpirationDate(token);
        return expiration;
    }


    getAccessToken(){
        return this.cookieService.get('access_token');
    }

    getRefreshToken(){
        return this.cookieService.get('refresh_token');
    }

    storeTokens(accessToken: any, refreshToken: any){
        this.cookieService.set('access_token',accessToken);
        this.cookieService.set('refresh_token',refreshToken);
    }

    removeToken(){
        this.cookieService.delete('access_token');
        this.cookieService.delete('refresh_token');
    }



}