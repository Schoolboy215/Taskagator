import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatMenuModule, MatInputModule, MatFormFieldModule } from '@angular/material/';


import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsersService } from './users.service';
import { ClientsComponent } from './clients/clients.component';
import { ClientsService } from './clients.service';
import { ClientFormComponent } from './client-form/client-form.component';

// Define the routes
const ROUTES = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    WelcomeComponent,
    ClientsComponent,
    ClientFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,

    BrowserAnimationsModule,
    MatCardModule, MatButtonModule, MatMenuModule, MatInputModule, MatFormFieldModule,

    RouterModule.forRoot(ROUTES)
  ],
  providers: [UsersService, ClientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
