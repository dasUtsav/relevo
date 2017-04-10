import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {User} from '../user';
import { Router } from '@angular/router';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = {username: "", password: ""};
  private form: FormGroup;
  private formControl: Object;
  private error:string;
  constructor(private authService: AuthService, private router:Router, private _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({
      username: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]]
    });
    this.formControl = this.form.controls;
  }

  login(){
    this.authService.login(this.user)
        .subscribe(result => {
            console.log("Successfully logged in");
            this.router.navigate(['/add']);
        }, error=>{
          console.log("Username or password is incorrect");
          this.error = "Username or password is incorrect";
        })
  }

}
