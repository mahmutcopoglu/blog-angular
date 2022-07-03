import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ResponseModel } from "../models/response.model";


const ROOT_PATH = environment.requestRoot;

@Injectable()
export class ContentService {
    constructor(private http: HttpClient) { }

    getPosts(): Observable<ResponseModel>{
        return this.http.get<ResponseModel>(ROOT_PATH + '/api/posts/allPosts').pipe(
            catchError(err => {
                return throwError(err);
            })
        );
    }

   


}