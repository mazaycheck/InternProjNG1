import { Component, OnInit, Input } from '@angular/core';
import { MessageForDetail } from 'src/app/Models/MessageForDetail';

@Component({
  selector: 'app-messagesTable',
  templateUrl: './messagesTable.component.html',
  styleUrls: ['./messagesTable.component.css']
})
export class MessagesTableComponent implements OnInit {

  @Input() dataColumns: string[] = [];
  @Input() dataSet: MessageForDetail[] = [];
  constructor() { }

  ngOnInit() {
  }

}
