import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { Task } from './task';
import { TasksService } from './tasks.service';
import { TaskFormComponent } from './task-form/task-form.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public filters: any = [{text:"Client: Malco"}, {text:"Client: Heartland"}];
  @Input() tasks : Task[];
  @Input() viewMode: string = "tasks";
  @Output() deletedTask: EventEmitter<string> = new EventEmitter<string>();
  @Output() updatedTask: EventEmitter<string> = new EventEmitter<string>();

  constructor(  public tasksService: TasksService,
                private dialog: MatDialog) { }

  ngOnInit() {
  }
  deleteTask(task : Task): void {
    this.tasksService.deleteTask(task).then(result => {
      this.deletedTask.emit("Task deleted");
    });
  }
  updateTask(task: Task): void {
    this.tasksService.updateTask(task).then( result => {
      this.updatedTask.emit(result.toString());
    });
  }
  updateTaskModal(task: Task): void {
    let dialogRef = this.dialog.open(TaskFormComponent, {
      data: { updating: true,
              _id: task._id,
              client: task.client,
              name: task.name,
              description: task.description,
              link: task.link}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.updateTask(result);
      }
    });
  }

  removeFilter(filter: any): void {
    let index = this.filters.indexOf(filter);
    if (index >= 0) {
      this.filters.splice(index,1);
    }
  }
}
