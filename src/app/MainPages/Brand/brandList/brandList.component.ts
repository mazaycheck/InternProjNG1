import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/Repositories/brand.service';
import { ToastrService } from 'ngx-toastr';
import { BrandCategoryService } from 'src/app/services/Repositories/brandCategory.service';
import { CatService } from 'src/app/services/Repositories/cat.service';
import { Brand } from 'src/app/Models/brand';
import { BrandCategory } from 'src/app/Models/BrandCategory';
import { Observable, merge, empty, concat } from 'rxjs';
import { mergeAll, concatAll } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-brandList',
  templateUrl: './brandList.component.html',
  styleUrls: ['./brandList.component.css']
})
export class BrandListComponent implements OnInit {


  service: any;
  brandList = [];
  temproraryEntity: { title: '', edit: boolean, categoriesSelected: {} };
  addMode = false;
  displayedColumns = ['title', 'categories', 'action'];
  newEntity = { title: '' };
  userCategoriesSelected: {} = {};
  brandCategoryFromDb: { brandId: number, categoryId: number, brandCategoryId: number }[] = [];
  allBrandCategories: BrandCategory[] = [];
  categoriesOfABrand: string[] = [];
  catsCheckBoxDisabled = true;

  // brandCategory: {brandId: number, categoryId: number}[] = [];
  brandCategory: number[] = [];
  allCategories = [];

  constructor(private toastr: ToastrService, brandService: BrandService,
    private brandCategoryService: BrandCategoryService, private categoryService: CatService) { this.service = brandService; }

  ngOnInit() {
    this.getCategories();
    this.refresh();
  }


  getAllBrandCategories() {
    this.brandCategoryService.getAll().subscribe(response => {
      this.allBrandCategories = response;
    });
  }

  getCategoryNameById(categoryId: number) {
    return this.allCategories.find(x => x.categoryId === categoryId).title;
  }

  filterAllBrandCategories(brandId: number) {
    return this.allBrandCategories.filter(x => x.brandId === brandId);
  }

  getCategoriesOfBrand(brandId: number) {
    this.catsCheckBoxDisabled = true;
    this.brandCategoryService.getAll({ brandId, categoryId: 0 }).subscribe(
      response => {
        // this.brandCategory = response.map(x => x.categoryId);
        this.brandCategoryFromDb = response;
        this.brandCategory = this.brandCategoryFromDb.map(x => x.categoryId);
        this.userCategoriesSelected = {};
        this.brandCategory.forEach(element => {
          this.userCategoriesSelected[element] = true;
        });
        this.catsCheckBoxDisabled = false;
      });
  }

  getCategories() {
    this.categoryService.getAll().subscribe(
      response => {
        this.allCategories = response;
      }
    );
  }

  getBrands() {
    this.service.getAll().subscribe(
      response => {
        this.brandList = response;
      }
    );
  }

  getCategoriesTitlesOfABrand(brandId: number) {
    
    const categoryIds = this.filterAllBrandCategories(brandId).map(x => x.categoryId);
    const categoryTitles = categoryIds.map(categoryId => this.getCategoryNameById(categoryId));
    return categoryTitles;
  }

  refresh() {
    this.getAllBrandCategories();
    this.getBrands();
    this.resetTempEntity();
    this.addMode = false;
  }

  update(entity) {
    this.turnUpdateOffOnAllEtries();
    entity.edit = true;
    this.resetTempEntity();
    this.temproraryEntity.title = entity.title;
    this.temproraryEntity.categoriesSelected = this.userCategoriesSelected;
    this.addMode = false;
  }
  delete(entity) {
    this.service.delete(entity).subscribe(
      response => {
        this.toastr.success('Deleted entity  : ' + entity.title);
        this.refresh();
      },
      error => {
        this.toastr.error('Could not delete entity: ' + entity.title);
      }
    );
  }

  createNewEntity() {
    this.service.create(this.newEntity).subscribe(
      response => {
        this.refresh();
        this.resetNewEntity();
      },
      error => {
        this.toastr.error(error);
      }
    );
  }

  cancel() {
    this.addMode = false;
    this.resetTempEntity();
  }



  turnUpdateOffOnAllEtries() {
    this.brandList.forEach(element => {
      element.edit = false;
    });
  }

  switchAddMode() {
    this.addMode = true;
    this.turnUpdateOffOnAllEtries();
    this.resetTempEntity();
  }


  compareInputCategoriesArrays(entity) {
    const listOfUserSelectedCategories = [];
    let httpCalls = [];

    for (const element in this.userCategoriesSelected) {
      if (this.userCategoriesSelected[element] === true) {
        listOfUserSelectedCategories.push(parseInt(element, 10));
      }
    }

    listOfUserSelectedCategories.forEach(element => {
      if (!this.brandCategory.find(x => x === element)) {
        const newBrandCategory = new BrandCategory();
        newBrandCategory.brandId = entity.brandId;
        newBrandCategory.categoryId = element;
        httpCalls.push(this.brandCategoryService.create(newBrandCategory));
      }
    }
    );


    this.brandCategory.forEach(element => {
      if (!listOfUserSelectedCategories.find(x => x === element)) {
        const toDelete = this.brandCategoryFromDb.find(x => x.categoryId === element);
        httpCalls.push(this.brandCategoryService.delete(toDelete));
      }
    }
    );

    let mergedHttpObserver = merge(...httpCalls);
    console.log(mergedHttpObserver);
    mergedHttpObserver.subscribe((s) => { }, (e) => { }, () => {
      this.getAllBrandCategories();
      
    });
  }

  editSave(entity) {

    this.compareInputCategoriesArrays(entity);

    if (entity.title === this.temproraryEntity.title) {
      entity.edit = false;
      this.toastr.info('No changes');
      return null;
    } else if (entity.title.length === 0) {
      entity.edit = false;
      entity.title = this.temproraryEntity.title;
      this.toastr.warning('Cannot save empty string');
      return null;
    } else {
      this.service.update(entity).subscribe(
        response => {
          this.toastr.success('Updated entity  ' + entity.title);
          this.refresh();
          entity.edit = false;
        },
        error => {
          this.toastr.error('Could not update entity : ' + entity.title);
          entity.edit = false;
        }
      );
      this.catsCheckBoxDisabled = true;
    } this.resetTempEntity();
  }


  editCancel(entity) {
    entity.edit = false;
    entity.title = this.temproraryEntity.title;
    this.catsCheckBoxDisabled = true;
  }

  resetTempEntity() {
    this.temproraryEntity = { title: '', edit: false, categoriesSelected: {} };
  }

  resetNewEntity() {
    this.newEntity = { title: '' };
  }


}
