import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';
import { Observable } from 'rxjs';

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
getById(){}
create(){}
delete(){}
update(){}

}
