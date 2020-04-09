import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdvertService } from 'src/app/services/Repositories/advert.service';
import { Router } from '@angular/router';
import { CatService } from 'src/app/services/Repositories/cat.service';
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
  numberOfFiles: number;
  imgUrls =  new Array<string>(this.numberOfFiles);
  pictures: string[] = [];
  formData: FormData;
  constructor(private service: AdvertService, private router: Router, private catservice: CatService, private toast: ToastrService) { }

  ngOnInit() {
    this.advertForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(0),
      categoryId: new FormControl(0),
      photo: new FormControl(),
    });
    this.numberOfFiles = 3;
    this.getCats();
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

  onFileAttach($event) {

    for (let i = 0; i < $event.target.files.length; i++) {
        const file = $event.target.files[i];
        this.pictures.push(file);
        // Asp.net core has to accept [FromForm] MyAnnoucementDto
        // MyAnnoucementDto has to have List<IFormFile>
        this.formData.append('photo', file, file.name);
        const fileReader = new FileReader();
        fileReader.onload = ((event: any) =>
        {
          this.imgUrls[i] = event.target.result;
          // Asp.net core has to accept [FromForm] IFormCollection to work for these options:
          //this.formData.append(`photo[${i}]`, file);
          // OR
          //this.formData.append(`photo[]`, file);
        });
        fileReader.readAsDataURL(file);
    }

  }

  optionSelected(option: string) {
    return this.selectedCategory === option;
  }

  selectChanged($event) {
    console.log($event.target.value);
    this.selectedCategory = $event.target.value;
  }

  toFormData() {
    this.formData.append('title', this.advertForm.value.title);
    this.formData.append('description', this.advertForm.value.description);
    this.formData.append('price', this.advertForm.value.price);
    this.formData.append('categoryId', this.advertForm.value.categoryId);
    this.formData.append('userId', '1');
  }


  
  submit() {
    this.toFormData();
    console.log(this.formData.get('title'));
    console.log(this.formData.get('descriptio'));
    console.log(this.formData.get('price'));
    console.log(this.formData.get('categoryId'));
    console.log(this.formData.getAll('photo[]'));
    console.log(this.formData);
    console.log(typeof(this.formData.get('photo')));
    console.log(this.formData.get('photo'));



    this.service.createAd(this.formData).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/ads');
    }, error => {
      this.toast.error(error);
    }
    );
  }
}
