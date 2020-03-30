import { Component, OnInit } from '@angular/core';
import { CatService } from 'src/app/services/advert-service/cat.service';

@Component({
  selector: 'app-catlist',
  templateUrl: './catlist.component.html',
  styleUrls: ['./catlist.component.css']
})
export class CatlistComponent implements OnInit {

  constructor(private service: CatService) { }

  categories: any = {};
  ngOnInit() {
    this.service.getAll().subscribe(
      response => {
        this.categories = response;
      }
    );
  }

  removeAd(categoryId: number){
    
  }
}
