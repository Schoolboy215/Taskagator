import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('tasksComponent') child;
  user : User = null;
  tasks : any = null;
  constructor(  private userService : UsersService,
                private router : Router,
                private route : ActivatedRoute,
                private snackBar : MatSnackBar,
                private dialog : MatDialog) { }

  ngOnInit() {
    this.getUser().subscribe(result => {
    });
  }

  getUser(): Observable<any> {
    return new Observable(observer => {
      this.userService.getUser(this.route.snapshot.paramMap.get('name')).subscribe( response => {
        this.user = response as User;
        this.tasks = this.user.tasks;
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
  addTask(task : Task): void {
    this.userService.addTask(this.user, task).subscribe( response => {
      if (response.errors)
        this.snackBar.open(response.message,'',{duration: 2000});
      else
        this.snackBar.open('Task added','',{duration: 2000});
      this.getUser().subscribe(result=>{
        this.updateTaskChild();
      });
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
  
  //These methods are for the task list component to call
  deletedTask(event): void {
    this.snackBar.open(event,'',{duration: 3000});
    this.getUser().subscribe(result=>{
      this.updateTaskChild();
    });
  }
  updatedTask(event: string): void {
    this.snackBar.open(event,'',{duration: 3000});
    this.getUser().subscribe(result=>{
      this.updateTaskChild();
    });
  }

  updateTaskChild(): void {
    if (this.child){
      this.child.tasks = this.tasks;
      this.child.processFilters();
    }
  }
}
