import { Component, OnInit } from '@angular/core';
import { Clients } from '../clients';
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

  constructor(  private _fb: FormBuilder,
                private clientsService: ClientsService
  ) { }

  ngOnInit() {
    this.clientForm = this._fb.group({
      name: ['']
  });
  }

  save(model: Clients, isValid: boolean) {
    this.submitted = true;
    this.clientsService.createClient(model);
  }

}
