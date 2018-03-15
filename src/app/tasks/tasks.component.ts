import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgSwitch } from '@angular/common';
import { Task } from './task';
import { TasksService } from './tasks.service';
import { TaskFormComponent } from './task-form/task-form.component';
import { NewFilterFormComponent } from './new-filter-form/new-filter-form.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { EventListener } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public filters: any = [];//[{text:"Client: Malco"}, {text:"Client: Heartland"}];
  public refinedTasks: any[];
  private runningStandalone: boolean = false;
  @Input() tasks : Task[];
  @Input() viewMode: string = "tasks";
  @Output() deletedTask: EventEmitter<string> = new EventEmitter<string>();
  @Output() updatedTask: EventEmitter<string> = new EventEmitter<string>();

  constructor(  public tasksService: TasksService,
                private dialog: MatDialog) { }

  ngOnInit() {
    if (this.tasks)
      this.processFilters();
    else {
      this.runningStandalone = true;
      this.loadStandalone();
    }
  }
  deleteTask(task : Task): void {
    this.tasksService.deleteTask(task).then(result => {
      if (this.runningStandalone)
        this.loadStandalone();
      else
        this.deletedTask.emit("Task deleted");
    });
  }
  updateTask(task: Task): void {
    this.tasksService.updateTask(task).then( result => {
      if (this.runningStandalone)
        this.loadStandalone();
      else
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
          for(var index=this.refinedTasks.length-1; index >= 0; index--) {
            var task = this.refinedTasks[index];
            if (filter.data.indexOf(task.client._id) < 0)
              this.refinedTasks.splice(index,1);
          };
          break;
        case 'developer':
          for(var index=this.refinedTasks.length-1; index >= 0; index--) {
            var task = this.refinedTasks[index];
            if (filter.data.indexOf(task.developer._id) < 0)
              this.refinedTasks.splice(index,1);
          };
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
      data: { screen: this.viewMode }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        var newFilter: any = {};
        switch(result.filtering)
        {
          case 'client':
            newFilter.type = "client";
            newFilter.text = "Client: ";
            newFilter.data = [];
            result.client.forEach(client => {
              newFilter.text += client.name + ", ";
              newFilter.data.push(client._id);
            });
            newFilter.text = newFilter.text.slice(0,-2);
            break;
          case 'developer':
            newFilter.type = 'developer';
            newFilter.text = "Dev: ";
            newFilter.data = [];
            result.developer.forEach(dev => {
              newFilter.text += dev.name + ", ";
              newFilter.data.push(dev._id);
            });
            newFilter.text = newFilter.text.slice(0,-2);
            break;
        }
        this.filters.push(newFilter);
        this.processFilters();
      }
    });
  }

  loadStandalone(): void {
    this.tasksService.getAllTasks().subscribe(results => {
      this.tasks = results;
      this.processFilters();
    })
  }
}
