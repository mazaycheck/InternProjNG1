import { Component, OnInit, Input } from '@angular/core';
import { Advert } from 'src/app/Models/Advert';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-adtiles',
  templateUrl: './adtiles.component.html',
  styleUrls: ['./adtiles.component.css']
})
export class AdtilesComponent implements OnInit {
  baseUrl: string;
  @Input() data: Advert[];
  constructor() {
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit() {
  }

}
