import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AddPcComponent } from './add-pc/add-pc.component';
import { DeletePcComponent } from './delete-pc/delete-pc.component';
import { UpdatePcComponent } from './update-pc/update-pc.component';
import { RaiseIssueComponent } from './raise-issue/raise-issue.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth.service';

const appRoutes: Routes = [

{
  path: 'login',
  component: LoginComponent,
},
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: AddPcComponent,
  },
  {
    path: 'delete',
    component: DeletePcComponent,
  },
  {
    path: 'update',
    component: UpdatePcComponent,
  },
  {
    path: 'issue',
    component: RaiseIssueComponent,
  }

];

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    AddPcComponent,
    DeletePcComponent,
    RaiseIssueComponent,
    UpdatePcComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
