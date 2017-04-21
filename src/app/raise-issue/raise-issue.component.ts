import { Component, OnInit } from '@angular/core';
import {BasicService} from '../basic.service';

@Component({
  selector: 'app-raise-issue',
  templateUrl: './raise-issue.component.html',
  styleUrls: ['./raise-issue.component.css']
})
export class RaiseIssueComponent implements OnInit {

  labNo:Number = JSON.parse(localStorage.getItem('currentUser')).labNo;
  issue:Object = {labNo: this.labNo};
  constructor(private basicService: BasicService) { }

  ngOnInit() {
    
  }

  submitIssue(){
      this.basicService.addIssue(this.issue)
                       .subscribe((ret)=>{
                         console.log('issue added successfully');
                       })
  }

}
