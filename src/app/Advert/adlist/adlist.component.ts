import { Component, OnInit } from '@angular/core';
import { Advert } from '../../Models/Advert';
import { AdvertService} from '../../services/advert-service/advert.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/Category';
import { CatService } from 'src/app/services/advert-service/cat.service';
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-adlist',
  templateUrl: './adlist.component.html',
  styleUrls: ['./adlist.component.css']
})
export class AdlistComponent implements OnInit {
  SeachIcon = faSearch;
  DeleteIcon = faTrash;
  EditIcon = faEdit;
  advertisements: Advert[];
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;

  constructor(private adservice: AdvertService, private catservice: CatService, private toast: ToastrService) { }

  optionSelected(option: string) {
    return option === this.selectedCategory;
  }

  ngOnInit() {
    this.selectedCategory = '';
    this.searchQuery = '';
    this.refresh();
    this.catservice.getAll().subscribe(
      response => {
        this.categories = response;
      }, error => {
        this.toast.error(error);
      }
    );
  }

  queryChange($event) {
    this.refresh();

  }
  selectChanged($event) {
    console.log($event.target.value);
    this.selectedCategory = $event.target.value;
    this.refresh();
  }
  refresh() {
    this.adservice.getAds(this.selectedCategory, this.searchQuery).subscribe(
      response => {
        this.advertisements = response;
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

}
