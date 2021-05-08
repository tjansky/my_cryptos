import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from '../shared/dtos/UserDro';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserDto>;
  public currentUser: Observable<UserDto>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserDto {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('https://localhost:5001/account/login', { username, password })
      .pipe(map(user => {
        console.log("pajpani user: ",user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(username: string, password: string) {
    return this.http.post<any>('https://localhost:5001/account/register', { username, password })
      .pipe(map(user => {
        console.log("registrirani user: ",user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
