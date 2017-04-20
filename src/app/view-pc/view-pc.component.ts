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
  selector: 'app-view-pc',
  templateUrl: './view-pc.component.html',
  styleUrls: ['./view-pc.component.css']
})
export class ViewPcComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
