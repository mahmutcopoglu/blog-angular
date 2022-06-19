import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ResponseModel } from "../models/response.model";

const ROOT_PATH = environment.requestRoot;

@Injectable()
export class RegisterService {
    constructor(private http: HttpClient) { }

    getRegister(registerModel: any){
        return this.http.post<ResponseModel>(ROOT_PATH + '/register', registerModel)
        .pipe(
            catchError(err => {
                return throwError(err);
            })
        );
    }



}