import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError, map } from 'rxjs/operators';

import { Task } from './task';

@Injectable()
export class TasksService {

  constructor(private httpClient: HttpClient) { }

  getAllClients() {
    return new Promise((resolve, reject) => {
      this.httpClient.get('/api/clients').subscribe(results => {
        resolve(results);
      })
    });
  }
  deleteTask(task : Task) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete('/api/tasks/'+task._id).subscribe(results => {
        resolve(results);
      })
    });
  }
  updateTask(task: Task) {
    return new Promise((resolve, reject) => {
      this.httpClient.put('api/tasks/'+task._id, {task}).subscribe(results => {
        resolve(results);
      });
    });
  }
}
