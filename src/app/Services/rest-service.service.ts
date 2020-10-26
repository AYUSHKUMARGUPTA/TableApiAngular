import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import {expand, map, reduce} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable(
//   {
//   providedIn: 'root'
// }
)
export class RestServiceService {

  constructor(private http:HttpClient) { }


  getJsonData(): Observable<any> {
    return this.http.get('http://jsonplaceholder.typicode.com/photos')
    .pipe(map(res => res
    ));
  }

 
}
