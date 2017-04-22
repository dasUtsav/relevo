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
  isLoadCalendar:boolean = false;
  stats:Object = {noOfLabs:0, totalPcs:0, totalIssues:0};
  calendarOptions:Object = {
        height: 'auto',
        fixedWeekCount : true,
        defaultDate: new Date(),
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [ {
            title: 'All Day Event',
            start: '2016-09-01'
          },
          {
            title: 'Long Event',
            start: '2016-09-07',
            end: '2016-09-10'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2016-09-09T16:00:00'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2016-09-16T16:00:00'
          },
          {
            title: 'Conference',
            start: '2016-09-11',
            end: '2016-09-13'
          },
          {
            title: 'Meeting',
            start: '2016-09-12T10:30:00',
            end: '2016-09-12T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2016-09-12T12:00:00'
          },
          {
            title: 'Meeting',
            start: '2016-09-12T14:30:00'
          },
          {
            title: 'Happy Hour',
            start: '2016-09-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2016-09-12T20:00:00'
          },
          {
            title: 'Birthday Party',
            start: '2016-09-13T07:00:00'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2016-09-28'
          }]
      }
  ngOnInit() {
    var date, dateString;
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
                        var history = this.pcs
                                          .reduce((historied, pc)=>{
                                            pc['history'].forEach((hist)=>{
                                              date = new Date(hist.date);
                                              dateString = date.toLocaleString();
                                              
                                              historied.push({
                                                start: dateString,
                                                date: date,
                                                title: pc.pcNo
                                              });
                                              
                                            });
                            return historied;
                        }, []).sort((a, b)=>{
                          if(a['date'] < b['date'])
                            return 1;
                          return -1;
                        });
                        console.log(history);
                        
                        
                        
                        this.limitedIssues = this.issuedPcs.slice(0,3);
                        this.calendarOptions['events'] = history;
                        this.isLoadCalendar = true;
                     });
      
     
      
      
  }

  
        

}
