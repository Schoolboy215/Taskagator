import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { ClientsService } from '../../clients/clients.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  clients : any = null;
  
  constructor (
    public  dialogRef : MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public  clientsService : ClientsService){
  }

  ngOnInit() {
    this.clientsService.getAllClients().then( clients => {
      this.clients = clients;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
