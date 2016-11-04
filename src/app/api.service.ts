import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { IApiConfig } from './interface-api-config';

// TODO - ISSUE
// can't save a state because it's singleton
// need a way to figure it out how to translate this to a
// non-singleton service

// non-singleton is no possible so the state will be saved
// on the service caller
@Injectable()
export class ApiService {
  //private observable: Observable<any>;
  //private service: any;
  private cont: number = 0;
  private config;

  constructor(
    private http: Http
  ) { }

  // TODO, check if it's ok to send service instance here or not
  //getData(url, service, dataKey, map?) {
  getData(config: IApiConfig) {
    //console.log(this.cont++ + " url: "+config.url);
    //console.log(`this.constructor.name: ${config.service.constructor.name} - config.url: ${config.url}`)

    if(!!config.service[config.sourceKey] && !config.forceCall) {
      // if `data` is available just return it as `Observable`
      return Observable.of(config.service[config.sourceKey]);
    } else if (config.service.observable && !config.forceCall) {
      // if `this.observable` is set then the request is in progress
      // return the `Observable` for the ongoing request
      return config.service.observable;
    } else {
      // create the request, store the `Observable` for subsequent subscribers
      config.service.observable = this._fetchData(config);
      return config.service.observable;
    }
  }

  _fetchData(config: IApiConfig) {
    return this.http.get(config.url)
      .map(response => {
        //console.log('mapping response from _fetchdata with dataKey: '+config.sourceKey)
        config.service.observable = null;
        if (response.status == 400) {
          // return "FAILURE"
        } else {
          config.service[config.sourceKey] = response.json();

          //config.service['eventName'].emit(config.service[config.sourceKey]);


          // TODO, check this method should be called when this method fire an event
          if(config.map) {
            //config.map(service[config.sourceKey])
          }

          return config.service[config.sourceKey];
        }
      })
      .share();
  }

}
