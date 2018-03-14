import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {  MatCardModule, MatButtonModule, MatMenuModule, MatInputModule,
          MatFormFieldModule, MatDialogModule, MatSnackBarModule, MatListModule,
          MatDividerModule, MatExpansionModule, MatSelectModule,
          MatChipsModule, MatIconModule } from '@angular/material/';


import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsersService } from './users/users.service';
import { ClientsComponent } from './clients/clients.component';
import { ClientsService } from './clients/clients.service';
import { ClientFormComponent } from './clients/client-form/client-form.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TasksService } from './tasks/tasks.service';
import { NewFilterFormComponent } from './tasks/new-filter-form/new-filter-form.component';

// Define the routes
const ROUTES = [
  { path: '', component: WelcomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:name', component: UserDetailComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/:name', component: ClientDetailComponent },
  { path: 'tasks', component: TasksComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    WelcomeComponent,
    ClientsComponent,
    ClientFormComponent,
    ClientDetailComponent,
    UserDetailComponent,
    UserFormComponent,
    TasksComponent,
    TaskFormComponent,
    TaskDetailComponent,
    NewFilterFormComponent
  ],
  entryComponents: [
    ClientFormComponent,
    UserFormComponent,
    TaskFormComponent,
    NewFilterFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    BrowserAnimationsModule,
    MatCardModule, MatButtonModule, MatMenuModule, MatInputModule,
    MatFormFieldModule, MatDialogModule, MatSnackBarModule, MatListModule,
    MatDividerModule, MatExpansionModule, MatSelectModule,
    MatChipsModule, MatIconModule,

    RouterModule.forRoot(ROUTES)
  ],
  providers: [UsersService, ClientsService, TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
