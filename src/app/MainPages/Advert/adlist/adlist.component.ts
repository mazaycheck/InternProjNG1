import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Advert } from '../../../Models/Advert';
import { AdvertService } from '../../../services/Repositories/advert.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/Category';
import { CatService } from 'src/app/services/Repositories/cat.service';
import { faSearch, faTrash, faEdit, faList, faTh } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/services/global/globals.service';
import { AdvertQueryOptions } from 'src/app/Models/AdvertQueryOptions';
import { PageObject } from 'src/app/Models/PageObject';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-adlist',
  templateUrl: './adlist.component.html',
  styleUrls: ['./adlist.component.css']
})
export class AdlistComponent implements OnInit, OnChanges {
  SeachIcon = faSearch;
  DeleteIcon = faTrash;
  EditIcon = faEdit;
  ListIcon = faList;
  LargeIcon = faTh;
  advertisements: Advert[] = [];
  categories: Category[] = [];
  queryOptions: AdvertQueryOptions;
  presentationMode: string;
  basePhotoUrl = 'http://localhost:5000/images/';
  pageObject: PageObject;
  displayedColumns: string[] = ['title', 'description', 'price', 'category', 'town', 'date'];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  //pageEvent: PageEvent;
  
  private _optionSelected: any;
  public get optionSelected() { return this._optionSelected; }
  public set optionSelected(newValue) {
  this.queryOptions.category = newValue;
  this._optionSelected = newValue;
  this.refresh();
}

  constructor(private adservice: AdvertService, private catservice: CatService, private toast: ToastrService, private router: Router,
              private globals: GlobalsService) {
                this.queryOptions = new AdvertQueryOptions();
               }


  ngOnChanges(changes: SimpleChanges): void {
  // tslint:disable-next-line: forin
    if (changes.optionSelected) {
      this.queryOptions.category = this.optionSelected;
      this.refresh();
    }
  }

  onOptionSelected(option: string) {
    return option === this.queryOptions?.category;
  }

  switchPresentationMode(mode: string) {
    this.globals.displayAdvertStyle = mode;
    this.presentationMode = mode;
  }
  ngOnInit() {
    this.presentationMode = this.globals.displayAdvertStyle;
    this.refresh();
    this.catservice.getAll().subscribe(
      response => {
        this.categories = response;
        // this.listData = new MatTableDataSource(response);
      }, error => {
        this.toast.error(error);
      }
    );
  }

  queryChanged($event) {
    this.refresh();

  }

  goToDetails(id: number) {
    this.router.navigateByUrl(`/ads/details/${id}`);
  }
  selectChanged($event) {
    console.log($event);
    this.queryOptions.category = $event.target.value;
    this.refresh();
  }
  refresh() {
    this.adservice.getAds(this.queryOptions).subscribe(
      response => {
        this.pageObject = response;
        this.advertisements = this.pageObject.pageData;
      }, error => {
        this.toast.error(error);
      }
    );
  }

  removeAd(id: number) {
    console.log('Delete');
    this.adservice.deleteAd(id).subscribe(response => {
      this.toast.warning(`Removed advert with id ${id}`);
      this.refresh();
    }, error => {
      this.toast.error(`Could not delete advert`);
    }
    );
  }

  pageClicked(pageNumber: number) {
    this.queryOptions.pageNumber = pageNumber;
    this.refresh();
  }



  

}
