import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { User } from './user';
import { Task } from '../tasks/task';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(private http: Http,
              private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get('/api/users')
      .map(res => {return res})
      .catch((error: any) => {
        console.log("error next");
        console.log(error);
        return Observable.throw(new Error(error));
      });
  }
  createUser(name):Observable<User> {
    return this.httpClient.post<User>('/api/users/create', {"name" : name})
    .map((response: User) => {
      return response;
    })
    .catch((error: any) => {
      return Observable.throw(new Error(error.error));
    });
  }
  deleteUser(_user: User):Observable<any> {
    return this.httpClient.delete('/api/users/'+_user.name);
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

  getTasks(_user: User):Observable<any> {
    return this.httpClient.get('/api/users/'+_user.name+'/tasks');
  }
  addTask(_user: User, _task: Task):Observable<any> {
    return this.httpClient.put<any>('/api/users/'+_user.name+"/tasks",_task);
  }
}
