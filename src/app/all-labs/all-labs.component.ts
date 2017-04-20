import { Component, OnInit } from '@angular/core';
import {BasicService} from '../basic.service';
import {Lab} from '../Lab';

@Component({
  selector: 'app-all-labs',
  templateUrl: './all-labs.component.html',
  styleUrls: ['./all-labs.component.css']
})
export class AllLabsComponent implements OnInit {
  labs: Lab[] = [];
  labsLoaded:boolean = false;
  constructor(private basicservice:BasicService) { }
  
  ngOnInit() {
        this.basicservice.getLabs()
                          .subscribe(result => {
                            this.labs = result.map(lab=>{
                                          return lab;
                                        });
                            this.labsLoaded = true;
                            console.log(this.labs);                                        
                          })
    }

}
