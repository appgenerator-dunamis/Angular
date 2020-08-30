import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpRequest } from '@angular/common/http';
@Injectable()
export class AuthService {
    constructor(public cookieService: CookieService) { }

    cachedRequests: Array<HttpRequest<any>> = [];
    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }

    // COOKIE SERVICE
    public getCookie(key: string) : string{
        return this.cookieService.get(key);
    }
    
}