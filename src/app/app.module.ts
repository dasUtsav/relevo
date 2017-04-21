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
import {AuthGuard} from './auth.guard';
import {LoginGuard} from './login.guard';
import {AuthService} from './auth.service';
import {BasicService} from './basic.service';
import { ViewPcComponent } from './view-pc/view-pc.component';
import { AllLabsComponent } from './all-labs/all-labs.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [

{
  path: 'login',
  component: LoginComponent,
  canActivate:[LoginGuard]
},
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: AddPcComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'delete',
    component: DeletePcComponent,
  },
  {
    path: 'view',
    component: ViewPcComponent,
  },
  {
    path: 'update',
    component: UpdatePcComponent,
  },
  {
    path: 'issue',
    component: RaiseIssueComponent,
  },
  {
    path: 'all-labs',
    component: AllLabsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
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
    LoginComponent,
    ViewPcComponent,
    AllLabsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    BasicService,
    AuthGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
