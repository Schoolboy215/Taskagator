import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Task } from '../../tasks/task';
import { Observable } from 'rxjs/Rx';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { TaskFormComponent } from '../../tasks/task-form/task-form.component';
import { TasksComponent } from '../../tasks/tasks.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user : User = null;
  tasks : any = null;
  constructor(  private userService : UsersService,
                private router : Router,
                private route : ActivatedRoute,
                private snackBar : MatSnackBar,
                private dialog : MatDialog) { }

  ngOnInit() {
    this.getUser().subscribe(result => {
      this.getTasks();
    });
  }

  getUser(): Observable<any> {
    return new Observable(observer => {
      this.userService.getUser(this.route.snapshot.paramMap.get('name')).subscribe( response => {
        this.user = response as User;
        observer.next(this.user);
        observer.complete();
      }, error => {
        this.user = null;
        observer.error(error);
        observer.complete();
        this.snackBar.open(error,'',{duration: 3000});
        this.router.navigateByUrl('/users');
      });
    });
  }
  getTasks(): void{
    this.userService.getTasks(this.user).subscribe( response => {
      this.tasks = response;
      console.log(response);
    });
  }
  addTask(task : Task): void {
    this.userService.addTask(this.user, task).subscribe( response => {
      this.getTasks();
    })
  }
  newTaskModal(): void {
    let dialogRef = this.dialog.open(TaskFormComponent, {
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.addTask(result);
      }
    });
  }
  deleteTask(): void {
    console.log("Delete on User-detail");
  }
}
