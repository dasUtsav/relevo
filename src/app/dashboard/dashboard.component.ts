import { Component, OnInit } from '@angular/core';
import {BasicService} from '../basic.service';
import {Pc} from "../Pc";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private basicService: BasicService) { }
  pcs:Pc[];
  labNo:number = JSON.parse(localStorage.getItem('currentUser')).labNo
  issuedPcs:Object[];
  limitedIssues:Object[];
  stats:Object = {noOfLabs:0, totalPcs:0, totalIssues:0};
  calendarOptions:Object = {
        height: 'auto',
        fixedWeekCount : true,
        defaultDate: '2016-09-12',
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: []
      }
  ngOnInit() {
    this.basicService.getPcs(this.labNo)
                     .subscribe((result)=>{
                        this.pcs = result;
                        this.issuedPcs = this.pcs.filter((pc)=>{
                          return pc['issues'].length !== 0
                        }).reduce((issuedArr, pc)=>{
                          pc['issues'].forEach((issue)=>{
                            issue.pcNo = pc.pcNo;
                            issuedArr.push(issue);
                          })
                          return issuedArr;
                        }, []).sort((a, b)=>{
                          if(a['date'] < b['date'])
                            return 1;
                          return -1;
                        });
                        this.limitedIssues = this.issuedPcs.slice(0,3)
                        console.log(this.limitedIssues);
                     });
      
     
      
      
  }

  
        

}
