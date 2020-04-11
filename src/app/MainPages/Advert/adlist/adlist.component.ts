import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-adlist',
  templateUrl: './adlist.component.html',
  styleUrls: ['./adlist.component.css']
})
export class AdlistComponent implements OnInit {
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


  constructor(private adservice: AdvertService, private catservice: CatService, private toast: ToastrService, private router: Router,
              private globals: GlobalsService) {
                this.queryOptions = new AdvertQueryOptions();
               }

  optionSelected(option: string) {
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
