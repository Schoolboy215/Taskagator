import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';
import { Client } from '../client';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { TasksComponent } from '../../tasks/tasks.component';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  client : Client;
  editedClient : Client;
  tasks : any = null;
  constructor(  private clientService: ClientsService,
                private route: ActivatedRoute,
                private router: Router,
                public snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.getClient().subscribe( result => {}, err => {}, () => {
      this.getTasks();
    });
  }

  getClient(): Observable<null> {
    return new Observable(observer => {
      this.clientService.getClient(this.route.snapshot.paramMap.get('name')).subscribe( response => {
        this.client = response as Client;
        this.editedClient = new Client(this.client.name);
        observer.complete();
      }, error => {
        this.client = null;
        this.snackBar.open(error,'',{duration: 3000});
        this.router.navigateByUrl('/clients');
        observer.error();
      });
    });
  }

  getTasks(): void {
    this.clientService.getTasks(this.client).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

}
