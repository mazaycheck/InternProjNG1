import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-buttonupdate',
  templateUrl: './buttonupdate.component.html',
  styleUrls: ['./buttonupdate.component.css']
})
export class ButtonupdateComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onUpdateClicked = new EventEmitter();
  SeachIcon = faSearch;
  DeleteIcon = faTrash;
  EditIcon = faEdit;

  constructor() { }
  update($event) {
    this.onUpdateClicked.emit($event);
  }
  ngOnInit() {
  }

}
