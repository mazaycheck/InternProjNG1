import { Component, OnInit } from '@angular/core';
import { TownService } from 'src/app/services/Repositories/town.service';
import { Town } from 'src/app/Models/Town';
import { ToastrService } from 'ngx-toastr';
import { faEdit, faTrash, faSave, faBan } from '@fortawesome/free-solid-svg-icons';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-townList',
  templateUrl: './townList.component.html',
  styleUrls: ['./townList.component.css']
})
export class TownListComponent implements OnInit {

  constructor(public townService: TownService) { }

  ngOnInit() {

  }

}
