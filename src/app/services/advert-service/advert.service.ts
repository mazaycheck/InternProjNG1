import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Advert } from 'src/app/Models/Advert';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {



  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:44356/api/annoucements/';
  }
  getAds(): Observable<Advert[]> {
    return this.http.get<Advert[]>(this.baseUrl);
  }
  getAd(id: number) {
    return this.http.get<Advert>(this.baseUrl + `${id}`);
  }
  deleteAd(id: number) {
    return this.http.delete(this.baseUrl + `${id}`);
  }
  updateAd(model: Advert) {
    return this.http.put(this.baseUrl + `${model.annoucementId}`, model);
  }
  createAd(model: Advert) {
    console.log('creating');
    return this.http.post(this.baseUrl, model);
  }
}
