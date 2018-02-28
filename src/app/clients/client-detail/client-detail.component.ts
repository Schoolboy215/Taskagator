import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';
import { Client } from '../client';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  client : Client;
  editedClient : Client;
  constructor(  private clientService: ClientsService,
                private route: ActivatedRoute) { }

  ngOnInit() {
    this.getClient();
  }

  getClient(): void {
    this.clientService.getClient(this.route.snapshot.paramMap.get('id')).subscribe( response => {
      this.client = response as Client;
      this.editedClient = new Client(this.client.name);
    }, error => {
      this.client = null;
      console.log("An error happened");
    });
  }

  deleteClient(): void {
    this.clientService.deleteClient(this.client).subscribe( response => {
      this.client = null;
      console.log(response);
    });
  }

  updateClient(): void {
    this.clientService.updateClient(this.client, this.editedClient).subscribe( response => {
      this.client = response;
    });
  }

}
