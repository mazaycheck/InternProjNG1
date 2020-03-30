import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdvertService } from 'src/app/services/advert-service/advert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adcreate',
  templateUrl: './adcreate.component.html',
  styleUrls: ['./adcreate.component.css']
})
export class AdcreateComponent implements OnInit {
  advertForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
  });
  constructor(private service: AdvertService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    const values = this.advertForm.value;
    values.userId = 1;
    values.categoryId = 1;
    this.service.createAd(values).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/ads');
    });
  }

}
