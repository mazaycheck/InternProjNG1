import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/Repositories/user.service';
import { UserForDetail } from 'src/app/Models/UserForDetail';

@Component({
  selector: 'app-userInfo',
  templateUrl: './userInfo.component.html',
  styleUrls: ['./userInfo.component.css']
})
export class UserInfoComponent implements OnInit {
  @Input() userId: number;
  user: UserForDetail;
  newMessage: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getById(this.userId).subscribe(response => {
      this.user = response;
    });
  }

  sendMessage() {

  }

  cancel() {
    this.newMessage = '';
  }

}
