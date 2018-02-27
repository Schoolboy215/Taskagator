import { Component } from '@angular/core';

import { Client } from '../client';
import { Form }from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {

  submitted = false;

  onSubmit() { this.submitted = true; }

}
