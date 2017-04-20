import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-view-pc',
  templateUrl: './view-pc.component.html',
  styleUrls: ['./view-pc.component.css']
})
export class ViewPcComponent implements OnInit {

  labNo:number;
  pcs:Pc[];
  constructor(private route: ActivatedRoute, private basicservice:BasicService) { }

  ngOnInit() {
    this.labNo = this.route.params['value']['labNo'];
    this.basicservice.getPcs(this.labNo)
                     .subscribe((result)=>{
                        this.pcs = result;
                     });
  }

}
