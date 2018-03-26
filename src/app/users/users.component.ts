import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user';
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
      data: { name: '',
              updating: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
        this.usersService.createUser(result.name).subscribe(serverResponse => {
          if (serverResponse)
          {
            this.snackBar.open("User " + serverResponse.name + " was added.", "", {duration: 2000})
            this.loadUsers();
          }
        }, error => {
          this.snackBar.open(error, "", {duration: 2000})
            this.loadUsers();
        });
    });
  }
  updateStatusModal(_user : User) {
    let dialogRef = this.dialog.open(UserFormComponent, {
      data: { name: _user.name,
              user: _user,
              updating: 'status' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
        result.user.status = result.status;
        this.usersService.updateUser(result.user, result.user).subscribe(serverResponse => {
          if (serverResponse)
          {
            this.snackBar.open("User " + serverResponse.name + " was updated.", "", {duration: 2000})
            this.loadUsers();
          }
        });
    });
  }
  updateBusyUntilModal(_user : User) {
    let dialogRef = this.dialog.open(UserFormComponent, {
      data: { name: _user.name,
              user: _user,
              updating: 'busyUntil' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
        result.user.busyUntilDate = result.busyUntilDate;
        result.user.busyUntilTime = result.busyUntilTime;
        this.usersService.updateUser(result.user, result.user).subscribe(serverResponse => {
          if (serverResponse)
          {
            this.snackBar.open("User " + serverResponse.name + " was updated.", "", {duration: 2000})
            this.loadUsers();
          }
        });
    });
  }
  deleteUser(_user : User) {
    this.usersService.deleteUser(_user).subscribe( serverResponse => {
      this.snackBar.open(serverResponse, "", {duration: 2000})
      this.loadUsers();
    });
  }
}
