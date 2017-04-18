import { Component, OnInit } from '@angular/core';
import {Pc} from "../Pc";
import {
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import {BasicService} from '../basic.service';

@Component({
  selector: 'app-add-pc',
  templateUrl: './add-pc.component.html',
  styleUrls: ['./add-pc.component.css']

})
export class AddPcComponent implements OnInit {
  labNo:Number = JSON.parse(localStorage.getItem('currentUser')).labNo;
  pc:Pc = {labNo: this.labNo, pcNo: "", currentConfig: {peripherals:{}}};
  noOfPc:Number;
  constructor(private basicService:BasicService) {}

  ngOnInit() {
    console.log(this.pc);

  }
  submit(){
    console.log(this.pc);
    
    this.basicService.addPc(this.pc)
        .subscribe(result => {
            console.log("Successfully added pc");
        }, error=>{
          console.log("error adding pc");
          
        });
    
  }

}
