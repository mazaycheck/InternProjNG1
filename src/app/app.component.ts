import { Component } from '@angular/core';
import { Advert } from './Models/Advert';
import { AdvertService } from './services/advert-service/advert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webspa';

}
