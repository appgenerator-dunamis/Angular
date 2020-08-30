import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {
baseAPIUrl = 'http://localhost:8092';
public isLoggedIn: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);  


setIsLoggedIn(status){
  this.isLoggedIn.next(status);
}
  constructor() { }
}