import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {User} from './user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  public token: string;
  baseUrl:string = 'http://localhost:3000/api'
  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }
  login(user:User):Observable<boolean>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
              .post(this.baseUrl + "/login",JSON.stringify(user), {headers})
              .map((response: Response)=>{
                let token = response.json() && response.json().token;
                if(token){
                  this.token = token;
                  localStorage.setItem('currentUser',JSON.stringify({name:user.username, token:token,labNo:response.json().labNo}));
                  console.log(localStorage.getItem('currentUser'));
                  return true;
                }else{
                  return false;
                }
              }).catch(this.handleError);
  }
  public handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  logout():Promise<boolean>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('auth', this.token);
    console.log(headers);
    return this.http
        .delete(this.baseUrl + '/logout', {headers})
        .toPromise()
        .then(()=>{
          this.token = null;
          localStorage.removeItem('currentUser');
          return true;
        })
        .catch(this.handleError);

  }


}
