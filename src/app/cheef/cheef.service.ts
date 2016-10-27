import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Cheef } from './';
import { ApiService } from '../api.service';
import { IApiConfig } from '../interface-api-config';
import { IApiService } from '../interface-service';

@Injectable()
export class CheefService implements IApiService {

  observable: Observable<any>;
  private cheef: Cheef;

  constructor(
    public http: Http,
    public api: ApiService
  ) { }

  getCheef(): Observable<Cheef> {
    let url = 'https://recipe-book-817c6.firebaseio.com/cheef.json';
    //let config = new IApiConfig(url, this, 'cheef');
    let config = {
      url: url,
      service: this,
      sourceKey: 'cheef'
    };
    return this.api.getData(config);
  }

}