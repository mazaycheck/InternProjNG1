import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/Repositories/brand.service';
import { Brand } from 'src/app/Models/brand';
import { ToastrService } from 'ngx-toastr';
import { faEdit, faTrash, faSave, faBan } from '@fortawesome/free-solid-svg-icons';
import { CatService } from 'src/app/services/Repositories/cat.service';
import { Category } from 'src/app/Models/Category';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-brandList',
  templateUrl: './brandList.component.html',
  styleUrls: ['./brandList.component.css']
})
export class BrandListComponent implements OnInit {
  DeleteIcon = faTrash;
  EditIcon = faEdit;
  SaveIcon = faSave;
  CancelIcon = faBan;
  brands: Brand[] = [];
  categories: Category[] = [];
  addMode = false;
  temporaryBrand: Brand;
  constructor(private repo: BrandService, private catService: CatService, private toast: ToastrService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.repo.getAll().subscribe(
      response => {
        this.brands = response;
      },
      error => {
        this.toast.error(error);
      }
    );
    this.catService.getAll().subscribe(success => {
      this.categories = success;
    });
    this.temporaryBrand = new Brand();
    this.addMode = false;
  }

  update(brand: Brand) {
    this.turnUpdateOffOnAllEtries();
    brand.edit = true;
    this.temporaryBrand = new Brand();
    this.temporaryBrand.title = brand.title;
    this.temporaryBrand.categoryId = brand.categoryId;
    this.addMode = false;
  }
  delete(brand: Brand) {
    this.repo.delete(brand).subscribe(
      response => {
        this.toast.success('Deleted brand with id : ' + brand.title);
        this.refresh();
      },
      error => {
        this.toast.error('Could not delete brand: ' + brand.title);
      }
    );
  }

  save() {
    this.repo.create(this.temporaryBrand).subscribe(
      response => {
        this.refresh();
      },
      error => {
        this.toast.error(error);
      }
    );
  }

  cancel() {
    this.addMode = false;
    this.temporaryBrand = new Brand();
  }

  turnUpdateOffOnAllEtries() {
    this.brands.forEach(element => {
      element.edit = false;
    });
  }

  switchAddMode() {
    this.addMode = true;
    this.turnUpdateOffOnAllEtries();
    this.temporaryBrand = new Brand();
  }

  editSave(brand: Brand) {
    if (brand.title === this.temporaryBrand.title && brand.categoryId === this.temporaryBrand.categoryId) {
      brand.edit = false;
      this.toast.info('No changes');
      return null;
    } else if (brand.title.length === 0) {
      brand.edit = false;
      brand.title = this.temporaryBrand.title;
      this.toast.warning('Cannot save empty string');
      return null;
    } else {
      this.repo.update(brand).subscribe(
        response => {
          this.toast.success('Updated brand with id: ' + brand.brandId);
          this.refresh();
          brand.edit = false;
        },
        error => {
          this.toast.error('Could not update brand with id : ' + brand.brandId);
          brand.edit = false;
        }
    );
  } this.temporaryBrand = new Brand();
}
  editCancel(brand: Brand) {
    brand.edit = false;
    brand.title = this.temporaryBrand.title;
  }

  getCatName(brand: Brand) {
      return this.categories.find(x => x.categoryId == brand.categoryId).title;
  }

}
