import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalsService } from '../global/globals.service';
import { Brand } from 'src/app/Models/brand';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseUrl: string;
  constructor(private http: HttpClient, private config: GlobalsService) {
    this.baseUrl = this.config.baseUrl + 'api/brands';
  }


  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAllFromCategory(categoryId: number): Observable<any> {
    let httpparam = new HttpParams();
    httpparam = httpparam.append('categoryId', `${categoryId}`);
    return this.http.get(this.baseUrl  + '?' + httpparam.toString());
  }

  getById(id: number): Observable<Brand> {
    return this.http.get<Brand>(this.baseUrl + '/' + `${id}`);
   }
   
  create(brand: Brand): Observable<any> {
    return this.http.post(this.baseUrl, brand);
  }
  delete(brand: Brand): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + brand.brandId);
  }

  update(brand: Brand): Observable<any> {
    return this.http.put(this.baseUrl, brand);
  }
}
