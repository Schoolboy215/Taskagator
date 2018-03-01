import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Client } from './client';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClientsService {

  constructor(  private http: Http,
                private httpClient: HttpClient ) { }

  getAllClients() {
    return new Promise((resolve, reject) => {
      this.http.get('/api/clients').subscribe(response => {
        resolve(response.json());
      });
    });
  }

  createClient(_name : string) {
    return new Promise((resolve, reject) => {
      this.http.post('/api/clients/create', {"name" : _name})
      .subscribe(response => {
        resolve(response.json());
      });
    });
  }

  getClient(_name: string):Observable<Client> {
    return this.httpClient.get<Client>('/api/clients/'+_name)
    .map((response: Client) => {
      return response;
    })
    .catch((error: any) => {
      return Observable.throw(new Error(error.error));
    });
  }

  deleteClient(_client: Client):Observable<any> {
    return this.httpClient.delete('/api/clients/' + _client.name);
  }

  updateClient(_client: Client, _editedClient: Client):Observable<Client> {
    return this.httpClient.put<Client>('/api/clients/'+_client.name, _editedClient);
  }

  private handleError() {
    return (error: any): Observable<any> => {
      return;
    };

  }
}
