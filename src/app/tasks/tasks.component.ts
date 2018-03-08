import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() tasks : Task[];
  @Output() deletedTask: EventEmitter<string> = new EventEmitter<string>();

  constructor( public tasksService: TasksService) { }

  ngOnInit() {
  }
  deleteTask(task : Task): void {
    this.tasksService.deleteTask(task).then(result => {
      this.deletedTask.emit("Task deleted");
    });
  }
}
