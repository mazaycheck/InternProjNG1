import { Component, OnInit } from '@angular/core';
import { CatService } from 'src/app/services/Repositories/cat.service';
import { Category } from 'src/app/Models/Category';
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-catlist',
  templateUrl: './catlist.component.html',
  styleUrls: ['./catlist.component.css']
})
export class CatlistComponent implements OnInit {

  constructor(public catService: CatService) { }
  ngOnInit() {

  }

}
