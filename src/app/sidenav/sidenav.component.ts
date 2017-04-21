import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  labNo:Number;
  userName: string;
  constructor(private authService: AuthService, private router:Router) { 
    this.labNo = JSON.parse(localStorage.getItem('currentUser')).labNo;
    this.userName = JSON.parse(localStorage.getItem('currentUser')).name;

  }

  ngOnInit() {
  }
  logout(){
    this.authService.logout().then(()=>{
        this.router.navigate(['/login']);
    });

  }

}
