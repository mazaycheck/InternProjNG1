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
  SeachIcon = faSearch;
  DeleteIcon = faTrash;
  EditIcon = faEdit;
  constructor(private service: CatService) { }

  categories: Category[];

  hid = false;
  addMode = false;

  switch($event) {
    // this.addMode = false;
    this.refresh();
    this.addMode = false;

  }
  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.service.getAll().subscribe(
      response => {
        this.categories = response;
      }
    );
  }

  removeAd(categoryId: number) {

  }


  switchAddMode() {
    this.addMode = true;
  }

  resetCats($event) {
    console.log($event);
    this.hid = false;
  }
}
