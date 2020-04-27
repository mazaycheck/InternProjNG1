import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/Repositories/messages.service';
import { MessageForDetail } from 'src/app/Models/MessageForDetail';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: MessageForDetail[] = [];
  displayedColumnsInbox = ['Message', 'From', 'Date Recieved'];
  displayedColumnsOutbox = ['Message', 'To', 'Date Sent'];
  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.getUnreadMessages();
  }

  getUnreadMessages() {
    this.messageService.getUnreadMessages().subscribe(response => {
      return response;
    });
  }
  getInboxMessages() {
    this.messageService.getInboxMessages().subscribe(response => {
      return response;
    });
  }
  getOutboxMessages() {
    this.messageService.getOutboxMessages().subscribe(response => {
      return response;
    });
  }
}
