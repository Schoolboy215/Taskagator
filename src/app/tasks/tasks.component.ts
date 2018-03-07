import { Component, OnInit, Input } from '@angular/core';
import { Task } from './task';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() tasks : Task[];
  constructor( public tasksService: TasksService) { }

  ngOnInit() {
  }
  deleteTask(task : Task): void {
    this.tasksService.deleteTask(task).then(result => {
      console.log(result);
    });
  }
}
