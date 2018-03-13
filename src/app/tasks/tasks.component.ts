import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { Task } from './task';
import { TasksService } from './tasks.service';
import { TaskFormComponent } from './task-form/task-form.component';
import { NewFilterFormComponent } from './new-filter-form/new-filter-form.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public filters: any = [];//[{text:"Client: Malco"}, {text:"Client: Heartland"}];
  public refinedTasks : Task[];
  @Input() tasks : Task[];
  @Input() viewMode: string = "tasks";
  @Output() deletedTask: EventEmitter<string> = new EventEmitter<string>();
  @Output() updatedTask: EventEmitter<string> = new EventEmitter<string>();

  constructor(  public tasksService: TasksService,
                private dialog: MatDialog) { }

  ngOnInit() {
    this.processFilters();
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
  processFilters(): void {
    this.refinedTasks = Array.from(this.tasks);
    this.filters.forEach(filter => {
      switch(filter.type){
        case 'client':
          this.refinedTasks.forEach((task,index) => {
            if (task.client != filter.data)
              this.refinedTasks.slice(index,1);
          });
          break;
        case 'developer':
          break;
      }
    });
  }
  removeFilter(filter: any): void {
    let index = this.filters.indexOf(filter);
    if (index >= 0) {
      this.filters.splice(index,1);
      this.processFilters();
    }
  }
  addFilter(): void {
    let dialogRef = this.dialog.open(NewFilterFormComponent, {
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        var newFilter: any = {};
        switch(result.filtering)
        {
          case 'client':
            newFilter.type = "client";
            newFilter.text = "Client: " + result.client.name;
            newFilter.data = result.client._id;
            break;
          case 'developer':
            newFilter.type = 'developer';
            newFilter.text = "Dev: " + result.developer.name;
            newFilter.data = result.developer._id;
            break;
        }
        this.filters.push(newFilter);
        this.processFilters();
      }
    });
  }
}
