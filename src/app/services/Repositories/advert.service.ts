import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Advert } from 'src/app/Models/Advert';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalsService } from '../global/globals.service';
import { AdvertQueryOptions } from 'src/app/Models/AdvertQueryOptions';
import { UrlSerializer } from '@angular/router';
import { PageObject } from 'src/app/Models/PageObject';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {



  baseUrl: string;
  constructor(private http: HttpClient, private globals: GlobalsService) {
    this.baseUrl = globals.baseUrl + 'api/annoucements/';
  }
  getAds(advertOptions: AdvertQueryOptions): Observable<PageObject> {

    // const  paramString: string = Object.keys(advertOptions)
    //       .filter(key => advertOptions[key])
    //       .map(key => key + '=' + encodeURIComponent(advertOptions[key]))
    //       .join('&');
    // console.log(paramString);

    let httpparam = new HttpParams();
    const keys = Object.keys(advertOptions)
                       .filter(key => advertOptions[key] && advertOptions.hasOwnProperty(key))
                       .map(key => { httpparam = httpparam.append(key, advertOptions[key]); });

    console.log('keyvalues: ' + keys);
    console.log('params: ' + httpparam.toString());

    return this.http.get<PageObject>(`${this.baseUrl}search?` + httpparam.toString());
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
