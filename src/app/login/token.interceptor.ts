import { Injectable, Injector } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
// import { CookieService } from 'ngx-cookie-service';

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { SingletonService } from '../services/singleton.service';
;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    public url = `${this.singleton.baseAPIUrl}`; 
    excludedUrl = [
        this.url+"WidgetData/LandingPage/homeLoggedOff",
        this.url+"DunamisUser/GetOTP",
        this.url+"DunamisUser/ValidateOTPForPasswordReset",
        this.url+"DunamisUser/ChangePassword",
        this.url+"/CreateConsumeUser",
        

    ];
    constructor( public auth : AuthService,public singleton:SingletonService ){}

   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        if (this.excludedUrl.some(x => x === request.url)) {
            console.log('Excluded request: ' + request.url);
            return next.handle(request);
        }
        else {
            if(request.url ==  this.url+"/oauth/token")
            {         
                request = request.clone({
                    setHeaders: {
                        'Content-Type': "application/x-www-form-urlencoded; charset=utf-8",
                        'Authorization' : `Basic ${btoa("clientapp:123456")}`,
                    },
                    withCredentials: true
                });
            }else{
                request = request.clone({
                    params :  new HttpParams({
                        fromString: `access_token=${this.auth.getCookie('access_token')}`
                      }),
                });

            }


            return next.handle(request).do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.auth.collectFailedRequest(request);
                    }
                }
            });
        }

        

    }
}