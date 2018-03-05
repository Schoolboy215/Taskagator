import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user : User = null;
  constructor(  private userService : UsersService,
                private router : Router,
                private route : ActivatedRoute,
                private snackBar : MatSnackBar) { }

  ngOnInit() {
    this.getUser().subscribe(result => {
      console.log("Get user has finished");
      console.log(result);
    });
  }

  getUser(): Observable<any> {
    return new Observable(observer => {
      this.userService.getUser(this.route.snapshot.paramMap.get('name')).subscribe( response => {
        this.user = response as User;
        observer.next(this.user);
        observer.complete();
      }, error => {
        this.user = null;
        observer.error(error);
        observer.complete();
        this.snackBar.open(error,'',{duration: 3000});
        this.router.navigateByUrl('/users');
      });
    });
  }

  getTasks(): void {
    this.userService.getTasks(this.user).subscribe( response => {
      console.log(response);
    });
  }

  addTask(): void {
    this.userService.addTask(this.user).subscribe( response => {
      console.log(response);
    })
  }
}
