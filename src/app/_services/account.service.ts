import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSourse = new ReplaySubject<User>(1)
  currentUser$ = this.currentUserSourse.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) =>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSourse.next(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user =>{
        if(user){
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSourse.next(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User){
    this.currentUserSourse.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSourse.next(null);
  }
}
