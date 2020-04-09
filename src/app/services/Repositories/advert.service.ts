import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Advert } from 'src/app/Models/Advert';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from '../global/globals.service';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {



  baseUrl: string;
  constructor(private http: HttpClient, private globals: GlobalsService) {
    this.baseUrl = globals.baseUrl + 'api/annoucements/';
  }
  getAds(category: string, query: string): Observable<Advert[]> {

    return this.http.get<Advert[]>(`${this.baseUrl}search?category=${category}&query=${query}`);
  }
  getAd(id: number) {
    return this.http.get<Advert>(this.baseUrl + `${id}`);
  }
  deleteAd(id: number) {
    return this.http.delete(this.baseUrl + `${id}`);
  }
  updateAd(model: Advert): Observable<any> {
    return this.http.patch(this.baseUrl, model);
  }
  createAd(model: FormData): Observable<any> {
    console.log('creating');
    return this.http.post(this.baseUrl, model);
  }
}
