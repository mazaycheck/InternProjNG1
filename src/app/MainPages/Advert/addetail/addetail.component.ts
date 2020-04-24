import { Component, OnInit } from '@angular/core';
import { AdvertService } from 'src/app/services/Repositories/advert.service';
import { Advert } from 'src/app/Models/Advert';
import { Route, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/Repositories/user.service';
import { UserForDetail } from 'src/app/Models/UserForDetail';

@Component({
  selector: 'app-addetail',
  templateUrl: './addetail.component.html',
  styleUrls: ['./addetail.component.css']
})
export class AddetailComponent implements OnInit {

  public advert: Advert;
  public user: UserForDetail;
  public condition = false;
  baseUrlForImages = 'http://localhost:5000/images/';
  selectedImage: string;
  constructor(private service: AdvertService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getAd(id).subscribe(response => {
      this.advert = response;

      this.condition =  true;
      if (this.advert.photoUrls.length > 0) {
        this.selectedImage = this.advert.photoUrls[0];
      }
    });
  }
  changeSelectedImage(image: string) {
    this.selectedImage = image;
  }

}
