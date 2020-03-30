import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdvertService } from 'src/app/services/advert-service/advert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Advert } from 'src/app/Models/Advert';

@Component({
  selector: 'app-adupdate',
  templateUrl: './adupdate.component.html',
  styleUrls: ['./adupdate.component.css']
})

export class AdupdateComponent implements OnInit {

  private id: number;
  private ad: Advert;
  updateForm = new FormGroup(
    { title: new FormControl(''),
     description: new FormControl(''),
     price: new FormControl(0) }
  );

  constructor(private service: AdvertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getAd(this.id).subscribe(r => {
      this.ad = r;
      this.updateForm.patchValue({ title: this.ad.title, description: this.ad.description, price: this.ad.price });
     });
  }

  updateAd() {
    const values = this.updateForm.value;
    values.annoucementId = this.ad.annoucementId;
    values.userId = this.ad.userId;
    values.categoryId = this.ad.categoryId;
    this.service.updateAd(values).subscribe(
      response => {
        console.log(response);
        this.router.navigateByUrl('/ads');
      }
    );
  }

}
