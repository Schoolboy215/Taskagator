import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatMenuModule } from '@angular/material/';


import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsersService } from './users.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    component: WelcomeComponent
    //redirectTo: 'users',
    //pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,

    BrowserAnimationsModule,
    MatCardModule, MatButtonModule, MatMenuModule,

    RouterModule.forRoot(ROUTES)
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
