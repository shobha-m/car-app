import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CarData } from '../models/car-data.model';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';


@Injectable()
export class CarService {
  constructor(private http:Http) {
  }

  private url:string = "http://localhost:3004/carStock";
  getCars():Observable<CarData[]> {
    return this.http.get(this.url)
    .map(this.extractData)
        //.do(data => console.log(data))
         .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return res.json();
  }

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  
}
