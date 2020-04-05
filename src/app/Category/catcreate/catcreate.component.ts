import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/Models/Category';
import { CatService } from 'src/app/services/advert-service/cat.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-catcreate',
  templateUrl: './catcreate.component.html',
  styleUrls: ['./catcreate.component.css']
})
export class CatcreateComponent implements OnInit {

  @Input() show: boolean;
  @Output() unShow = new EventEmitter();
  cat: Category;
  constructor(private repo: CatService, private toast: ToastrService) { }

  ngOnInit() {
    this.cat = new Category();
  }

  cancel() {
    this.show = false;
    this.unShow.emit();
  }

  save() {
    this.repo.create(this.cat).subscribe(
      success => {
        this.toast.success(`Category with id: ${success.categoryId} saved`);
        this.show = false;
        this.unShow.emit();
      }, error => {
        this.toast.error(error);
      }
    );
  }

}
