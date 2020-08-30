import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';
import { SingletonService } from '../services/singleton.service';
import { DataProviderService } from '../services/data-provider.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private cookieService: CookieService,
    private  singleton: SingletonService,public http: 
    HttpClient, public dataService:DataProviderService, 
    private router:Router,
     ) {}



  public login(username, password): Observable<any>{
    
    let params = new HttpParams().set('username', username).set('grant_type', 'password').set('password', password).set('client_id', 'clientapp').toString();
    console.log(`params ${params}`);
    console.log(this.singleton.baseAPIUrl);
    
    return this.http.post<any>(`${this.singleton.baseAPIUrl}/oauth/token`, params).pipe(map(user => {
            if (user.access_token) {
                const expTime = user.expires_in * 1000 + Date.now();
                this.cookieService.set('access_token', user.access_token);
                this.cookieService.set('expires_in', JSON.stringify(expTime));
                this.cookieService.set('refresh_token', user.refresh_token);
                this.singleton.setIsLoggedIn(true);
                console.log(user);
                return user;
            }else{
              this.singleton.setIsLoggedIn(false);
            }
        }));
}






logout() {
  this.cookieService.delete('access_token');
  this.cookieService.delete('expires_in');
  this.cookieService.delete('refresh_token');
  this.cookieService.delete('isJmb');
  this.cookieService.delete('isSunsuria');
  this.cookieService.delete('isDK');
  this.cookieService.delete('superAdmin');
  this.singleton.setIsLoggedIn(false);
  this.cookieService.deleteAll();
  this.router.navigate(['/login']);
}


}