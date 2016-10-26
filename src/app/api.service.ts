import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { IApiConfig } from './i-api-config';

// TODO - ISSUE
// can't save a state because it's singleton
// need a way to figure it out how to translate this to a
// non-singleton service

@Injectable()
export class ApiService {
  //private observable: Observable<any>;
  //private service: any;
  private cont: number = 0;
  private config

  constructor(
    private http: Http
  ) { }

  //getData(url, service, dataKey, map?) {
  getData(config: IApiConfig) {
    console.log(this.cont++ + " url: "+config.url);
    if(!!config.service[config.dataKey]) {
      // if `data` is available just return it as `Observable`
      return Observable.of(config.service[config.dataKey]);
    } else if (config.service.observable) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return config.service.observable;
    } else {
      // create the request, store the `Observable` for subsequent subscribers
      config.service.observable = this._fetchData(config.url, config.service, config.dataKey);
      return config.service.observable;
    }
  }

  _fetchData(url, service, dataKey, map?) {
    return this.http.get(url)
      .map(response => {
        service.observable = null;
        if (response.status == 400) {
          // return "FAILURE"
        } else {
          service[dataKey] = response.json();
          if(map) {
            map(service[dataKey])
          }
          return service[dataKey];
        }
      })
      .share();
  }


}
