import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders,} from '@angular/common/http';
import {SingletonService} from '../services/singleton.service';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(public http: HttpClient, public singleton: SingletonService) { }
  getData(url) {
    return this.http.get(`${this.singleton.baseAPIUrl}/${url}`);
}


postData(url, data) {
    return this.http.post(`${this.singleton.baseAPIUrl}/${url}`, data);
}

postFile(url, data) {

  const headers = new HttpHeaders()
            .set('Content-Type', 'multipart/form-data; boundary="another cool boundary"');
  
  return this.http.post(`${this.singleton.baseAPIUrl}/${url}`, data, { headers: headers });
    
}

putData(url, data) {
    return this.http.put(`${this.singleton.baseAPIUrl}/${url}`, data);
}
}