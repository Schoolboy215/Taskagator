import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { User } from './user';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(private http: Http,
              private httpClient: HttpClient) { }

  getAllUsers() {
    return this.http.get('/api/users')
      .map(res => res.json());
  }

  createUser(name):Observable<User> {
    return this.httpClient.post<User>('/api/users/create', {"name" : name})
    .map((response: User) => {
      return response;
    });
  }

  getUser(_name: string):Observable<User> {
    return this.httpClient.get<User>('/api/users/'+_name)
    .map((response: User) => {
      return response;
    })
    .catch((error: any) => {
      return Observable.throw(new Error(error.error));
    });
  }

  updateUser(_user: User, _editedUser: User):Observable<User> {
    return this.httpClient.put<User>('/api/users/'+_user.name, _editedUser);
  }
}
