import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { ApiService } from '../api.service';
import { Cheef } from './';

@Injectable()
export class CheefService {

  constructor(
    public http: Http,
    @Inject(ApiService) public api: ApiService
  ) { }

  getCheef(): Observable<Cheef> {
    let url = 'https://recipe-book-817c6.firebaseio.com/cheef.json';
    return this.api.getData(url, this, 'cheef');
  }

}