import { Component, OnInit, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-childofhome',
  templateUrl: './childofhome.component.html',
  styleUrls: ['./childofhome.component.css']
})
export class ChildofhomeComponent implements OnInit {

  @ContentChild('h3insidechildfromparent', { static: false})
  contentFromParent: ElementRef;

  public counter = 0;

  click() {
    console.log(this.contentFromParent.nativeElement.textContent);
  }

  constructor() { }

  ngOnInit() {
  }

}
