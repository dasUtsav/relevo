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
  addStuff:string;
  ngOnInit() {
    console.log(this.pc);
  }


  submit(){
      for(var i = 1; i <= this.noOfPc; i++){
        this.pc.pcNo = this.labNo + "-" + i;
        this.basicService.addPc(this.pc)
        .subscribe(result => {
            console.log("Successfully added pc");
        }, error=>{
          console.log("error adding pc");

        });
      }
  }

  addPeripheral(){
    var temp = JSON.parse(JSON.stringify(this.pc));
    temp.currentConfig.peripherals[this.addStuff] = "";
    this.pc = temp;
    console.log(this.pc);
  }


  deleteComponent(event){
    var prop = event.target.innerText;
    var temp = JSON.parse(JSON.stringify(this.pc));
    delete temp.currentConfig.peripherals[prop];
    this.pc = temp;
    
  }

}
