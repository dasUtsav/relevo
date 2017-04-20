import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Pc} from './Pc';
import {Lab} from './Lab';

@Injectable()
export class BasicService {

    public token: string;

    constructor(private http: Http){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    baseUrl:string = 'http://localhost:3000/api';
    addPc(pc:Pc):Observable<boolean>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('auth', this.token);
        return this.http
                   .post(this.baseUrl + "/lab/addpc", JSON.stringify(pc), {headers})
                   .map((response: Response)=>{
                        console.log(response.json());
                        return true;
                   }).catch(this.handleError);


    }

    getLabs():Observable<Lab[]>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http
                   .get(this.baseUrl + "/lab/getlabs", {headers})
                   .map((response: Response)=>{
                        console.log(response.json());
                        return response.json();
                   }).catch(this.handleError);


    }
    getPcs(labNo:number):Observable<Pc[]>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http
                   .get(this.baseUrl + "/lab/getallpcs?labNo="+labNo, {headers})
                   .map((response: Response)=>{
                        response = response.json().map((resp)=>{
                            return{
                                pcNo: resp.pcNo
                            }
                        });
                        console.log(response);
                        
                        return response;
                   }).catch(this.handleError);


    }


    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
