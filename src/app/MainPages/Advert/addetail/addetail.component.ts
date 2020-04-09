import { Component, OnInit } from '@angular/core';
import { AdvertService } from 'src/app/services/Repositories/advert.service';
import { Advert } from 'src/app/Models/Advert';
import { Route, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addetail',
  templateUrl: './addetail.component.html',
  styleUrls: ['./addetail.component.css']
})
export class AddetailComponent implements OnInit {

  public advert: Advert;
  public condition = false;
  baseUrlForImages = 'http://localhost:5000/images/';
  selectedImage: string;
  constructor(private service: AdvertService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getAd(id).subscribe(response => {
      this.advert = response;
      console.log(this.advert);
      this.condition =  true;
      if (this.advert.photos.length > 0) {
        this.selectedImage = this.advert.photos[0].photoUrl;
      }
    });
  }
  changeSelectedImage(image: string) {
    this.selectedImage = image;
   
  }

}