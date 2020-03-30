import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
constructor() { }
baseUrl = 'http://localhost:5000/';
}
