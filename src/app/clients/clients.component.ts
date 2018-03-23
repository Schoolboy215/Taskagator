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
    this.clientsService.getAllClients().then((clients : any) => {
      for (let client of clients) {
        var _client: Client = new Client(client['name']);
        this.clientsService.getTasks(_client).subscribe(result => {
          client['tasks'] = result;
        });
      }
      this.clients = clients;
    });
  }
  deleteClient(client: Client) {
    this.clientsService.deleteClient(client).subscribe(result => {
      this.loadClients();
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
