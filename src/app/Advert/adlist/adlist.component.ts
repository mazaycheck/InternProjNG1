import { Component, OnInit } from '@angular/core';
import { Advert } from '../../Models/Advert';
import { AdvertService} from '../../services/advert-service/advert.service';

@Component({
  selector: 'app-adlist',
  templateUrl: './adlist.component.html',
  styleUrls: ['./adlist.component.css']
})
export class AdlistComponent implements OnInit {


  advertisements: Advert[];

  constructor(private adservice: AdvertService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.adservice.getAds().subscribe(
      data => {
        this.advertisements = data;
      }
    );
  }

  removeAd(id: number) {
    console.log('Delete');
    this.adservice.deleteAd(id).subscribe(response => {
      console.log(response);
      this.refresh();
    });
  }

}
