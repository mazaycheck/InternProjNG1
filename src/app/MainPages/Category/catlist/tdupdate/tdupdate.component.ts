import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/Models/Category';
import { CatService } from 'src/app/services/Repositories/cat.service';
import { ToastrService } from 'ngx-toastr';
import { faSearch, faTrash, faEdit, faSave, faBan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tdupdate',
  templateUrl: './tdupdate.component.html',
  styleUrls: ['./tdupdate.component.css']
})
export class TdupdateComponent implements OnInit {
@Input() cat: Category;
@Output() resetAllCats = new EventEmitter();
@Input() hidden: boolean;
// hidden = false;
tempDataForCat: string;
SeachIcon = faSearch;
DeleteIcon = faTrash;
EditIcon = faEdit;
SaveIcon = faSave;
CancelIcon = faBan;


constructor(private repo: CatService, private toast: ToastrService) { }

ngOnInit() {

}
switch($event) {
  // this.resetAllCats.emit($event);
  this.hidden = !this.hidden;
  this.tempDataForCat = this.cat.title;
}

cancel() {
  this.hidden = !this.hidden;
  this.cat.title = this.tempDataForCat;
}


save() {
  if (this.cat.title === this.tempDataForCat) {
    this.toast.warning('No changes');
    this.hidden = false;
    return null;
  }
  this.repo.update(this.cat).subscribe(
    success => {
      this.toast.success(`Category with id: ${this.cat.categoryId} updated`);
      this.hidden = false;
    }, error => {
      this.toast.error(error);
    }
  );
}

delete() {
  this.repo.delete(this.cat).subscribe(resposnse => {
    this.toast.warning(`Category with id : ${this.cat.categoryId} removed`);
    this.resetAllCats.emit();
  }, error => {
    this.toast.error(`Could not remove Category with id : ${this.cat.categoryId}`);
  }
  );
}


}
