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
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pc',
  templateUrl: './add-pc.component.html',
  styleUrls: ['./add-pc.component.css']
})

export class AddPcComponent implements OnInit {
  labNo:Number = JSON.parse(localStorage.getItem('currentUser')).labNo;
  pc:Pc = {labNo: this.labNo, pcNo: "", currentConfig: {peripherals:{keyboard:"",mouse:""}}};
  noOfPc:Number;
  constructor(private basicService:BasicService, private _fb: FormBuilder) {}
  addStuff:string;
  private form: FormGroup;
  private formControl: Object;
  ngOnInit() {
    this.form = this._fb.group({
      noOfPcs: ['', [<any>Validators.required]],
      memory: ['', [<any>Validators.required]],
      graphics: ['', [<any>Validators.required]],
      processor: ['', [<any>Validators.required]],
      keyboard: ['', [<any>Validators.required]],
      mouse: ['', [<any>Validators.required]]
    });
    this.formControl = this.form.controls;
    
  }

  submit(){
      for(let i = 1; i <= this.noOfPc; i++){
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
    this.formControl[this.addStuff] = new FormControl('',Validators.required);
    this.pc = temp;
    
  }

  deleteComponent(event){
    var prop = event.target.innerText;
    var temp = JSON.parse(JSON.stringify(this.pc));
    delete temp.currentConfig.peripherals[prop];
    delete this.formControl[prop];
    this.pc = temp;
    

  }

}
