import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientsService } from './clients.service';

import { ClientFormComponent } from './client-form/client-form.component';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any = [];

  constructor(  private clientsService: ClientsService,
                public dialog: MatDialog,
                public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientsService.getAllClients().then(clients => {
      this.clients = clients;
    });
  }

  newClientModal() {
    let dialogRef = this.dialog.open(ClientFormComponent, {
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
        this.clientsService.createClient(result).then(serverResponse => {
          this.snackBar.open(serverResponse.toString(), "", {duration: 2000})
          this.loadClients();
        });
    });
  }
}
