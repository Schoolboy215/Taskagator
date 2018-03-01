import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { UserFormComponent } from './user-form/user-form.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [];

  constructor(  private usersService: UsersService,
                private dialog: MatDialog,
                private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  newUserModal() {
    let dialogRef = this.dialog.open(UserFormComponent, {
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
        this.usersService.createUser(result).subscribe(serverResponse => {
          this.snackBar.open(serverResponse.toString(), "", {duration: 2000})
          this.loadUsers();
        });
    });
  }

}
