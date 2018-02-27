import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Client } from './client';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientsService {

  constructor(private http: Http) { }

  getAllClients() {
    return this.http.get('/api/clients')
      .map(res => res.json());
  }

  createClient(_client : Client) {
    this.http.post('/api/clients/create', {"name" : _client.name})
      .subscribe(response => {
        return response;
      });
  }
}
