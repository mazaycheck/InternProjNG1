import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  getById() { }
  
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
