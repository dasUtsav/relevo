import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AddPcComponent } from './add-pc/add-pc.component';
import { DeletePcComponent } from './delete-pc/delete-pc.component';
import { UpdatePcComponent } from './update-pc/update-pc.component';
import { LoginComponent } from './login/login.component';

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
  }

];

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    AddPcComponent,
    DeletePcComponent,
    UpdatePcComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
