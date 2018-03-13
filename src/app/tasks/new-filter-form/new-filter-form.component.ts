import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { ClientsService } from '../../clients/clients.service';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-new-filter-form',
  templateUrl: './new-filter-form.component.html',
  styleUrls: ['./new-filter-form.component.css']
})
export class NewFilterFormComponent implements OnInit {

  clients : any = null;
  devs : any = null;

  constructor (
    public  dialogRef : MatDialogRef<NewFilterFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public  clientsService : ClientsService,
    public  usersService : UsersService){
  }

  ngOnInit() {
    this.clientsService.getAllClients().then( clients => {
      this.clients = clients;
    });
    this.usersService.getAllUsers().subscribe( users => {
      this.devs = users;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addClientFilter(client: any): void {
    this.data.filtering = "client";
    delete this.data.developer;
    this.dialogRef.close(this.data);
  }

  addDevFilter(): void {
    this.data.filtering = "developer";
    delete this.data.client;
    this.dialogRef.close(this.data);
  }

}
