import { Component, OnInit } from '@angular/core';
import { Clients } from '../clients';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public clientForm: FormGroup;
  public submitted: boolean;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.clientForm = this._fb.group({
      name: ['']
  });
  }

  save(model: Clients, isValid: boolean) {
    this.submitted = true;

    console.log(model, isValid);
  }

}
