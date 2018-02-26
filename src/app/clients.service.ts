import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientsService {

  constructor(private http: Http) { }

  getAllClients() {
    return this.http.get('/api/clients')
      .map(res => res.json());
  }

  createClient(name) {
    return this.http.post('/api/users/clients', {"name" : name});
  }
}
