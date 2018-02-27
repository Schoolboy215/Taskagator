import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public clientForm: FormGroup;
  public submitted: boolean;

  clients: any = [];

  constructor(  private _fb: FormBuilder,
                private clientsService: ClientsService
  ) { }

  ngOnInit() {
    this.clientForm = this._fb.group({
      name: ['']
    });

    this.clientsService.getAllClients().subscribe(clients => {
      this.clients = clients;
    });

  }

  save(model: Client, isValid: boolean) {
    this.submitted = true;
    this.clientsService.createClient(model);
  }

}
