import { Component, Inject } from '@angular/core';

import { Client } from '../client';
import { Form } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {

  constructor (
    public dialogRef : MatDialogRef<ClientFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
