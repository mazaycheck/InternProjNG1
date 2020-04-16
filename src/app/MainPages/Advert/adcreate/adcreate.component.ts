import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdvertService } from 'src/app/services/Repositories/advert.service';
import { Router } from '@angular/router';
import { CatService } from 'src/app/services/Repositories/cat.service';
import { Category } from 'src/app/Models/Category';
import { ToastrService } from 'ngx-toastr';
import { Town } from 'src/app/Models/Town';
import { TownService } from 'src/app/services/Repositories/town.service';

@Component({
  selector: 'app-adcreate',
  templateUrl: './adcreate.component.html',
  styleUrls: ['./adcreate.component.css']
})
export class AdcreateComponent implements OnInit {
  advertForm: FormGroup;
  categories: Category[] = [];
  towns: Town[] = [];
  selectedCategory: Category;
  numberOfFiles: number;
  imgUrls = new Array<string>(this.numberOfFiles);
  pictures: string[] = [];
  formData: FormData;
  constructor(private service: AdvertService, private router: Router, private catservice: CatService,
              private toast: ToastrService, private townservice: TownService) { }

  ngOnInit() {
    this.advertForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(0),
      categoryId: new FormControl(0),
      photo: new FormControl(),
      brandId: new FormControl(0),
      townId: new FormControl(0),
    });
    this.numberOfFiles = 3;
    this.getCats();
    this.getTowns();
    for (let i = 0; i < this.numberOfFiles; i++) {
      this.imgUrls[i] = '/assets/images/random.jpg';
    }
    this.formData = new FormData();
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

  getTowns() {
    this.townservice.getAll().subscribe(
      response => {
        this.towns = response;
      }, error => {
        this.toast.error(error);
      }
    );
  }

  onFileAttach($event) {

    for (let i = 0; i < $event.target.files.length; i++) {
      const file = $event.target.files[i];
      this.pictures.push(file);
      // Asp.net core has to accept [FromForm] MyAnnoucementDto
      // MyAnnoucementDto has to have List<IFormFile>
      this.formData.append('photo', file, file.name);
      const fileReader = new FileReader();
      fileReader.onload = ((event: any) => {
        this.imgUrls[i] = event.target.result;
        // Asp.net core has to accept [FromForm] IFormCollection to work for these options:
        //this.formData.append(`photo[${i}]`, file);
        // OR
        //this.formData.append(`photo[]`, file);
      });
      fileReader.readAsDataURL(file);
    }

  }

  optionSelected(category: Category) {
    return this.selectedCategory === category;
  }

  selectChanged($event) {
    const id = $event.target.value;
    this.selectedCategory = this.categories.find(x => x.categoryId == id);
  }

  toFormData() {
    this.formData.append('title', this.advertForm.value.title);
    this.formData.append('description', this.advertForm.value.description);
    this.formData.append('price', this.advertForm.value.price);
    this.formData.append('categoryId', this.advertForm.value.categoryId);
//    this.formData.append('townId', this.advertForm.value.townId);
    if (this.advertForm.value.brandId) {
      this.formData.append('brandId', this.advertForm.value.brandId);
     }
  }



  submit() {
    this.toFormData();
    this.service.createAd(this.formData).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/ads');
    }, error => {
      this.toast.error(error);
    }
    );
  }
}
