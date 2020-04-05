import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CatService {

baseUrl: string;

constructor(private http: HttpClient, private config: GlobalsService) {
  this.baseUrl = this.config.baseUrl + 'api/categories';
}



getAll(): Observable<any> {
  return this.http.get(this.baseUrl);
}
getById(){ }
create(cat: Category): Observable<any> {
  return this.http.post(this.baseUrl, cat);
}
delete(cat: Category): Observable<any> {
  return this.http.delete(this.baseUrl + '/' + cat.categoryId);
}

update(cat: Category): Observable<any> {
  return this.http.put(this.baseUrl, cat);
}

}
