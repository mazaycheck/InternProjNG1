import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdvertService } from 'src/app/services/advert-service/advert.service';
import { Router } from '@angular/router';
import { CatService } from 'src/app/services/advert-service/cat.service';
import { Category } from 'src/app/Models/Category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adcreate',
  templateUrl: './adcreate.component.html',
  styleUrls: ['./adcreate.component.css']
})
export class AdcreateComponent implements OnInit {
  advertForm: FormGroup;
  categories: Category[];
  selectedCategory: string;
  constructor(private service: AdvertService, private router: Router, private catservice: CatService, private toast: ToastrService) { }

  ngOnInit() {
    this.advertForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(0),
      categoryId: new FormControl(0),
    });
    this.getCats();
  }

  getCats() {
    this.catservice.getAll().subscribe(
      response => {
        this.categories = response;
      }, error => {
        this.toast.error(error);
      }
    );
  }

  optionSelected(option: string) {
    return this.selectedCategory === option;
  }

  selectChanged($event) {
    console.log($event.target.value);
    this.selectedCategory = $event.target.value;
  }

  submit() {
    const values = this.advertForm.value;
    values.userId = 1;
    console.log(values);
    this.service.createAd(values).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/ads');
    }, error => {
      this.toast.error(error);
    }
    );
  }

}
